import Layout from "../ui/layout/Layout";
export const metadata = {
  title: "Terms and Conditions - Chennai Green Gifts",
  description: "Top Seller for Gift Plants - Outdoor and Indoor Live Plants for Return gift purposes.",
};

export default async function Home() {
    return (
        <Layout header={1}>
           
            <section className="news-section pt-130 rpt-100 pb-70 rpb-40">
                <div className="container">
                    <div className="section-page-title text-center mb-1">
                        <span className="sub-title mb-20">Legal Page</span>
                        <h1>Terms and Conditions for Chennai Green Gifts</h1>
                    </div>
                    <div className="section-content">
                        <p className="indent-[10%] text-justify">Welcome to Chennai Green Gifts. By placing an order with us, you agree to the following terms and conditions. Please read these carefully before making a purchase.</p>

                        <h2>1. Order Confirmation and Payment Terms</h2>
                        <p className="indent-[10%] text-justify">When placing an order with Chennai Green Gifts, a payment structure is in place to ensure smooth transaction processing:</p>
                        <ul>
                            <li>
                                A non-refundable deposit of <strong>50%</strong> of the total order value is required for order confirmation. This payment secures your order and allows us to begin preparation.
                            </li>
                            <li>
                                The remaining <strong>50%</strong> must be paid once the parcel is shipped or couriered. The customer will receive a notification once the shipment has been dispatched.
                            </li>
                            <li>Orders are processed only upon receipt of the first payment. Full payment must be completed before the order can be fully delivered.</li>
                        </ul>

                        <h2>2. Shipping and Delivery</h2>
                        <p className="indent-[10%] text-justify">Shipping and delivery arrangements are under the customer&rsquo;s responsibility. We will package the products and ensure that they are ready for shipment, but:</p>
                        <ul>
                            <li>
                                The <strong>shipment is the customer&rsquo;s scope</strong>. This includes choosing the shipping service, paying for shipping costs, and tracking the delivery.
                            </li>
                            <li>Chennai Green Gifts is not liable for delays, damages, or issues arising during shipment.</li>
                        </ul>

                        <h2>3. Non-Refundable Products</h2>
                        <p className="indent-[10%] text-justify">
                            Our products, primarily live plants, are delicate in nature and require specific care. Therefore, all plants and other perishable items sold by Chennai Green Gifts are <strong>non-refundable</strong>. This includes:
                        </p>
                        <ul>
                            <li>No returns or refunds will be issued once the product has been delivered.</li>
                            <li>Customers are advised to inspect their orders upon delivery and contact us immediately in case of any visible damage during shipping.</li>
                        </ul>

                        <h2>4. Product Quality</h2>
                        <p className="indent-[10%] text-justify">We strive to ensure that all our products are of the highest quality and delivered in the best possible condition. However, due to the nature of live plants, we cannot guarantee that all plants will be identical in appearance, size, or shape. Slight variations may occur.</p>

                        <h2>5. Customer Responsibilities</h2>
                        <p className="indent-[10%] text-justify">Once the products are received, the customer is responsible for providing the appropriate care to keep the plants healthy. We provide basic care instructions, but the survival and thriving of the plants depend on the customer’s adherence to these guidelines.</p>

                        <h2>6. Cancellation Policy</h2>
                        <p className="indent-[10%] text-justify">Cancellations are only accepted before the production or preparation of your order has begun. Once the order has entered the preparation or shipping stage, the deposit becomes non-refundable.</p>

                        <h2>7. Changes to Terms and Conditions</h2>
                        <p className="indent-[10%] text-justify">Chennai Green Gifts reserves the right to update or modify these terms and conditions at any time without prior notice. Any changes will be posted on this page, and it is the customer’s responsibility to review these terms before placing an order.</p>

                        <h2>8. Contact Information</h2>
                        <p>If you have any questions or concerns about these terms, feel free to contact us at:</p>
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
