import supabase from "./supabase";

export async function updateUserSkills({ uid, skills }) {
  const { data } = await supabase
    .from("userSkills")
    .insert([{ uid: uid, skills: skills }]);

  return data;
}

export async function getUserSkills(uid) {
  const { data } = await supabase
    .from("userSkills")
    .select("skills")
    .eq("uid", uid);

  return data;
}

export async function getUserByEmail(user_email) {
  const { data, error } = await supabase
    .from("userInfo")
    .select("*")
    .eq("email", user_email);

  if (error) {
    console.error("Error fetching user by his email:", error.message);
    throw new Error("Could not fetch user info for this email");
  }

  return data;
}
