import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./assets/styles/app.scss";
import { NavBar } from "./assets/components/NavBar";
import APO from "./assets/components/Apo";

function App() {
  const [apoData, setApoData] = useState([]);
  const handleFetchComplete = (data) => {
    setApoData(data);
  };
  console.log(apoData);
  return (
    <main className="main">
      <NavBar />

      <div className="content-wrapper">
        <Outlet />
      </div>
      <APO onFetchComplete={handleFetchComplete} />
    </main>
  );
}

export default App;
