import React, { useState } from "react";
import "../styles/product-des.scss";
import "../styles/checkbox-prod.scss";

const sizes = [
  { id: 1, name: "U" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
  { id: 4, name: "L" },
  { id: 5, name: "XL" },
];

const colors = [
  { id: 1, name: "Rojo" },
  { id: 2, name: "Verde" },
  { id: 3, name: "Azul" },
];

function Products() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <>
      <div className="products-navbar"></div>
      <section className="products-section">
        <p className="title">Titulo</p>
        <div className="gallery">
          <div className="img-counter">1/1</div>
          <div className="carrousel">
            <img
              className="product-img"
              src="https://placehold.co/600"
              alt=""
            />
          </div>
          <div className="dot-navigate">• • •</div>
          <div className="variaciones des-container">
            <div className="input-container">
              <label>
              <p className="title-2">
                Tamaño:
                </p></label>
              <div className="flex-row">
                {sizes.map((size) => (
                  <div key={size.id} className="checkbox-wrapper me-2">
                    <label className="checkbox-wrapper">
                      <input
                        type="radio"
                        name="sizes"
                        value={size.id.toString()}
                        checked={selectedSize === size.id.toString()}
                        onChange={handleSizeChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-tile">
                        <span className="checkbox-label">{size.name}</span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <label>
              <p className="title-2">
                Color:
                </p>
            </label>
            <div className="flex-row">
              {colors.map((color) => (
                <div key={color.id} className="checkbox-wrapper me-2">
                  <label className="checkbox-wrapper">
                    <input
                      type="radio"
                      name="colors"
                      value={color.id.toString()}
                      checked={selectedColor === color.id.toString()}
                      onChange={handleColorChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-tile">
                      <span className="checkbox-label">{color.name}</span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <p className="price"> $ Precio</p>
        </div>
        <div className="des-container">
          <button className="add-to-cart"> agregar al carrito </button>
          <article>
            <p className="title">Descripción</p>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Products;
