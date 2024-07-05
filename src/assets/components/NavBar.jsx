import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../styles/navBar.scss";

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navBar-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="brand">Karma</p>
          <a href="" className="navBar-a"> Contacto </a>
          <a href="" className="navBar-a"> Tienda </a>
        </div>
        <RxHamburgerMenu style={{ fontSize: "30px", color: "#d40b4e", marginRight: "8px" }} />
      </div>
    </div>
  );
};

export default NavBar;