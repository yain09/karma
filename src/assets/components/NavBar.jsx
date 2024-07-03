import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../styles/navBar.scss";
export const NavBar = () => {
  return (
    <div className="navBar-container">
      <div className="navBar">
      <div style={{display: "flex", alignItems: "center"}}>
      <p className="brand">Karma</p>
      <a href="" className="navBar-a"> Contacto </a>
      <a href="" className="navBar-a"> Tienda </a>
      </div>
      <RxHamburgerMenu  style={{fontSize: "30px", color:"#d40b4e", marginRight:"8px"}}/>
      </div>
    </div>
  );
};

export default NavBar;
