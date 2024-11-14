import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, linkedin }) {
  console.log({ fullName, email, password, linkedin });

  const { dataUserInfo, errorUserInfo } = await supabase
    .from("userInfo")
    .insert([{ email: email, fullName: fullName, linkedIn: linkedin }]);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "", linkedin },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error("Signup failed");
  }

  if (errorUserInfo) {
    console.error(errorUserInfo.message);
    throw new Error("Signup failed");
  }

  return { data, dataUserInfo };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error("Login failed");
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  email,
  fullName,
  avatar,
  linkedin,
  cv,
}) {
  if (!email) {
    throw new Error("Email is required for updating user information");
  }

  const updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (linkedin) updateData.linkedIn = linkedin;

  // Upload avatar to storage if provided
  if (avatar) {
    const avatarFileName = `avatar-${Date.now()}`;
    const { data: avatarUpload, error: avatarError } = await supabase.storage
      .from("avatars")
      .upload(avatarFileName, avatar);

    if (avatarError)
      throw new Error(`Avatar upload error: ${avatarError.message}`);

    // Set public URL for the avatar in metadata
    updateData.avatar = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarFileName}`;

    const { data: userInfoData, error: userInfoError } = await supabase
      .from("userInfo")
      .update(
        "avatar",
        `${supabaseUrl}/storage/v1/object/public/avatars/${avatarFileName}`,
      )
      .eq("email", email);
  }

  // CV
  if (cv) {
    const cvFileName = `cv-${email}-${Date.now()}`;
    const { data: cvUpload, error: cvError } = await supabase.storage
      .from("cvs")
      .upload(cvFileName, cv);
    if (cvError) throw new Error(`CV upload failed: ${cvError.message}`);

    updateData.cv = cvFileName;
  }

  // auth user metadata
  const { user, error: authError } = await supabase.auth.getUser();
  if (authError) throw new Error(authError.message);

  // user's metadata
  const { data: authData, error: authUpdateError } =
    await supabase.auth.updateUser({
      data: updateData,
    });

  if (authUpdateError) throw new Error(authUpdateError.message);

  // userInfo table in the database
  const { data: userInfoData, error: userInfoError } = await supabase
    .from("userInfo")
    .update(updateData)
    .eq("email", email);

  if (userInfoError) {
    console.error("Error updating user info:", userInfoError.message);
    throw new Error("Could not update user information");
  }

  return userInfoData;
}
