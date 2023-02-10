import React, { useState, useMemo } from "react";
import { Navbar, Dashboard, UsersTable, TeamsTable, TasksTable, LoginForm, CreateUserForm, UpdateUserForm, CreateTeamForm, UpdateTeamForm, CreateTaskForm, EditUserInfo } from "../src/components/index";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { UsersDataFetcher } from "./components/DataFetchers/UsersDataFetcher";
import { TeamsDataFetcher } from "./components/DataFetchers/TeamsDataFetcher";
import { TasksDataFetcher } from "./components/DataFetchers/TasksDataFetcher";
import { NavbarContext } from "./components/Navbar/NavbarContext";

const App = () => {
  const usersData = UsersDataFetcher();
  const teamsData = TeamsDataFetcher();
  const tasksData = TasksDataFetcher();

  // PERSISTS NAVBAR STATE SO IT CAN HIDE ELEMENTS WHEN ON MOBILE
  const [mobileNav, setMobileNav] = useState();
  const provideNav = useMemo(() => ({ mobileNav, setMobileNav }), [mobileNav, setMobileNav]);

  return (
    <div className="App">
      <NavbarContext.Provider value={provideNav}>
        {localStorage.getItem("loggedIn") === "true" ? <Navbar /> : null}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/createUser" element={<CreateUserForm />} />
          <Route path="/updateUser" element={<UpdateUserForm />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth loginPath={"/login"}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/editUserInfo"
            element={
              <RequireAuth loginPath={"/login"}>
                <EditUserInfo />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth loginPath={"/login"}>
                <UsersTable mockData={usersData} />
              </RequireAuth>
            }
          />
          <Route
            path="/createUser"
            element={
              <RequireAuth loginPath={"/login"}>
                <CreateUserForm />
              </RequireAuth>
            }
          />
          <Route
            path="/updateUser"
            element={
              <RequireAuth loginPath={"/login"}>
                <UpdateUserForm />
              </RequireAuth>
            }
          />
          <Route
            path="/teams"
            element={
              <RequireAuth loginPath={"/login"}>
                <TeamsTable mockData={teamsData} />
              </RequireAuth>
            }
          />
          <Route
            path="/createTeam"
            element={
              <RequireAuth loginPath={"/login"}>
                <CreateTeamForm />
              </RequireAuth>
            }
          />
          <Route
            path="/updateTeam"
            element={
              <RequireAuth loginPath={"/login"}>
                <UpdateTeamForm />
              </RequireAuth>
            }
          />
          <Route
            path="/tasks"
            element={
              <RequireAuth loginPath={"/login"}>
                <TasksTable mockData={tasksData} />
              </RequireAuth>
            }
          />
          <Route
            path="/createTask"
            element={
              <RequireAuth loginPath={"/login"}>
                <CreateTaskForm />
              </RequireAuth>
            }
          />
        </Routes>
      </NavbarContext.Provider>
    </div>
  );
};

export default App;
