import React, { useContext, useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../js/api";
import { Context } from "../../App";

const Filters = () => {
  const { selectedCategory, setSelectedCategory } = useContext(Context);
  const { selectedSubCategory, setSelectedSubCategory } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const subCategories = await getSubCategories(selectedCategory);
        setSubCategories(subCategories);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(-1);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const subCategoryOptions = subCategories?.map((subCategory) => (
    <option key={subCategory.id} value={subCategory.id}>
      {subCategory.name}
    </option>
  ));

  const categoryOptions = categories?.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  return (
    <>
      <section className="filters">
        <div>
          <label htmlFor="category">
            Categoría
            <select
              name=""
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value={-1}>Todas</option>
              {categoryOptions}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="subcategory">
            Subcategoría
            <select
              name=""
              id="subcategory"
              onChange={handleSubCategoryChange}
              value={selectedSubCategory}
            >
              <option value={-1}>Todas</option>
              {subCategoryOptions}
            </select>
          </label>
        </div>
      </section>
    </>
  );
};

export default Filters;
