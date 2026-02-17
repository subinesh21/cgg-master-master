
import React from 'react'
import Layout from '../ui/layout/Layout'
import Link from 'next/link'
export const metadata = {
  title: "Latest Article - Chennai Green Gifts",
  description: "Stay updated with our latest article featuring insightful tips, trends, and expert advice. Explore fresh perspectives and keep informed.",
  openGraph: {
      title: "Latest Article - Chennai Green Gifts",
      description: "Stay updated with our latest article featuring insightful tips, trends, and expert advice. Explore fresh perspectives and keep informed.",
      images: [
          {
              url: "/assets/images/blog/how-to-care-succ.webp",
              width: 1000,
              height: 719,
          },
      ],
      locale: "en_US",
      type: "website",
  },
};
function Blog() {
  return (
    <Layout>
      <section className="news-page-section rel z-1 py-130 rpy-100">
        <div className="container">
          <div className="row justify-content-center blog-grid">
            

            <div className="col-xl-4 col-md-6">
              <div className="news-item wow fadeInUp delay-0-6s">
                <div className="image">
                  <img src="/assets/images/blog/the-rise-of-seed-based-gifting.webp" alt="News" />
                  <span className="date">
                    <b>06</b> Jan
                  </span>
                </div>
                <div className="content">
                  <span className="sub-title">Seeds</span>
                  <h4>
                    <Link href="/blog/the-rise-of-seed-based-gifting">
                      The Rise of Seed-Based Gifting: A Sustainable Revolution
                    </Link>
                  </h4>
                  <Link className="read-more" href="/blog/the-rise-of-seed-based-gifting">
                      Read More <i className="fas fa-angle-double-right" />
                    
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="news-item wow fadeInUp delay-0-4s">
                <div className="image">
                  <img src="assets/images/blog/jasmine-flower-planting.webp" alt="News" />
                  <span className="date">
                    <b>26</b> Dec
                  </span>
                </div>
                <div className="content">
                  <span className="sub-title">Outdoor Gardening</span>
                  <h4>
                    <Link href="/blog/how-to-plant-grow-and-care-for-jasmine-flowers">
                      How to Plant, Grow, and Care for Jasmine Flowers: The Complete Guide
                    </Link>
                  </h4>
                  <Link className="read-more" href="/blog/how-to-plant-grow-and-care-for-jasmine-flowers">
                      Read More <i className="fas fa-angle-double-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="news-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="/assets/images/blog/how-to-care-succ.webp" alt="how-to-care-succ" />
                  <span className="date">
                    <b>16</b> Nov
                  </span>
                </div>
                <div className="content">
                  <span className="sub-title">Indoor Gardening</span>
                  <h4>
                    <Link href="/blog/how-to-care-for-succulents">
                      How to Care for Succulents: The Trendy Care Guide for Every Plant Lover
                    </Link>
                  </h4>
                  <Link className="read-more" href="/blog/how-to-care-for-succulents">
                      Read More <i className="fas fa-angle-double-right" />
                  </Link>
                </div>
              </div>
            </div>
            
            
          </div>
          {/* <ul className="pagination justify-content-center flex-wrap">
            <Pagination
              paginationCls={".blog-grid .col-xl-4"}
              defaultSort={6}
            />
          </ul> */}
        </div>
        <div className="news-shapes">
          <img
            className="onion"
            src="assets/images/shapes/onion.png"
            alt="Onion"
          />
          <img
            className="two-leaf"
            src="assets/images/slider/two-lear.png"
            alt="Leaf"
          />
          <img
            className="leaf-left"
            src="assets/images/shapes/leaf-three.png"
            alt="Leaf"
          />
          <img
            className="leaf-two"
            src="assets/images/shapes/leaf-three.png"
            alt="Leaf"
          />
          <img
            className="leaf-three"
            src="assets/images/shapes/leaf-1.png"
            alt="Leaf"
          />
          <img
            className="litchi"
            src="assets/images/shapes/litchi.png"
            alt="Litchi"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Blog