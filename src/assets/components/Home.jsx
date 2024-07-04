import React from "react";
import Filters from "./Filters";
import { ProductList } from "./ProductList";

function Home() {
  return (
    <>
      <img
        src="https://placehold.co/1920x400/1d2433/white?text=Banner+slider&font=montserrat"
        alt=""
        className="banner"
        style={{ height: "400px" }}
      />
      <Filters />
      <ProductList className="productList" />
    </>
  );
}

export default Home;
