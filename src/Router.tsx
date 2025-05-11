import { createBrowserRouter } from "react-router";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import Sidebar from "./Components/Sidebar";
import App from "./App";
import Assets from "./features/assets/AssetsPage";
import Statistics from "./Components/cards/Statistics";
import Categories from "./Components/Categories";
import Users from "./Components/Users";
import AssetsOut from "./pages/AssetsOut";
import AssetDetailsPage from "./features/assetsDetails/AssetDetailsPage";

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
        children: [
          {
            index: true,
            element: <Assets />,
          },
          
        ],
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

        path: "assets-details",
        element: <AssetDetailsPage />,
      },
          
      {
        path: "/assets-out",
        element: <AssetsOut />,
      },
    ],
  },
]);
