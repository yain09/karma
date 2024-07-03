import React, { useEffect, useState } from "react";
import { products as initialProducts } from "../../products.json";

const Filters = () => {
    const [products] = useState(initialProducts);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const uniqueCategories = [...new Set(products.map(product => product.category))];

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);
    const uniqueSubcategories = [...new Set(filteredProducts.map(product => product.sub_cat))];

    const subCategoryOptions = uniqueSubcategories.map(sub_cat => (
        <option key={sub_cat} value={sub_cat}>
            {sub_cat}
        </option>
    ));

    const categoryOptions = uniqueCategories.map(category => (
        <option key={category} value={category}>
            {category}
        </option>
    ));

    return (
        <>
            <section className="filters">
                <div>
                    <label htmlFor="category">
                        Categoría
                        <select name="" id="category" onChange={handleCategoryChange} value={selectedCategory}>
                            <option value="All">Todas</option>
                            {categoryOptions}
                        </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="subcategory">
                        Subcategoría
                        <select name="" id="subcategory">
                            <option value="All">Todas</option>
                            {subCategoryOptions}
                        </select>
                    </label>
                </div>
            </section>
        </>
    );
};

export default Filters;