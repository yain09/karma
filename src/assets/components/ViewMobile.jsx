import React from "react";

function ViewMobile({
  title,
  description,
  price,
  sizes,
  img,
  colors,
  selectedSize,
  selectedColor,
  mainImage,
  currentImageIndex,
  handleSizeChange,
  handleColorChange,
  handleImageClick,
}) {
  return (
    <>
      <div className="products-navbar"></div>
      <section className="products-section">
        <p className="title">{title}</p>
        <div className="gallery">
          <div className="img-counter">
            {currentImageIndex + 1}/{img.length}
          </div>
          <div className="carrousel">
            <img className="product-img" src={mainImage} alt="" />
          </div>
          <div className="dot-navigate">
            {img.map((item, index) => (
              <img
                key={item.id}
                className="thumbnail"
                src={item.url}
                alt=""
                style={{ opacity: currentImageIndex === index ? 1 : 0.5 }}
                onClick={() => handleImageClick(item.url, index)}
              />
            ))}
          </div>
        </div>
        <div className="variants">
          <div className="input-container">
            <label>
              <p className="title-2">Tamaño:</p>
            </label>
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
            <p className="title-2">Color:</p>
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
        <div className="price-container">
          <p
            className="price title"
            style={{ padding: "0px", margin: "auto auto" }}
          >
            $ {price}
          </p>
          <button className="add-to-cart"> agregar al carrito </button>
        </div>
        <div className="des-wrapper">
          <article className="des-container">
            <p className="des-title">Descripción:</p>
            <p className="description">{description}</p>
          </article>
        </div>
      </section>
    </>
  );
}

export default ViewMobile;
