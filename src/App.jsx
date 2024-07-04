
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./assets/styles/app.scss";
import Tablas from "./assets/components/Tablas";
import { ProductList } from "./assets/components/ProductList";
import { NavBar } from "./assets/components/NavBar";
import Filters from "./assets/components/Filters";
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

      <div className="content-wrapper"></div>
      <Outlet />
    <APO onFetchComplete={handleFetchComplete} />

    </main>
  );
}

export default App;