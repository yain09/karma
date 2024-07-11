import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import "./assets/styles/app.scss";
import { NavBar } from "./assets/components/NavBar";

export const Context = createContext();

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <Context.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        selectedSubCategories,
        setSelectedSubCategories,
        selectedSize,
        setSelectedSize,
      }}
    >
      <main className="main">
        <NavBar />

        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </Context.Provider>
  );
}

export default App;
