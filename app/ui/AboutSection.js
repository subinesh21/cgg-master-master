import Link from 'next/link'
import React from 'react'

function AboutSection() {
  return (
    <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-two-image wow fadeInUp delay-0-2s">
                <img
                  className="image"
                  src="assets/images/about/about-left.jpg"
                  alt="About"
                />
                <img
                  className="about-over"
                  src="assets/images/about/about-left-over.png"
                  alt="About"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-two-content pt-60 wow fadeInUp delay-0-4s">
                <div className="section-title mb-35">
                  <span className="sub-title mb-20">Why Choose Us</span>
                  <h2>Why Choose Chennai Green Gifts?</h2>
                </div>
                <p>
                At Chennai Green Gifts, we believe that every celebration deserves a touch of nature, and every gift can make a difference. Here&rsquo;s why you should choose us for your special occasions
                </p>
                <Link className="read-more" href="/about">
                    Read More <i className="fas fa-angle-double-right" />
                </Link>
                <div className="about-features mt-70">
                  <div className="row">
                    <div className="col-xl-4 col-md-6">
                      <div className="about-feature-item wow fadeInUp delay-0-6s">
                        <span className="number">1</span>
                        <div className="icon">
                          <i className="flaticon-leaf-1" />
                        </div>
                        <h4>
                          <Link href="/service-details">Eco-Friendly</Link>
                        </h4>
                        <p>Sustainable, plant-based gifts that care for the planet.</p>
                        <img src="assets/images/about/arrow.png" alt="Arrow" />
                      </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <div className="about-feature-item wow fadeInUp delay-0-7s">
                        <span className="number">2</span>
                        <div className="icon">
                          <i className="flaticon-social-care" />
                        </div>
                        <h4>
                          <Link href="/service-details">
                          Unique Gifts
                          </Link>
                        </h4>
                        <p>Living plants symbolize growth and positivity.</p>
                        <img src="assets/images/about/arrow.png" alt="Arrow" />
                      </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                      <div className="about-feature-item wow fadeInUp delay-0-8s">
                        <span className="number">3</span>
                        <div className="icon">
                          <i className="flaticon-delivery-man" />
                        </div>
                        <h4>
                          <Link href="/service-details">Customizable</Link>
                        </h4>
                        <p>Tailored options for weddings, birthdays, and more.</p>
                        <img src="assets/images/about/arrow.png" alt="Arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AboutSection