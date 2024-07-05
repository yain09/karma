import React from "react";
import "../styles/products.scss";

const ProductCard = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div className="card-product" key={product.id}>
          <figure className="container-img">
            <img
              className="product-img"
              src={
                product.img[0] ||
                "https://placehold.co/512/lightgrey/white?text=no+img&font=montserrat"
              }
              alt={product.name}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/512/1d2433/d40b4e?text=error&font=montserrat";
                console.log(`Error loading image for product: ${product.name}`);
              }}
            />
          </figure>
          <div className="info-product">
            <p className="product-title">{product.name}</p>
            <div className="card-footer">
              <p className="price">$ {product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
