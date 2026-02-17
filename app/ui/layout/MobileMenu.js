import { useState } from "react";
import { Blog, Contact, Home, PagesMobile, Portfolio, Shop } from "./Menus";
const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <ul className="navigation clearfix d-block d-lg-none mobile-header">
      <li className="dropdown">
      <a href="/">Home</a>
    </li>
    <li className="dropdown">
      <a href="/catalog">Catalog</a>
    </li>
    <li className="dropdown">
      <a href="/portfolio">Portfolio</a>
    </li>
    <li className="dropdown">
      <a href="/blog">blog</a>
    </li>
    <li className="dropdown">
      <a href="/contact">Contact</a>
    </li>
    <li className="dropdown">
      <a href="/login">Admin Login</a>
    </li>
    </ul>
  );
};
export default MobileMenu;
