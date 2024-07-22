import React from "react";
import Filters from "./Filters";
import { ProductList } from "./ProductList";
import "../styles/products.scss";

function Home() {
  return (
    <>
      <img
        src="https://placehold.co/1920x400/1d2433/white?text=Banner+slider&font=montserrat"
        alt=""
        className="banner"
        style={{ height: "400px" }}
      />
      <div className="grid">
        <Filters />

        <ProductList className="productList" />
      </div>
    </>
  );
}

export default Home;
