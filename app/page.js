import Image from "next/image";
import Link from "next/link";
import { getSession } from "./lib/actions";
import Layout from "./ui/layout/Layout";
import { HomeSlider1 } from "./ui/HomeSlider";
import AboutSection from "./ui/AboutSection";
import OfferSection from "./ui/OfferSection";
import dynamic from "next/dynamic";
const TrendyProducts = dynamic(
  () => import("./ui/comps/TrendyProducts"),
  {
    ssr: false,
  }
);
export default async function Home() {
    const session = await getSession()
    console.log(session);
    return (
        <Layout>
      {/* Slider Section */}
      <section className="slider-section bg-lighter">
        <div className="main-slider-active">
          <HomeSlider1 />
        </div>
        <img
          className="bg-leaf"
          src="assets/images/slider/slider-bg-leaf.png"
          alt="Shape"
        />
        <img
          className="bg-shape"
          src="assets/images/slider/slider-bg-shape.png"
          alt="Shape"
        />
      </section>
      {/* About Section */}
      <section className="about-section-two rel z-1 pt-130 rpt-100">
        <AboutSection />
        <div className="about-shapes">
          <img src="assets/images/shapes/about-shape1.png" alt="Shape" />
          <img src="assets/images/shapes/about-shape2.png" alt="Shape" />
        </div>
      </section>

      {/* Offers Section */}
      <section
        className="special-offer-two bgs-cover rel z-1 py-80 rpt-80"
        style={{
          backgroundImage: "url(assets/images/offers/special-offer-bg-img.jpg)",
        }}
      >
        <OfferSection />
        <img
          className="offer-bg"
          src="assets/images/offers/special-offer-bg.png"
          alt="Offer BG"
        />
        <img
          className="shape-one"
          src="assets/images/shapes/special-offer1.png"
          alt="Shape"
        />
        <img
          className="shape-two"
          src="assets/images/shapes/special-offer2.png"
          alt="Shape"
        />
      </section>
      
      <section className="what-we-provide rel z-1 py-60 rpt-100">
        <div className="container">
          <div className="section-title text-center mb-30">
            <span className="sub-title mb-10">Features</span>
            <h2>Range of customization</h2>
          </div>
          <div className="row justify-content-between">
            <div className="col-xl-3 col-md-4">
              <div className="what-we-provide-left wow fadeInUp delay-0-2s">
                <div className="ww-provide-item">
                  <div className="icon">
                    <img src="assets/images/services/icon1.png" alt="Icon" />
                  </div>
                  <h4>
                    <Link href="/service-details">Customized Wishnotes</Link>
                  </h4>
                  <p>Personalize your gifts with a heartfelt message! Our wishnotes come in stunning colors like red, green, blue, and gold, adding a vibrant and personal touch to each gift.</p>
                </div>
                <div className="ww-provide-item">
                  <div className="icon">
                    <img src="assets/images/services/icon2.png" alt="Icon" />
                  </div>
                  <h4>
                    <Link href="/service-details">Bow Customization</Link>
                  </h4>
                  <p>Add a touch of elegance to your gifts with our colorful bow options. Choose from a variety of shades to match your theme and style.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-md-4 align-self-center">
              <div className="what-we-provide-images rmt-10 rmb-55 wow fadeInUp delay-0-4s">
                <img
                  src="assets/images/services/what-we-provide.png"
                  alt="Service"
                />
                <img
                  className="bg"
                  src="assets/images/services/service-center-bg.png"
                  alt="Backgroound"
                />
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="what-we-provide-right wow fadeInUp delay-0-6s">
                <div className="ww-provide-item">
                  <div className="icon">
                    <img src="assets/images/services/icon3.png" alt="Icon" />
                  </div>
                  <h4>
                    <Link href="/service-details">Planter Customization</Link>
                  </h4>
                  <p>Select the perfect planter to match your theme, with options like elegant ceramic, rustic terracotta, lightweight ceramic-finish plastic, or eco-friendly coir pots.</p>
                </div>
                <div className="ww-provide-item">
                  <div className="icon">
                    <img src="assets/images/services/icon4.png" alt="Icon" />
                  </div>
                  <h4>
                    <Link href="/service-details">Diverse Plant Selection</Link>
                  </h4>
                  <p>Choose from 30+ indoor and 70+ outdoor plant varieties, including air-purifiers, succulents, and other low-maintenance options to delight your guests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ww-provide-shapes">
          <img
            className="shape-one"
            src="assets/images/shapes/ww-provide1.png"
            alt="Shape"
          />
          <img
            className="shape-two"
            src="assets/images/shapes/ww-provide3.png"
            alt="Shape"
          />
          <img
            className="shape-three"
            src="assets/images/shapes/ww-provide3.png"
            alt="Shape"
          />
        </div>
      </section>
      <section className="shop-area-four rel z-1 pt-80 pb-50">
        <div className="container-fluid">
          <TrendyProducts />
        </div>
      </section>
      
    </Layout>
    );
}