import supabase from "./supabase";

export async function updateUserSkills({ uid, skills }) {
  const { data, error } = await supabase
    .from("userSkills")
    .insert([{ uid: uid, skills: skills }]);

  return data;
}

export async function getUserSkills(uid) {
  const { data, error } = await supabase
    .from("userSkills")
    .select("skills")
    .eq("uid", uid);

  return data;
}

export async function getUserById(userId) {
  try {
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
