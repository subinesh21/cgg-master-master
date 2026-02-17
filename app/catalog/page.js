import React from 'react'
import Layout from '../ui/layout/Layout'
import dynamic from 'next/dynamic';

const TrendyProducts = dynamic(() => import("../ui/comps/TrendyProducts"), {
    ssr: false,
});
export const metadata = {
  title: "Green Gift Hampers Catalog - Chennai Green Gifts",
  description: "Browse our catalog to explore a wide selection of products tailored to meet your needs. Find quality, variety, and value all in one place.",
  openGraph: {
      title: "Green Gift Hampers Catalog - Chennai Green Gifts",
      description: "Browse our catalog to explore a wide selection of products tailored to meet your needs. Find quality, variety, and value all in one place.",
      images: [
          {
              url: "/assets/images/slider/slider2.webp",
              width: 1000,
              height: 719,
          },
      ],
      locale: "en_US",
      type: "website",
  },
};
function Catalog() {
  
  return (
    <Layout>
        <section className="shop-area-four rel z-1 pt-80 pb-50">
            <div className="container-fluid">
            <TrendyProducts />
            </div>
        </section>
    </Layout>
    
  )
}

export default Catalog