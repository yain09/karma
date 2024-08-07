import React, { useState, useEffect } from "react";
import MobileView from "./ViewMobile.jsx";
import DesktopView from "./ViewDesktop.jsx";
import "../styles/product-des.scss";
import "../styles/checkbox-prod.scss";

const title = "Título del producto";
const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur dictum, nunc nisl ultricies lectus, eget facilisis diam nisl a nisl.";
const price = "35.000";
const sizes = [
  { id: 1, name: "U" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
  { id: 4, name: "L" },
  { id: 5, name: "XL" },
];
const img = [
  {
    id: 1,
    url: "https://placehold.co/1000/1d2433/d40b4e?text=img+1&font=montserrat",
  },
  {
    id: 2,
    url: "https://placehold.co/1000/1d2433/d40b4e?text=img+2&font=montserrat",
  },
  {
    id: 3,
    url: "https://placehold.co/1000/1d2433/d40b4e?text=img+3&font=montserrat",
  },
  {
    id: 4,
    url: "https://placehold.co/1000/1d2433/d40b4e?text=img+4&font=montserrat",
  },
];

const colors = [
  { id: 1, name: "Rojo" },
  { id: 2, name: "Verde" },
  { id: 3, name: "Azul" },
];
const stock = true;

function Products() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mainImage, setMainImage] = useState(img[0].url);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleImageClick = (url, index) => {
    setMainImage(url);
    setCurrentImageIndex(index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % img.length);
    setMainImage(img[(currentImageIndex + 1) % img.length].url);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + img.length) % img.length
    );
    setMainImage(img[(currentImageIndex - 1 + img.length) % img.length].url);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {windowWidth > 600 ? (
        <DesktopView
          title={title}
          description={description}
          price={price}
          sizes={sizes}
          img={img}
          colors={colors}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          mainImage={mainImage}
          currentImageIndex={currentImageIndex}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
          handleImageClick={handleImageClick}
          openModal={openModal}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          goToNextImage={goToNextImage}
          goToPreviousImage={goToPreviousImage}
        />
      ) : (
        <MobileView
          title={title}
          description={description}
          price={price}
          sizes={sizes}
          img={img}
          colors={colors}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          mainImage={mainImage}
          currentImageIndex={currentImageIndex}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
          handleImageClick={handleImageClick}
          openModal={openModal}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          goToNextImage={goToNextImage}
          goToPreviousImage={goToPreviousImage}
        />
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="img-counter">
              {currentImageIndex + 1}/{img.length}
            </div>
            <button className="modal-prev" onClick={goToPreviousImage}>
              &lt;
            </button>
            <img className="modal-img" src={mainImage} alt="" />
            <button className="modal-next" onClick={goToNextImage}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
