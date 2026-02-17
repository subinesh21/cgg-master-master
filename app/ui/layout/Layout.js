"use client"
import { Fragment, useEffect } from "react";
import { animation, stickyNav } from "../utils";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import ImageView from "../ImageView";
import VideoPopup from "../VideoPopup";
const Layout = ({ children }) => {
  useEffect(() => {
    stickyNav();
    animation();

  }, []);
  useEffect(() => {
    if (window.location.pathname === "/index3") {
      document.querySelector("body").classList.add("home-three");
    } else {
      document.querySelector("body").classList.remove("home-three");
    }
  }, []);
  return (
    <Fragment>
      <VideoPopup />
      <ImageView />
      {/* <ImageGallery /> */}
      <div className="page-wrapper">
        <Header />
        <SideBar />
        {children}
        <Footer />
      </div>
    </Fragment>
  );
};
export default Layout;
