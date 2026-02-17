"use client";
import { products } from "@/app/lib/products";

import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

const TrendyProducts = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".best-selling-active", {
        itemSelector: ".item",
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
    }, 1000);
  }, []);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  const activeBtn = (value) => (value === filterKey ? "current" : "");

  return (
    <div className="container">
      <div className="row align-items-center pb-30">
        <div className="col-lg-6 wow fadeInUp delay-0-2s">
          <div className="section-title mb-10">
            <span className="sub-title mb-10">Catalog</span>
            <h2>Green Gift Hampers</h2>
          </div>
        </div>
        <div className="col-lg-6 text-lg-right wow fadeInUp delay-0-4s">
          <ul className="best-selling-filter filter-btns-one mb-20">
            <li
              data-filter="*"
              className={`c-pointer ${activeBtn("*")}`}
              onClick={handleFilterKeyChange("*")}
            >
              All
            </li>
            <li
              data-filter=".outdoor"
              className={`c-pointer ${activeBtn("outdoor")}`}
              onClick={handleFilterKeyChange("outdoor")}
            >
              Outdoor
            </li>
            <li
              data-filter=".indoor"
              className={`c-pointer ${activeBtn("indoor")}`}
              onClick={handleFilterKeyChange("indoor")}
            >
              Indoor
            </li>
            <li
              data-filter=".seeds"
              className={`c-pointer ${activeBtn("seeds")}`}
              onClick={handleFilterKeyChange("seeds")}
            >
              Seeds
            </li>
          </ul>
        </div>
      </div>
      <div className="row best-selling-active">
        {products.map((product) => (
          <div
            className={`col-xl-3 col-lg-4 col-sm-6 item mb-6 ${product.category}`}
            key={product.id}
          >
            <Link 
              href={`/catalog/${product.slug}`} 
              className="product-item wow fadeInUp delay-0-2s h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 block hover:text-green-600 transition-colors text-sm md:text-base"
            >
              <div className="relative">
                <div className="image h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="content p-2 flex flex-col flex-grow">
                <h6 className="font-medium text-green-800 mb-2 h-[3rem] overflow-hidden">
                  {product.name}
                </h6>
                <div className="mt-auto">
                  <span className="price text-lg font-bold text-gray-900">
                    {product.originalPrice && (
                      <del className="text-gray-500 text-sm font-normal mr-2">
                        {product.originalPrice}
                      </del>
                    )}
                    <span className="text-green-600">{product.price}</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendyProducts;