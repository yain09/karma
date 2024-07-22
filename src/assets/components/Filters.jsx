import React, { useContext, useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../js/api";
import { Context } from "../../App";
import "../styles/filters.scss";
import { RxMixerHorizontal } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const Filters = () => {
  const {
    selectedCategories,
    setSelectedCategories,
    selectedSubCategories,
    setSelectedSubCategories,
  } = useContext(Context);
  const [categoriesWithSub, setCategoriesWithSub] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubCategoryChange = (subCategoryId, categoryId) => {
    if (selectedSubCategories.includes(subCategoryId)) {
      setSelectedSubCategories(
        selectedSubCategories.filter((id) => id !== subCategoryId)
      );
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCategoryId]);
      if (!selectedCategories.includes(categoryId)) {
        setSelectedCategories([...selectedCategories, categoryId]);
      }
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="filters-container">
      <button className="hamburger-button" onClick={toggleDropdown}>
        {isDropdownVisible ? (
          <>
            <AiOutlineClose style={{ color: "black", fontSize: "20px" }} />{" "}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "black",
              fontSize: "20px",
            }}
          >
            <RxMixerHorizontal /> <span>Filtros</span>
          </div>
        )}
      </button>
      <section
        className={`filters ${isDropdownVisible ? "visible" : "hidden"}`}
      >
        <button onClick={handleClearFilters} className="btnClear">
          Mostrar Todo
        </button>
        <button className="btnSortBy">
          Ordenar Por
        </button>
        <div className="categories">
          <h4 style={{ color: "#d40b4e" }}>CATEGORIAS</h4>
          <ul className="checkboxList">
            {categoriesWithSub.map((category) => (
              <li key={category.id}>
                <div>
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`} className="label" style={{ textTransform: "uppercase"}}>
                    {category.name}
                  </label>
                </div>
                <ul className="checkboxList">
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory.id} style={{ marginLeft: "20px" }}>
                      <div>
                        <input
                          type="checkbox"
                          id={`subcategory-${subCategory.id}`}
                          value={subCategory.id}
                          checked={selectedSubCategories.includes(
                            subCategory.id
                          )}
                          onChange={() =>
                            handleSubCategoryChange(subCategory.id, category.id)
                          }
                        />
                        <label htmlFor={`subcategory-${subCategory.id}`} className="label">
                          {subCategory.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="sizes">
          <h4 style={{ color: "#d40b4e" }}>TALLES</h4>
        </div>
      </section>
    </div>
  );
};

export default Filters;
