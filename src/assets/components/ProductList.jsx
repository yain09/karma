import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCards";
import "../styles/products.scss";
import { filterProducts } from "../js/api";
import { Context } from "../../App";

export const ProductList = (props) => {
  const { selectedCategory, setSelectedCategory } = useContext(Context);
  const { selectedSubCategory, setSelectedSubCategory } = useContext(Context);
  const { selectedSize, setSelectedSize } = useContext(Context);

  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await filterProducts(
          selectedCategory,
          selectedSubCategory,
          selectedSize
        );
        setProducts(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubCategory, selectedSize]);
  return (
    <>
      {products && (
        <div className="container-products">
          <ProductCard products={products} />
        </div>
      )}
    </>
  );
};
