import React, { useContext, useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../js/api";
import { Context } from "../../App";
import "../styles/filters.scss";

const Filters = () => {
  const { selectedCategory, setSelectedCategory } = useContext(Context);
  const { selectedSubCategory, setSelectedSubCategory } = useContext(Context);
  const [categoriesWithSub, setCategoriesWithSub] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      try {
        const categories = await getCategories();
        const categoriesWithSubCategories = await Promise.all(
          categories.map(async (category) => {
            const subCategories = await getSubCategories(category.id);
            return { ...category, subCategories };
          })
        );
        setCategoriesWithSub(categoriesWithSubCategories);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategoriesAndSubCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  return (
    <section className="filters">
      <ul className="checkboxList">
        {categoriesWithSub.map((category) => (
          <li key={category.id}>
            <div>
              <input
                type="checkbox"
                id={`category-${category.id}`}
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
            <ul>
              {category.subCategories.map((subCategory) => (
                <li key={subCategory.id} style={{ marginLeft: "20px" }}>
                  <div>
                    <input
                      type="checkbox"
                      id={`subcategory-${subCategory.id}`}
                      value={subCategory.id}
                      checked={selectedSubCategory === subCategory.id}
                      onChange={() => handleSubCategoryChange(subCategory.id)}
                    />
                    <label htmlFor={`subcategory-${subCategory.id}`}>{subCategory.name}</label>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Filters;
