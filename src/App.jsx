import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import UserSkillsForm from "./pages/UserSkillsForm";
import CreateTeamForm from "./pages/CreateTeamForm";
import TeamPage from "./pages/TeamPage";
import InvitesPage from "./pages/InvitesPage";
import UpdateUserInfo from "./pages/UpdateUserInfo";
import Teams from "./pages/Teams";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="skills" element={<UserSkillsForm />} />
            <Route path="invites" element={<InvitesPage />} />
            <Route path="createTeam" element={<CreateTeamForm />} />
            <Route path="teams" element={<Teams />} />
            <Route path="team/:teamId" element={<TeamPage />} />
          </Route>
          <Route path="home" element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<UpdateUserInfo />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "(var--color-grey-0)",
            color: "(var--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
