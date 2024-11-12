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

export async function getAllTeams() {
  const { data, error } = await supabase.from("teams").select("*");

  if (error) {
    console.error("Error fetching all teams:", error.message);
    throw new Error("Could not fetch teams");
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

export async function getTeamsByUser(userEmail) {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .or(
      `email_front.eq.${userEmail},email_back.eq.${userEmail},email_ui.eq.${userEmail},email_qa.eq.${userEmail},email_pm.eq.${userEmail},email_mentor.eq.${userEmail}`,
    );

  if (error) {
    console.error("Error fetching teams for user:", error.message);
    throw new Error("Could not fetch teams for this user");
  }

  return data;
}

export async function removeUserFromTeam({ role, email, team_id }) {
  const roleColumnMap = {
    "Front-end": "email_front",
    "Back-end": "email_back",
    "UI/UX": "email_ui",
    QA: "email_qa",
    PM: "email_pm",
    Mentor: "email_mentor",
  };

  const column = roleColumnMap[role];

  if (!column) {
    throw new Error(`Unknown role: ${role}`);
  }

  const { data: team, error: fetchError } = await supabase
    .from("teams")
    .select(column)
    .eq("id", team_id)
    .single();

  if (fetchError) {
    console.error("Error fetching team:", fetchError.message);
    throw new Error("Could not fetch team");
  }

  if (team[column] !== email) {
    throw new Error("User email does not match the one in the team role");
  }

  const { error: updateError } = await supabase
    .from("teams")
    .update({ [column]: null })
    .eq("id", team_id);

  if (updateError) {
    console.error("Error updating team:", updateError.message);
    throw new Error("Could not remove user from team");
  }

  return true;
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

export async function createRequest({ user_email, team_id, role }) {
  const { data, error } = await supabase
    .from("requests")
    .insert({ user_email, team_id, role })
    .select();

  if (error) {
    console.error("Error creating request:", error.message);
    throw new Error("Could not create request");
  }

  return data;
}

export async function getRequestsByTeamId(team_id) {
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("team_id", team_id);

  if (error) {
    console.error("Error fetching requests:", error.message);
    throw new Error("Could not fetch requests for this team");
  }

  return data;
}

export async function acceptRequestById(request_id) {
  const { data: requestData, error: requestError } = await supabase
    .from("requests")
    .select("team_id, role, user_email")
    .eq("id", request_id)
    .single();

  if (requestError || !requestData) {
    console.error("Error fetching request:", requestError?.message);
    throw new Error("Could not fetch request details");
  }

  const { team_id, role, user_email } = requestData;

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
    .update({ [roleColumn]: user_email })
    .eq("id", team_id);

  if (teamUpdateError) {
    console.error("Error updating team:", teamUpdateError.message);
    throw new Error("Could not update team with user email");
  }

  const { error: deleteRequestError } = await supabase
    .from("requests")
    .delete()
    .eq("id", request_id);

  if (deleteRequestError) {
    console.error("Error deleting request:", deleteRequestError.message);
    throw new Error("Could not delete request after accepting");
  }
}

export async function declineRequestById(requestid) {
  const { error: deleteRequestError } = await supabase
    .from("requests")
    .delete()
    .eq("id", requestid);

  if (deleteRequestError) {
    console.error("Error deleting request:", deleteRequestError.message);
    throw new Error("Could not delete request after declining");
  }
}
