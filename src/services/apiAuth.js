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

export async function updateCurrentUser({ fullName, avatar, linkedin, cv }) {
  let updateData = { data: {} };

  if (fullName) updateData.data.fullName = fullName;
  if (linkedin) updateData.data.linkedIn = linkedin; // Note: linkedIn is case-sensitive

  console.log("Updating user with data:", updateData);

  // Handle avatar upload
  if (avatar) {
    const fileName = `avatar-${Date.now()}`;
    const { data: avatarUpload, error: avatarError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);
    if (avatarError) throw new Error(avatarError.message);

    updateData.data.avatar = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  }

  // Handle CV upload
  if (cv) {
    const cvFileName = `cv-${Date.now()}`;
    const { data: cvUpload, error: cvError } = await supabase.storage
      .from("cvs")
      .upload(cvFileName, cv);
    if (cvError) throw new Error(cvError.message);

    updateData.data.cv = `${supabaseUrl}/storage/v1/object/public/cvs/${cvFileName}`;
  }

  // Update the auth user metadata if needed (optional)
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  // Update custom fields in userInfo table using "id" as the filter
  const { error: customTableError } = await supabase
    .from("userInfo")
    .update({
      fullName,
      linkedIn: linkedin, // Ensure casing matches your table column
    })
    .eq("id", data.user.id); // Assumes `id` links to the user's ID in userInfo

  if (customTableError) throw new Error(customTableError.message);

  return data.user;
}

