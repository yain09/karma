import React, { useEffect, useState } from "react";
import { products } from "../../products.json";
import ProductCard from "./ProductCards";
import "../styles/products.scss";


export const ProductList = () => {
//   const [products, setProducts] = useState([]);

  //   PAGINACION - POR AHORA NO LO USAMOS
//   const [productsPerPage, setProductsPerPage] = useState(6);
//   const [currentPage, setcurrentPage] = useState(1);

//   FETCH DE PRODUCTOS
//   const productList = async () => {
//     const data = await fetch("https://fakestoreapi.com/products");
//     const products = await data.json();

//     setProducts(products);
//     console.log(products);
//   };

//   useEffect(() => {
//     productList();
//   }, []);

  //   const [products] = useState(initialProducts);

  const [filters, setFilters] = useState({ category: "All" });
  // console.log(products);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        filters.category === "All" || product.category === filters.category
      );
    });
  };
  const filteredProducts = filterProducts(products);

  return (
    <>
      <div className="container-products">
        {/* <ProductCard products={filteredProducts} /> */}
        <ProductCard products={products} />
      </div>
    </>
  );
};
