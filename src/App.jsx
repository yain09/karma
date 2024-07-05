import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import "./assets/styles/app.scss";
import { NavBar } from "./assets/components/NavBar";

export const Context = createContext();

function App() {
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedSubCategory, setSelectedSubCategory] = useState(-1);
  const [selectedSize, setSelectedSize] = useState(-1);

  return (
    <Context.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
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
