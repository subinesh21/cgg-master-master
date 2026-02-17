"use client"
import React from 'react'
import { Accordion } from 'rsuite'
import 'rsuite/dist/rsuite.min.css';
function FrequentQuestion() {
  return (
    <Accordion>
            <Accordion.Panel header="1. What types of events do you cater to?" defaultExpanded>
                <p>We provide eco-friendly return gifts for weddings, baby showers, birthdays, corporate events, and other special occasions.</p>
            </Accordion.Panel>
            <Accordion.Panel header="2. Can I customize the gifts?">
                <p>Absolutely! You can customize the bow, wishnote, planter type, and even select from 100+ plant varieties to match your preferences.</p>
            </Accordion.Panel>
            <Accordion.Panel header="3. Do you offer bulk discounts?">
                <p>Yes, we offer special pricing for bulk orders. Contact us for a personalized quote based on your requirements.</p>
            </Accordion.Panel>
            <Accordion.Panel header="4. What is the lead time for orders?">
                <p>We recommend placing your order at least 2-3 weeks in advance for smooth processing and delivery. However, we can accommodate shorter timelines based on availability.</p>
            </Accordion.Panel>
            <Accordion.Panel header="5. Do you deliver to all locations?">
                <p>We deliver across Chennai and nearby areas. For outstation deliveries, please reach out to discuss shipping options.</p>
            </Accordion.Panel>
            <Accordion.Panel header="6. What plants are available for gifting?">
                <p>We offer 30+ indoor varieties like succulents and air-purifying plants, as well as 70+ outdoor plants to suit your needs.</p>
            </Accordion.Panel>
            <Accordion.Panel header="7. Are the gifts eco-friendly?">
                <p>Yes, all our gifts are designed to promote sustainability, featuring plants, biodegradable packaging, and eco-friendly options.</p>
            </Accordion.Panel>
            <Accordion.Panel header="8. Can I see samples before placing a bulk order?">
                <p>Yes, we can arrange samples for bulk orders (above 1000 pcs) you to review before confirming your order. Transportation costs for samples will be charged additionally.</p>
            </Accordion.Panel>
            <Accordion.Panel header="9. What if I need help choosing the right gifts?">
                <p>Our team is here to help! We can guide you through customization options and suggest the best choices based on your event and theme.</p>
            </Accordion.Panel>
            <Accordion.Panel header="10. How do I care for the plants after gifting?">
                <p>We include care instructions with each plant to ensure they thrive, even for first-time plant owners.</p>
            </Accordion.Panel>
          </Accordion>
  )
}

export default FrequentQuestion