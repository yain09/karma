import { Outlet } from "react-router-dom";

import { NavBar } from "./assets/components/NavBar";
import "./assets/styles/app.scss";

import Tablas from "./assets/components/Tablas";
function App() {
  return (
    <main className="main">
      <NavBar />
      <div className="content-wrapper"></div>
      <Outlet />
    </main>
  );
}

export default App;
