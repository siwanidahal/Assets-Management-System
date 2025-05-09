import { createBrowserRouter } from "react-router";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import Sidebar from "./Components/Sidebar";
import App from "./App";
import AssetDetails from "./Components/AssetDetails";
import Assets from "./Components/Assets";
import Statistics from "./Components/cards/Statistics";
import Categories from "./Components/Categories";
import Users from "./Components/Users";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "/assets",
        element: <Assets />,
      },
      {
        path: "/users",
        element: <Users />,
      },

      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/AssetDetails",
        element: <AssetDetails />,
      },
      {
        path: "Asset-0ut",
        element: <Assignment />,
      },
    ],
  },
]);
