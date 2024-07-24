import React, { useContext, useEffect, useState, useRef } from "react";
import { getCategories, getSubCategories } from "../js/api";
import { Context } from "../../App";
import "../styles/filters.scss";
import "../styles/checkbox.scss";
import { RxMixerHorizontal } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { LuArrowDownUp } from "react-icons/lu";

const Filters = () => {
  const {
    selectedCategories,
    setSelectedCategories,
    selectedSubCategories,
    setSelectedSubCategories,
  } = useContext(Context);
  const [categoriesWithSub, setCategoriesWithSub] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const filtersRef = useRef(null);

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

  useEffect(() => {
    if (isDropdownVisible && !hasScrolled && window.innerWidth < 800) {
      const offsetTop = filtersRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollHeight = 146; // Altura específica en píxeles desde el borde superior

      window.scrollTo({
        top: offsetTop - scrollHeight,
        behavior: "smooth",
      });

      setHasScrolled(true); // Marcar que el desplazamiento se ha realizado
    }
  }, [isDropdownVisible, hasScrolled]);

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
    if (window.innerWidth < 800) {
      setIsDropdownVisible(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    // Resetear el estado de desplazamiento cuando se cierra el dropdown
    if (isDropdownVisible) {
      setHasScrolled(false);
    }
  };

  return (
    <div className="filters-container">
      <button className="hamburger-button" onClick={toggleDropdown}>
        {isDropdownVisible ? (
          <>
            <AiOutlineClose style={{ color: "#1D2433", fontSize: "20px" }} />{" "}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            <RxMixerHorizontal style={{ color: "#1D2433" }} />{" "}
            <span style={{ color: "#1D2433", marginLeft: "5px" }}>Filtros</span>
          </div>
        )}
      </button>
      <button className="btnSortBy mobile">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LuArrowDownUp />
          <span style={{ marginLeft: "5px" }}>Ordenar</span>
        </div>
      </button>
      <section
        ref={filtersRef}
        className={`filters ${isDropdownVisible ? "visible" : "hidden"}`}
      >
        <button className="btnSortBy desktop">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LuArrowDownUp />
            <span style={{ marginLeft: "5px" }}>Ordenar</span>
          </div>
        </button>
        <button onClick={handleClearFilters} className="btnClear">
          Mostrar Todo
        </button>
        <div className="categories">
          <h4 style={{ color: "#d40b4e" }}>CATEGORIAS</h4>
          <ul className="checkboxList">
            {categoriesWithSub.map((category) => (
              <li key={category.id}>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    style={{ display: "none" }}
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="cbx label"
                    style={{}}
                  ></label>
                  <label
                    htmlFor={`category-${category.id}`}
                    className="lbl"
                    style={{ marginLeft: "4px", textTransform: "uppercase" }}
                  >
                    <span>{category.name}</span>
                  </label>
                </div>
                <ul className="checkboxList">
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory.id} style={{ marginLeft: "20px" }}>
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          style={{ display: "none" }}
                          id={`subcategory-${subCategory.id}`}
                          value={subCategory.id}
                          checked={selectedSubCategories.includes(
                            subCategory.id
                          )}
                          onChange={() =>
                            handleSubCategoryChange(subCategory.id, category.id)
                          }
                        />
                        <label
                          htmlFor={`subcategory-${subCategory.id}`}
                          className="cbx "
                        ></label>
                        <label
                          htmlFor={`subcategory-${subCategory.id}`}
                          className="lbl"
                          style={{
                            marginLeft: "4px",
                            fontWeight: "500",
                          }}
                        >
                          <span>{subCategory.name}</span>
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
