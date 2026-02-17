import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react'
const MunfimCountdown = dynamic(
  () => import("./layout/MunfimCountdown"),
  {
    ssr: false,
  }
);
function OfferSection() {
  return (
    <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="special-offer-left text-center rmb-35 wow fadeInUp delay-0-2s">
                <img
                  src="assets/images/offers/special-offer-left.png"
                  alt="Offer"
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="special-offer-content text-center wow fadeInUp delay-0-4s">
                <div className="section-title mb-15">
                  <span className="sub-title mb-10">55% Off for Bulk Orders</span>
                  <h2>Special Deal Of This Week</h2>
                </div>
                
                <MunfimCountdown />
                <div className="count-down-btns mt-10">
                  <Link className="theme-btn style-two" href="/shop-grid">
                      Order Now <i className="fas fa-angle-double-right" />
                  </Link>
                  <Link className="theme-btn style-two" href="/about">
                      Learn More <i className="fas fa-angle-double-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default OfferSection