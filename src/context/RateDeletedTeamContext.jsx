/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const TeamContext = createContext();

function DeletedTeamProvider({ children }) {
  const [team, setTeam] = useLocalStorageState(null, "teamKey");

  function saveTeam(teamObject) {
    console.log("teamObject", teamObject);
    setTeam(teamObject);
  }

  function clearTeam() {
    setTeam(null);
  }

  return (
    <TeamContext.Provider value={{ team, saveTeam, clearTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

function useDeletedTeam() {
  const context = useContext(TeamContext);
  if (context === undefined)
    throw new Error("useTeam must be used within a TeamProvider");
  return context;
}

export { DeletedTeamProvider, useDeletedTeam };
