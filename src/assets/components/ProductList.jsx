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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubCategory, selectedSize]);

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <div className="container-products">
        {/* <ProductCard products={filteredProducts} /> */}
        <ProductCard products={products} />
      </div>
    </>
  );
};
