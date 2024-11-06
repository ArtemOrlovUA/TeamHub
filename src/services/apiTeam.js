import supabase from "./supabase";

export async function createTeam(
  creatorEmail,
  roles,
  teamName,
  teamGoals,
  deadline_date,
) {
  const roleColumnMap = {
    "Front-end": "email_front",
    "Back-end": "email_back",
    "UI/UX Дизайн": "email_ui",
    QA: "email_qa",
    PM: "email_pm",
    Ментор: "email_mentor",
  };

  const data = {
    email_owner: creatorEmail,
    teamName,
    teamGoals,
    deadline_date,
  };

  roles.forEach((role) => {
    const column = roleColumnMap[role];
    if (column) {
      data[column] = creatorEmail;
    }
  });

  const { data: insertedData, error } = await supabase
    .from("teams")
    .insert([data]);

  if (error) {
    console.error("Error creating team:", error.message);
    return null;
  }

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

export async function deleteTeam(team_id) {
  const { error } = await supabase.from("teams").delete().eq("id", team_id);

  if (error) {
    console.error("Error deleting team:", error.message);
    throw new Error("Could not delete team");
  }

  return team_id;
}

export async function getTeamsByCreator(creatorEmail) {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("email_owner", creatorEmail);

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

export async function createInvite({ email, role, team_id, status }) {
  const { data, error } = await supabase
    .from("invites")
    .insert([{ email: email, role: role, team_id: team_id, status: status }])
    .select();

  if (error) {
    console.error("Error creating invite:", error.message);
    throw new Error("Could not create invite");
  }

  return data;
}

export async function getInvitesByEmail(email) {
  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("Error fetching invites by email:", error.message);
    throw new Error("Could not fetch invites for this email");
  }

  return data;
}

export async function getTeamById(team_id) {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", team_id)
    .single();

  if (error) {
    console.error("Error fetching team by id:", error.message);
    throw new Error("Could not fetch team for this id");
  }

  return data;
}

export async function acceptInviteById(invite_id) {
  const { data: inviteData, error: inviteError } = await supabase
    .from("invites")
    .select("team_id, role, email")
    .eq("id", invite_id)
    .single();

  if (inviteError || !inviteData) {
    console.error("Error fetching invite:", inviteError?.message);
    throw new Error("Could not fetch invite details");
  }

  const { team_id, role, email } = inviteData;

  const { data: updatedInvite, error: updateError } = await supabase
    .from("invites")
    .update({ status: "accepted" })
    .eq("id", invite_id);

  if (updateError) {
    console.error("Error accepting invite:", updateError.message);
    throw new Error("Could not accept invite");
  }

  const roleColumnMapping = {
    "Front-end": "email_front",
    "Back-end": "email_back",
    "UI/UX": "email_ui",
    QA: "email_qa",
    PM: "email_pm",
    Mentor: "email_mentor",
  };

  const roleColumn = roleColumnMapping[role];

  if (!roleColumn) {
    throw new Error(`Unknown role: ${role}`);
  }

  const { error: teamUpdateError } = await supabase
    .from("teams")
    .update({ [roleColumn]: email })
    .eq("id", team_id);

  if (teamUpdateError) {
    console.error("Error updating team:", teamUpdateError.message);
    throw new Error("Could not update team with user email");
  }

  const { error: deleteInviteError } = await supabase
    .from("invites")
    .delete()
    .eq("id", invite_id);

  if (deleteInviteError) {
    console.error("Error deleting invite:", deleteInviteError.message);
    throw new Error("Could not delete invite after accepting");
  }

  return updatedInvite;
}

export async function declineInviteById(invite_id) {
  const { error: deleteInviteError } = await supabase
    .from("invites")
    .delete()
    .eq("id", invite_id);

  if (deleteInviteError) {
    console.error("Error deleting invite:", deleteInviteError.message);
    throw new Error("Could not delete invite after accepting");
  }
}
