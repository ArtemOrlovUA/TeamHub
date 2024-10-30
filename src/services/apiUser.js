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
