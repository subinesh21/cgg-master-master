import React from "react";
import Layout from "./ui/layout/Layout";

function notFound() {
    return (
        <Layout>
            <section className="news-section pt-130 rpt-100 pb-70 rpb-40">
                <div className="container">
                    <img src="/assets/images/404.png" alt="Not found" />
                </div>
            </section>
        </Layout>
    );
}

export default notFound;
