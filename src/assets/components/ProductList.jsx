import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCards";
import "../styles/products.scss";
import { filterProducts } from "../js/api";
import { Context } from "../../App";

export const ProductList = () => {
  const { selectedCategory, selectedSubCategory, selectedSize } = useContext(Context);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await filterProducts(selectedCategory, selectedSubCategory, selectedSize);
        setProducts(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubCategory, selectedSize]);

  return (
    <>
      {products.length > 0 ? (
        <div className="container-products">
          <ProductCard products={products} />
        </div>
      ) : (
        <p>No products found</p>
      )}
    </>
  );
};

export default ProductList;