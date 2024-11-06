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
      data: { fullName, avatar: "" },
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

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: errorUpload } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (errorUpload) throw new Error(errorUpload.message);

  const { data: updatedUser, error: errorUpdateImage } =
    supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (errorUpdateImage) throw new Error(errorUpdateImage.message);

  return updatedUser;
}
