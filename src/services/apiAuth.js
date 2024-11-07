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
  password,
  fullName,
  avatar,
  linkedin,
  cv,
}) {
  let updateData = { data: {} };

  if (password) updateData.password = password;
  if (fullName) updateData.data.fullName = fullName;
  if (linkedin) updateData.data.linkedin = linkedin;

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (avatar) {
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const { error: errorUploadAvatar } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);
    if (errorUploadAvatar) throw new Error(errorUploadAvatar.message);

    updateData.data.avatar = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  }

  if (cv) {
    const cvFileName = `cv-${data.user.id}-${Math.random()}`;
    const { error: errorUploadCv } = await supabase.storage
      .from("cvs")
      .upload(cvFileName, cv);
    if (errorUploadCv) throw new Error(errorUploadCv.message);

    // Update CV URL in the user metadata
    updateData.data.cv = `${supabaseUrl}/storage/v1/object/public/cvs/${cvFileName}`;
  }

  const { data: updatedUser, error: errorUpdateMetadata } =
    await supabase.auth.updateUser(updateData);
  if (errorUpdateMetadata) throw new Error(errorUpdateMetadata.message);

  return updatedUser;
}
