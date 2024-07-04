import { useState } from "react";
import { ProductList } from "./assets/components/ProductList";
import { NavBar } from "./assets/components/NavBar";
import "./assets/styles/app.scss";
import Filters from "./assets/components/Filters";
import APO from "./assets/components/Apo";

function App() {
  const [apoData, setApoData] = useState([]);
  const handleFetchComplete = (data) => {
    setApoData(data);
  };
  console.log(apoData);
  return (
    <main>
      <NavBar />
      <img
        src="https://placehold.co/1920x400/1d2433/white?text=Banner+slider&font=montserrat"
        alt=""
        className="banner"
        style={{ height: "400px" }}
      />
      <Filters />
      <ProductList className="productList" />
      <APO onFetchComplete={handleFetchComplete} />
    </main>
  );
}

export default App;
