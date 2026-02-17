"use client";
import { galleryData } from "@/app/lib/data";
import Isotope from "isotope-layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const PortfolioGridIsotope = () => {
    // Isotope
    const isotope = useRef();
    const [filterKey, setFilterKey] = useState("*");
    useEffect(() => {
        setTimeout(() => {
            isotope.current = new Isotope(".portfolio-active", {
                itemSelector: ".item",
                //    layoutMode: "fitRows",
                percentPosition: true,
                masonry: {
                    columnWidth: ".item",
                },
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            });
        }, 3000);
        //     return () => isotope.current.destroy();
    }, []);
    useEffect(() => {
        if (isotope.current) {
            filterKey === "*" ? isotope.current.arrange({ filter: `*` }) : isotope.current.arrange({ filter: `.${filterKey}` });
        }
    }, [filterKey]);
    const getDelay = (iii) => {
      const delay = (iii+1)*2
      return `${delay}s`
    }
    const handleFilterKeyChange = (key) => () => {
        setFilterKey(key);
    };
    const activeBtn = (value) => (value === filterKey ? "current" : "");
    return (
        <section className="portfolio-fluid-area rel z-1 py-130 rpy-100">
            <div className="container">
                <div className="row align-items-center pb-40">
                    <div className="col-lg-6 wow fadeInUp delay-0-2s">
                        <div className="section-title mb-20">
                            <span className="sub-title mb-20">Photo Gallery</span>
                            <h2>Insite Photo Gallery</h2>
                        </div>
                    </div>
                    <div className="col-lg-6 text-lg-right flex wow justify-content-end fadeInUp delay-0-4s">
                        <ul className="portfolio-filter mb-20">
                            <li data-filter="*" className={`c-pointer ${activeBtn("*")}`} onClick={handleFilterKeyChange("*")}>
                                All
                            </li>
                            <li data-filter=".outdoor" className={`c-pointer ${activeBtn("outdoor")}`} onClick={handleFilterKeyChange("outdoor")}>
                                Outdoor
                            </li>
                            <li data-filter=".indoor" className={`c-pointer ${activeBtn("indoor")}`} onClick={handleFilterKeyChange("indoor")}>
                                Indoor
                            </li>
                            <li data-filter=".seeds" className={`c-pointer ${activeBtn("seeds")}`} onClick={handleFilterKeyChange("seeds")}>
                                Seeds
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row portfolio-active">
                  {
                    galleryData.map((item, index) => {
                      return(
                        <div key={item.id} className={"col-lg-4 col-sm-6 item " + item.catagory} >
                            <div className={"gallery-style-two wow fadeInUp delay-0-"+getDelay(index)}>
                                <img src={item.image} alt={item.caption} />
                                <div className="gallery-over">
                                    <div className="content">
                                        <span className="category">{item.catagory}</span>
                                        <h4>
                                            <Link href={"/portfolio/"+item.id}>{item.caption}</Link>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                      )
                    })
                  }
                </div>
            </div>
        </section>
    );
};
export default PortfolioGridIsotope;
