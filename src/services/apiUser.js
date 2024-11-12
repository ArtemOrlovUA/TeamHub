import supabase from "./supabase";

//inserts new or updates existing skills for the user
export async function updateUserSkills({ uid, skills }) {
  const { data, error } = await supabase
    .from("userSkills")
    .upsert({ uid, skills }) 
    .eq("uid", uid); 

  if (error) {
    console.error("Error updating user skills:", error.message);
    throw new Error("Could not update user skills");
  }

  return data;
}

// fetches user skills based on UID
export async function getUserSkills(uid) {
  const { data, error } = await supabase
    .from("userSkills")
    .select("skills")
    .eq("uid", uid);

  if (error) {
    console.error("Error fetching user skills:", error.message);
    throw new Error("Could not fetch user skills");
  }

  return data;
}

// fetches user information by email
export async function getUserByEmail(user_email) {
  const { data, error } = await supabase
    .from("userInfo")
    .select("*")
    .eq("email", user_email);

  if (error) {
    console.error("Error fetching user by email:", error.message);
    throw new Error("Could not fetch user info for this email");
  }

  return data;
}

// Updates the user's full name and LinkedIn URL in the userInfo table
export async function updateUserInfo({ uid, fullName, linkedin }) {

  const updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (linkedin) updateData.linkedin = linkedin;

  const { data, error } = await supabase
    .from("userInfo")
    .update(updateData)
    .eq("uid", uid); // Match based on the user's unique ID

  if (error) {
    console.error("Error updating user info:", error.message);
    throw new Error("Could not update user information");
  }

  return data;
}