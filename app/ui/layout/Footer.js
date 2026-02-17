import Link from "next/link";

const Footer = () => {
      return <DefaultFooter />;
};
export default Footer;

const ScrollTopBtn = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      style={{ display: "inline-block" }}
      className="scroll-top scroll-to-target"
      data-target="html"
      onClick={() => scrollTop()}
    >
      <span className="fas fa-angle-double-up" />
    </button>
  );
};

const DefaultFooter = () => (
  <footer className="main-footer bg-green text-white">
    <div className="container">
      
      <div className="row justify-content-center pt-80">
        <div className="col-lg-4 col-md-6 order-md-2">
          <div className="footer-widget about-widget text-center">
            <div className="footer-logo mb-30">
              <Link href="/">
                
                  <img src="/assets/images/logos/logo.png" alt="Logo" />
                
              </Link>
            </div>
            <p className="text-sm">
            Chennai Green Gifts specializes in eco-friendly, plant-based return gifts for weddings, baby showers, birthdays, and other special occasions. Our sustainable offerings bring a touch of nature to every celebration.
            </p>
            <div className="social-style-two pt-10">
              <Link href="https://www.facebook.com/chennaigreengifts/">
                
                  <i className="fab fa-facebook-f" />
                
              </Link>
              <Link href="https://www.instagram.com/chennai_green_gifts/">
                
                  <i className="fab fa-instagram" />
                
              </Link>
              <Link href="https://www.linkedin.com/company/chennai-green-gifts/">
                
                  <i className="fab fa-linkedin-in" />
                
              </Link>

            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 order-md-1">
          <div className="footer-widget menu-widget two-column">
            <h4 className="footer-title text-white">Quick Links</h4>
            <ul>
              <li>
                <Link href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/catalog">Flower Plants</Link>
              </li>
              <li>
                <Link href="/portfolio">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/catalog">Succulents</Link>
              </li>
              <li>
                <Link href="/portfolio">
                Portfolio
                </Link>
              </li>
              <li>
                <Link href="/catalog">
                  Cactus
                </Link>
              </li>
              <li>
                <Link href="/catalog">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/terms">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">Setting &amp; Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 order-md-3">
          <div className="footer-widget contact-widget">
            <h4 className="footer-title text-white">Contact Us</h4>
            <p className="mb-10 text-sm">
            For any inquiries or to place an order, feel free to contact us. We&rsquo;d love to help make your event eco-friendly and memorable!
            </p>
            <ul>
              <li className="text-sm">
                <i className="fal fa-map-marker-alt" />
                436, 2nd Cross, VGP Layout, Uthandi, ECR, Chennai.
              </li>
              <li className="text-sm">
                <i className="far fa-phone" />
                <a href="tel:+916380007611">+91 63800 07611</a>
              </li>
              <li className="text-sm">
                <i className="far fa-envelope" />
                <a href="mailto:chennaigreengifts@gmail.com">chennaigreengifts@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright-area text-sm pt-25 pb-10">
        <p className="mb-15">Copyright © 2024 Chennai Green Gifts. All Rights Reserved.</p>
        <ul className="footer-menu">
          <li>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/faq">
              Faqs
            </Link>
          </li>
          <li>
            <Link href="/terms">Terms and Conditions</Link>
          </li>
        </ul>
        {/* Scroll Top Button */}
        <ScrollTopBtn />
      </div>
    </div>
    <div className="footer-shapes">
      <img
        className="footer-bg"
        src="/assets/images/background/footer-bg-shape.png"
        alt="Shape"
      />
      <img
        className="shape-one"
        src="/assets/images/shapes/footer1.png"
        alt="Shape"
      />
      <img
        className="shape-two"
        src="/assets/images/shapes/footer2.png"
        alt="Shape"
      />
      <img
        className="shape-three"
        src="/assets/images/shapes/footer3.png"
        alt="Shape"
      />
      <img
        className="shape-four"
        src="/assets/images/shapes/footer4.png"
        alt="Shape"
      />
    </div>
  </footer>
);

