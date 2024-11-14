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

export async function getUserById(id) {
  const { data, error } = await supabase
    .from("userInfo")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error fetching user by ID:", error.message);
    throw new Error("Could not fetch user info for this ID");
  }

  return data;
}

// export async function updateUserInfo({ email, fullName, linkedin }) {
//   if (!email) {
//     throw new Error("Email is required for updating user information");
//   }

//   const updateData = {};
//   if (fullName) updateData.fullName = fullName;
//   if (linkedin) updateData.linkedIn = linkedin;
// Updates the user's full name and LinkedIn URL in the userInfo table
export async function updateUserInfo({ uid, fullName, linkedin }) {
  const updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (linkedin) updateData.linkedin = linkedin;

  const { data, error } = await supabase
    .from("userInfo")
    .update(updateData)
    .eq("uid", uid);

  if (error) {
    console.error("Error updating user info:", error.message);
    throw new Error("Could not update user information");
  }
  //   const { data, error } = await supabase
  //     .from("userInfo")
  //     .update(updateData)
  //     .eq("email", email);

  //   if (error) {
  //     console.error("Error updating user info:", error.message);
  //     throw new Error("Could not update user information");
  //   }

  //   return data;
  // }

  return data;
}

export async function getUserRatingByEmail(email) {
  const { data, error } = await supabase
    .from("userInfo")
    .select("rating")
    .eq("email", email);

  if (error) {
    console.error("Error fetching user rating:", error.message);
    throw new Error("Could not fetch user rating");
  }

  return data;
}

export async function upvoteUserRating(email) {
  const { data: currentData, error: fetchError } = await supabase
    .from("userInfo")
    .select("rating")
    .eq("email", email)
    .single();

  if (fetchError) {
    console.error("Error fetching user rating:", fetchError.message);
    throw new Error("Could not fetch user rating");
  }

  const newRating = (currentData.rating || 0) + 1;

  const { data, error } = await supabase
    .from("userInfo")
    .update({ rating: newRating })
    .eq("email", email);

  if (error) {
    console.error("Error upvoting user rating:", error.message);
    throw new Error("Could not upvote user rating");
  }

  return data;
}

export async function downvoteUserRating(email) {
  const { data: currentData, error: fetchError } = await supabase
    .from("userInfo")
    .select("rating")
    .eq("email", email)
    .single();

  if (fetchError) {
    console.error("Error fetching user rating:", fetchError.message);
    throw new Error("Could not fetch user rating");
  }

  const newRating = currentData.rating < 1 ? 0 : (currentData.rating || 0) - 1;

  const { data, error } = await supabase
    .from("userInfo")
    .update({ rating: newRating })
    .eq("email", email);

  if (error) {
    console.error("Error downvoting user rating:", error.message);
    throw new Error("Could not downvote user rating");
  }

  return data;
}
