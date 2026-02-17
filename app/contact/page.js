import React from 'react'
import Layout from '../ui/layout/Layout'
import ContactForm from '../ui/comps/ContactForm'
export const metadata = {
  title: "Contact Us - Chennai Green Gifts",
  description: "Get in touch with us! Visit our Contact Us page for inquiries, support, or feedback. We're here to assist you with any questions or concerns.",
  openGraph: {
      title: "Contact Us - Chennai Green Gifts",
      description: "Get in touch with us! Visit our Contact Us page for inquiries, support, or feedback. We're here to assist you with any questions or concerns.",
      images: [
          {
              url: "/assets/images/contact/contact-right.png",
              width: 451,
              height: 511,
          },
      ],
      locale: "en_US",
      type: "website",
  },
};
function Contact() {
  return (
    <Layout>
      <section className="contact-info-area rel z-1 pt-130 rpt-100">
        <div className="container">
          <div className="section-title contact-title mb-50 wow fadeInUp delay-0-2s">
            <span className="sub-title mb-15">Get in Touch</span>
            <h3>Need Consultations ?</h3>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="contact-info-item wow fadeInUp delay-0-4s">
                <div className="icon">
                  <img src="assets/images/contact/icon1.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Location</h4>
                  <span>436, 2nd Cross Street, Uthandi, ECR, Chennai - 119</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact-info-item wow fadeInUp delay-0-5s">
                <div className="icon">
                  <img src="assets/images/contact/icon2.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Email Us</h4>
                  <a href="mailto:chennaigreengifts@gmail.com">chennaigreengifts@gmail.com</a>
                  <br />
                  
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact-info-item wow fadeInUp delay-0-6s">
                <div className="icon">
                  <img src="assets/images/contact/icon3.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Phone Us</h4>
                  <a href="callto:+916380007611">+91 63800 07611</a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-shapes">
          
          <img
            className="pumpkin"
            src="assets/images/shapes/special-offer1.png"
            alt="pumpkin"
          />
        </div>
      </section>
      {/* Contact Info End */}
      {/* Contact From Start */}
      <section className="contact-form-area rel z-1 pt-100 rpt-70 pb-130 rpb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ContactForm />
            </div>
            <div className="col-lg-6">
              <div className="contact-right-image wow fadeInRight delay-0-4s">
                <img
                  src="assets/images/contact/contact-right.png"
                  alt="Contact From"
                />
                <img
                  className="bg"
                  src="assets/images/contact/contact-right-bg.png"
                  alt="Contact From BG"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="contact-shapes">
          <img
            className="leaf"
            src="assets/images/shapes/leaf-1.png"
            alt="Leaf"
          />
          <img
            className="shape"
            src="assets/images/shapes/contact-shape.png"
            alt="Shape"
          />
          <img
            className="two-leaf"
            src="assets/images/shapes/two-lear.png"
            alt="Leaf"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Contact