import supabase from "./supabase";

export async function createTeam(
  creatorId,
  roles,
  teamName,
  teamGoals,
  deadline_date,
) {
  const roleColumnMap = {
    "Front-end": "uid_front",
    "Back-end": "uid_back",
    "UI/UX Дизайн": "uid_ui",
    QA: "uid_qa",
    PM: "uid_pm",
    Ментор: "uid_mentor",
  };

  const data = {
    uid_owner: creatorId,
    teamName,
    teamGoals,
    deadline_date,
  };

  roles.forEach((role) => {
    const column = roleColumnMap[role];
    if (column) {
      data[column] = creatorId;
    }
  });

  const { data: insertedData, error } = await supabase
    .from("teams")
    .insert([data]);

  if (error) {
    console.error("Error creating team:", error.message);
    return null;
  }

  console.log("Team created successfully:", insertedData);
  return insertedData;
}

export async function getTeam(id) {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching team:", error.message);
    throw new Error("Team not found");
  }

  return data;
}

export async function getTeamsByCreator(creatorId) {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("uid_owner", creatorId);

  if (error) {
    console.error("Error fetching teams by creator:", error.message);
    throw new Error("Could not fetch teams for this creator");
  }

  return data;
}

export async function getTeamsByUser(userId) {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .or(
      `uid_owner.eq.${userId},uid_front.eq.${userId},uid_back.eq.${userId},uid_ui.eq.${userId},uid_qa.eq.${userId},uid_pm.eq.${userId},uid_mentor.eq.${userId}`,
    );

  if (error) {
    console.error("Error fetching teams for user:", error.message);
    throw new Error("Could not fetch teams for this user");
  }

  return data;
}
