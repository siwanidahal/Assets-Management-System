// import Assignment from "./Components/Assignment";

import { Outlet } from "react-router";
import Sidebar from "./Components/Sidebar";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
