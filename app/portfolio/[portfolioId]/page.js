import { galleryData } from "@/app/lib/data";
import Layout from "@/app/ui/layout/Layout";
import React from "react";

export async function generateMetadata({ params }) {
    const idid = Number(params.portfolioId) - 1
    let desc = "";
    if(galleryData[idid].catagory==="indoor"){
        desc="Elevate your gifting with our Premium Indoor Plant Hamper. Featuring elegant air-purifying plants, this eco-friendly gift brings style and freshness to any space. Perfect for every occasion!"
    }
    else if(galleryData[idid].catagory==="outdoor"){
        desc = "Affordable and thoughtful outdoor plant hampers designed for nature lovers. Includes vibrant, low-maintenance plants that brighten gardens and outdoor spaces. Great for gifting on a budget!"
    }
    else{
        desc = "Sow the seeds of love and sustainability with our Seed Return Gifts. Unique, eco-friendly favors that symbolize growth and care—ideal for weddings, baby showers, and events."
    }
    return {
      title: galleryData[idid].caption + " - Chennai Green Gifts",
      description:desc,
      openGraph: {
        title: galleryData[idid].caption + " - Chennai Green Gifts",
        description: desc,
        images: [
          {
            url: galleryData[idid].image,
            width: 800,
            height: 800,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
    }
}

function IndividualPortfolio({ params }) {
    const idid = Number(params.portfolioId) - 1
    return (
        <Layout>
            <section className="news-section pt-130 rpt-100 pb-70 rpb-40">
                <div className="container">
                    <div className="section-page-title text-center mb-1">
                        <span className="sub-title mb-20">{galleryData[idid].catagory}</span>
                        <h1>{galleryData[idid].caption}</h1>
                    </div>
                    <div className="section-content">
                        <img src={galleryData[idid].image} style={{borderRadius:10}} alt={galleryData[idid].caption} />
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default IndividualPortfolio;
