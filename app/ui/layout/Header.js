import Link from "next/link";
import { Fragment, useState } from "react";
import { sidebarToggle } from "../utils";
import { Blog, Contact, Home, PagesDasktop, Portfolio, Shop } from "./Menus";
import MobileMenu from "./MobileMenu";

const Header = () => {
    return <Header1 />;
};
export default Header;


const DaskTopMenu = () => (
  <ul className="navigation clearfix d-none d-lg-flex">
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
  </ul>
);

const Nav = () => {
  const [nav, setNav] = useState(false);
  return (
    <nav className="main-menu navbar-expand-lg mobile-nav">
      <div className="navbar-header">
        <div className="mobile-logo my-15">
          <Link href="/">
            
              <img src="/assets/images/logos/logo.png" alt="Logo" title="Logo" />
              <img
                src="/assets/images/logos/logo-white.png"
                alt="Logo"
                title="Logo"
              />
            
          </Link>
        </div>
        {/* Toggle Button */}
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          onClick={() => setNav(!nav)}
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      <div className={`navbar-collapse collapse clearfix ${nav ? "show" : ""}`}>
        <DaskTopMenu />
        <MobileMenu />
      </div>
    </nav>
  );
};



const Header1 = () => (
  <header className="main-header menu-absolute">
    <div className="header-top-wrap bg-light-green text-white py-2">
      <div className="container-fluid">
        <div className="header-top text-sm">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <div className="top-left">
                <ul>
                  <li>
                    <i className="far fa-envelope" /> {" "}
                    <a href="mailto:chennaigreengifts@gmail.com">chennaigreengifts@gmail.com</a>
                  </li>
                  <li>
                    <i className="far fa-clock" /> Monday
                    - Friday, 09 am - 06 pm
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="top-right text-lg-right">
                <ul>
                  <li>
                    <i className="fab fa-whatsapp" aria-hidden="true"/> <b>WhatsApp :</b>{" "}
                    <a href="https://wa.me/916380007611" target="_blank">+91 63800 07611</a>
                  </li>
                  <li>
                    <div className="social-style-one">
                      <a href="https://www.instagram.com/chennai_green_gifts/">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="https://www.facebook.com/chennaigreengifts/">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="https://www.linkedin.com/company/chennai-green-gifts/">
                        <i className="fab fa-linkedin" />
                      </a>
                      
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*Header-Upper*/}
    <div className="header-upper">
      <div className="container-fluid clearfix">
        <div className="header-inner d-flex align-items-center">
          <div className="logo-outer">
            <div className="logo">
              <Link href="/">
                
                  <img
                    src="/assets/images/logos/logo.png"
                    alt="Logo"
                    title="Logo"
                  />
                
              </Link>
            </div>
          </div>
          <div className="nav-outer clearfix">
            {/* Main Menu */}
            <Nav />
            {/* Main Menu End*/}
          </div>
          {/* Menu Button */}
          <div className="menu-icons">
            
            <Link href="/login">
              <div style={{whiteSpace:"nowrap"}} className="theme-btn">
                Admin Login <i className="fas fa-angle-double-right" />
              </div>
            </Link>
            {/* menu sidbar */}
            <div className="menu-sidebar" onClick={() => sidebarToggle()}>
              <button>
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*End Header Upper*/}
  </header>
);
