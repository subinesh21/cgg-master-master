import Image from "next/image";
import Link from "next/link";
import Layout from "../ui/layout/Layout";

export const metadata = {
    title: "Privacy Policy - Chennai Green Gifts",
    description: "Top Seller for Gift Plants - Outdoor and Indoor Live Plants for Return gift purposes.",
};
export default async function Home() {
    return (
        <Layout header={1}>
            <section className="news-section pt-130 rpt-100 pb-70 rpb-40">
                <div className="container">
                    <div className="section-page-title text-center mb-1">
                        <span className="sub-title mb-20">Legal Page</span>
                        <h1>Privacy Policy for Chennai Green Gifts</h1>
                    </div>
                    <div className="section-content">
                        <p className="indent-[10%] text-justify">At Chennai Green Gifts, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services. By using our website and services, you agree to the terms of this Privacy Policy.</p>

                        <h2>1. Information We Collect</h2>
                        <p>We may collect the following information from you:</p>
                        <ul>
                            <li>
                                <strong>Personal Information</strong>: Name, contact details (phone number, email address), and shipping/billing addresses when you place an order.
                            </li>
                            <li>
                                <strong>Payment Information</strong>: Payment details required to complete your purchase. We do not store your payment details; they are processed securely through third-party payment gateways.
                            </li>
                            <li>
                                <strong>Communication Data</strong>: When you contact us via email, phone, or through our website, we may collect and store your communication to provide better service and respond to your inquiries.
                            </li>
                            <li>
                                <strong>Usage Data</strong>: We may collect information about how you interact with our website, including IP addresses, browser type, and pages viewed, to enhance the user experience.
                            </li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use your information for the following purposes:</p>
                        <ul>
                            <li>To process and fulfill orders placed on our website.</li>
                            <li>To communicate with you regarding your orders, inquiries, and promotions.</li>
                            <li>To improve our website, products, and customer service.</li>
                            <li>To send promotional offers and updates, with your consent.</li>
                            <li>For internal analytics to understand user preferences and trends.</li>
                        </ul>

                        <h2>3. Third-Party Service Providers</h2>
                        <p className="indent-[10%] text-justify">We may share your data with trusted third parties who assist us in operating our website, conducting our business, or servicing you. These service providers are bound to confidentiality agreements and only use your information to perform specific services.</p>
                        <h3 className="mt-10">Website Maintenance and Communication:</h3>
                        <p className="indent-[10%] text-justify">
                            Our website is maintained by <strong>Ontwerp Alanytics Private Limited</strong>, who ensures the website&rsquo;s functionality and security. Ontwerp Alanytics Private Limited also has the authority to send transaction-related and promotional SMS on behalf of Chennai Green Gifts. These communications will be in compliance with applicable laws and your consent preferences.
                        </p>

                        <h2>4. Data Security</h2>
                        <p className="indent-[10%] text-justify">We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.</p>

                        <h2>5. Cookies</h2>
                        <p className="indent-[10%] text-justify">Our website uses cookies to enhance your browsing experience. Cookies are small data files that are placed on your device to help us understand how you use our site. You may choose to disable cookies through your browser settings, but this may limit some functionality of the website.</p>

                        <h2>6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access and review the personal information we hold about you.</li>
                            <li>Request corrections or updates to your information.</li>
                            <li>Opt-out of promotional communications at any time.</li>
                            <li>Request the deletion of your personal data, where applicable.</li>
                        </ul>

                        <h2>7. Changes to the Privacy Policy</h2>
                        <p className="indent-[10%] text-justify">We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page, and you will be notified via email if significant changes are made.</p>

                        <h2>8. Contact Us</h2>
                        <p className="indent-[10%] text-justify">If you have any questions or concerns regarding this Privacy Policy or how we handle your data, please contact us at:</p>
                        <p className="mt-10">
                            <strong>Chennai Green Gifts</strong>
                            <br />
                            Email: chennaigreengifts@gmail.com
                            <br />
                            Phone: +91 63800 07611
                        </p>

                        <p>
                            Effective Date: 01-10-2024
                            <br />
                            Last Updated: 03-10-2024
                        </p>
                    </div>
                </div>
                <div className="news-shapes">
                    <img className="onion" src="assets/images/shapes/onion.png" alt="Onion" />
                    <img className="two-leaf" src="assets/images/slider/two-lear.png" alt="Leaf" />
                    <img className="half-leaf" src="assets/images/slider/half-leaf.png" alt="Leaf" />
                    <img className="leaf-two" src="assets/images/shapes/leaf-three.png" alt="Leaf" />
                    <img className="leaf-three" src="assets/images/shapes/leaf-four.png" alt="Leaf" />
                </div>
            </section>
            {/* News Section End */}
            {/* Client Logo Section Start */}
            {/* <div className="client-logo-section text-center bg-light-green py-60">
        <div className="container">
          <ClientLogoSlider />
        </div>
        <div className="client-logo-shapes">
          <img
            className="shape-one"
            src="assets/images/shapes/cl-shape1.png"
            alt="Shape"
          />
          <img
            className="shape-two"
            src="assets/images/shapes/cl-shape2.png"
            alt="Shape"
          />
          <img
            className="shape-three"
            src="assets/images/shapes/cl-shape3.png"
            alt="Shape"
          />
          <img
            className="shape-four"
            src="assets/images/shapes/cl-shape4.png"
            alt="Shape"
          />
          <img
            className="shape-five"
            src="assets/images/shapes/cl-shape5.png"
            alt="Shape"
          />
          <img
            className="shape-six"
            src="assets/images/shapes/cl-shape6.png"
            alt="Shape"
          />
        </div>
      </div> */}
        </Layout>
    );
}
