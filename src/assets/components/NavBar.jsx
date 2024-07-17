import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/navBar.scss";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`navBar-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="brand">Karma</p>
          <button className="hamburger-buttonNav" onClick={toggleDropdown}>
            <RxHamburgerMenu />
          </button>
          {isDropdownOpen && (
        <div className="dropdown-menu">
          <a href="#" className="dropdown-a">Contacto</a>
          <a href="#" className="dropdown-a">Tienda</a>
        </div>
      )}
          <div className="nav-links">
            <a href="#" className="navBar-a">Contacto</a>
            <a href="#" className="navBar-a">Tienda</a>
          </div>
        </div>
        <div className="nav-icons">
          <FaShoppingCart style={{ fontSize: "30px", color: "#d40b4e", marginRight: "8px" }} />
          
        </div>
      </div>
      
    </div>
  );
};

export default NavBar;
