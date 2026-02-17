
import React from 'react'
import Layout from '../ui/layout/Layout'
import FrequentQuestion from '../ui/comps/FrequentQuestion';
export const metadata = {
  title: "Frequently Asked Questions - Chennai Green Gifts",
  description: "Find answers to common questions on our FAQ page. Explore detailed information and solutions to help you with your queries quickly and easily.",
};
function Faq() {
  return (
    <Layout>
      <section className="faq-section rel z-1 pt-130 rpt-100">
        <div className="container">
          <div className="section-title text-center mb-60">
            <span className="sub-title mb-20">Frequently Asked Questions</span>
            <h2>Have any Questions</h2>
          </div>
          <FrequentQuestion />
        </div>
        <div className="faq-shapes">
          <img
            className="shape-one"
            src="assets/images/shapes/faq-shape1.png"
            alt="Shape"
          />
          <img
            className="shape-two"
            src="assets/images/shapes/faq-shape2.png"
            alt="Shape"
          />
          <img
            className="shape-three"
            src="assets/images/shapes/faq-shape3.png"
            alt="Shape"
          />
          <img
            className="shape-four"
            src="assets/images/shapes/faq-shape4.png"
            alt="Shape"
          />
        </div>
      </section>

    </Layout>
  )
}

export default Faq