import { createBrowserRouter } from "react-router";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Sidebar from "./Components/Sidebar";
import Assets from "./Components/Assets";
import Users from "./Components/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/assets",
    element: <Assets />,
  },
  {
    path: "/users",
    element: <Users />,
  },
]);
