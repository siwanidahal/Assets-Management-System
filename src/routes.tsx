import { createBrowserRouter } from "react-router";
import Assignment from "./Components/Assignment";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Assignment />,
  },
]);
