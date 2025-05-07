import { createBrowserRouter } from "react-router";
import Statistics from "./Components/cards/Statistics";
import Categories from "./Components/Categories";

import AssetDetails from "./Components/AssetDetails";

export const Routes=createBrowserRouter([
    {
path:"/",
element:<Statistics/>
},
{
    path:"/categories",
    element:<Categories/>
},
{
    path:"/AssetDetails",
    element:<AssetDetails/>
}
])