import React from "react";
import Layout from "../ui/layout/Layout";
import dynamic from "next/dynamic";
const PortfolioGridIsotope = dynamic(() => import("../ui/comps/PortfolioGridIsotope"), {
    ssr: false,
});

export const metadata = {
    title: "Our Portfolio - Chennai Green Gifts",
    description: "Discover our portfolio showcasing a diverse range of projects. Explore our creative solutions and innovative designs that bring ideas to life.",
    openGraph: {
        title: "Our Portfolio - Chennai Green Gifts",
        description: "Discover our portfolio showcasing a diverse range of projects. Explore our creative solutions and innovative designs that bring ideas to life.",
        images: [
            {
                url: "/assets/images/slider/slider1.webp",
                width: 1000,
                height: 719,
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

function Portfolio() {
    return (
        <Layout>
            <PortfolioGridIsotope />
        </Layout>
    );
}

export default Portfolio;
