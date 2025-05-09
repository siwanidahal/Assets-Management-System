import { createBrowserRouter } from "react-router";
import AssetsOut from "./pages/AssetsOut";

export const Routes = createBrowserRouter([
  {
    path: "/assets-out",
    element: <AssetsOut />,
  },
]);
