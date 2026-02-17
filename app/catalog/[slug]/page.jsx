"use client";

import { products } from "@/app/lib/products";
import Layout from "@/app/ui/layout/Layout";
import { notFound } from "next/navigation";
import { plantOptions } from "@/app/lib/plantOptions";
import { customizationImages } from "@/app/lib/customizationData";
import { useState, useMemo } from "react";

export default function ProductPage({ params }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // --- STATE ---
  const [filterKey, setFilterKey] = useState("All");
  const [selectedPlantImage, setSelectedPlantImage] = useState(null); // Changed from hovered to selected

  const productCustomizations = customizationImages[product.name];

  const applicablePlants = useMemo(() => {
    return plantOptions.filter((plant) =>
      product.applicablePlants.includes(plant.name)
    );
  }, [product.applicablePlants]);

  const categoriesList = useMemo(() => {
    const cats = applicablePlants.map((p) => p.category || "Uncategorized");
    return ["All", ...new Set(cats)];
  }, [applicablePlants]);

  const filteredPlants = useMemo(() => {
    if (filterKey === "All") return applicablePlants;
    return applicablePlants.filter((p) => (p.category || "Uncategorized") === filterKey);
  }, [filterKey, applicablePlants]);

  return (
    <Layout>
      {/* 1. FIXED PREVIEW PORTAL (CLICK TRIGGERED) */}
      {selectedPlantImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedPlantImage(null)} // Click anywhere outside to close
        >
          {/* Dark Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          <div className="relative animate-in fade-in zoom-in duration-300">
            <div 
              className="bg-white p-4 md:p-8 rounded-3xl shadow-2xl border border-gray-200 cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the actual card
            >
              {/* Close Button */}
              <button 
                className="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors z-20"
                onClick={() => setSelectedPlantImage(null)}
              >
                <i className="fas fa-times" />
              </button>

              <img 
                src={selectedPlantImage} 
                alt="Enlarged Plant" 
                className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] object-contain rounded-2xl"
              />
              
              <div className="mt-4 text-center">
                <p className="text-gray-500 font-medium">Click outside to close preview</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="product-details-area pt-80 pb-50 mt-20">
        <div className="container mt-8">
          <div className="row">
            {/* Main Product Section - No Hover logic */}
            <div className="col-lg-6">
              <div className="product-details-image">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full rounded-lg shadow-lg" 
                />
                
                {productCustomizations?.mainImages && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {productCustomizations.mainImages.map((img, index) => (
                      <div key={index} className="overflow-hidden rounded-lg">
                        <img 
                          src={img} 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="product-details-content">
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-gray-600 mt-4 text-xl font-semibold leading-relaxed">
                    {product.description}
                </p>
                <div className="price-section mt-6">
                  <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customization Grid - No Hover logic */}
          {productCustomizations && (
            <div className="row mt-12">
              <div className="col-lg-12">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Customization Options</h2>
                  {productCustomizations.options.map((optionGroup, gIdx) => (
                    <div key={gIdx} className="mb-10">
                      <h3 className="text-xl font-semibold text-gray-700 mb-6">{optionGroup.title}</h3>
                      {optionGroup.type === 'image-grid' && (
                        <div className="row">
                          {optionGroup.images.map((image, iIdx) => (
                            <div key={iIdx} className="col-lg-3 col-md-4 col-sm-6 mb-6">
                              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                                <img src={image.src} className="w-full h-40 object-cover rounded-lg mb-3" />
                                <h4 className="text-center font-bold text-gray-700">{image.label || image.alt}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* APPLICABLE PLANTS SECTION - CLICK TRIGGERED HERE */}
      <section className="applicable-plants-area py-20 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-6 gap-4">
            <h4 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
              Applicable Plants <span className="text-green-600 ml-2">[{filteredPlants.length}]</span>
            </h4>
            <div className="flex gap-8 overflow-x-auto pb-2 w-full md:w-auto">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterKey(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${
                    filterKey === cat 
                    ? "bg-green-600 text-white shadow-lg" 
                    : "bg-white text-gray-400 hover:bg-green-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            {filteredPlants.map((plant, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-8" key={index}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 h-full group">
                  <div 
                    className="relative aspect-square mb-4 overflow-hidden rounded-xl cursor-pointer bg-white"
                    onClick={() => setSelectedPlantImage(plant.image)}
                  >
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Small visual cue that this is clickable */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition-all">
                      <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all text-2xl" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="font-bold text-gray-800 text-lg">{plant.name}</h5>
                    <button 
                       onClick={() => setSelectedPlantImage(plant.image)}
                       className="mt-3 text-[10px] font-bold text-green-600 uppercase tracking-widest hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}