import Footer from '../Footer';
import NavbarFarmer from '../NavbarFarmer';
import Accordion from './Accordion';
import { useState } from 'react';

const FAQ = () => {
    const [accordions, setAccordion] = useState([
        {
            key: 1,
            title: 'Q: What Preparations Should I Make Before a Flood?',
            data: `A: A: Regularly check weather forecasts and flood warnings.
            Create an emergency plan for livestock and machinery.
            Ensure important documents are stored in a waterproof container.
            Build barriers or levees around critical areas if feasible.`,
            isOpen: false
        },
        {
            key: 2,
            title: 'Q: How Can I Protect Livestock During Floods?',
            data: `A: Move livestock to higher ground well in advance of a flood.
            Ensure there's enough food and fresh water in the safe area.
            Keep a list of all animals, including their location and any special needs.`,
            isOpen: false
        },
        {
            key: 3,
            title: 'Q: What Steps Should I Take After a Flood?',
            data: `A: Assess the damage to crops and property.
            Check for soil erosion and contamination.
            Contact insurance companies for damage assessments.
            Test water sources for contamination before allowing livestock to drink.`,
            isOpen: false
        },
        {
            key: 4,
            title: 'Q: How Can I Manage Crop Damage After Flooding?',
            data: `A:  Document the damage for insurance claims.
            Determine if crops can recover or if replanting is necessary.
            Test soil for nutrient loss and contamination.
            Seek advice from agricultural extension services for recovery steps.`,
            isOpen: false
        },
        {
            key: 5,
            title: 'Q: Are There Flood-Resistant Crops or Farming Techniques?',
            data: `A: Consider planting flood-tolerant crop varieties.
            Use raised beds or terracing to mitigate soil erosion.
            Implement crop rotation and soil conservation practices to enhance resilience.`,
            isOpen: false
        },
        {
            key: 6,
            title: 'Q: What Financial Assistance Is Available for Flood-Affected Farmers?',
            data: `A: Check with local agricultural agencies for disaster relief programs.
            Explore government grants and loans designed for disaster recovery.
            Consult with financial advisors or banks about low-interest loans for rebuilding.`,
            isOpen: false
        },
        {
            key: 7,
            title: 'Q: How Can I Prevent Soil Erosion After Floods?',
            data: `A: Plant cover crops to protect and enrich the soil.
            Use mulching to reduce surface runoff.
            Build or reinforce terraces and embankments.
         `,
            isOpen: false
        },
        {
            key: 8,
            title: 'Q: What Health and Safety Precautions Should I Take During Flood Cleanup?',
            data: `A: Wear protective clothing and equipment.
            Be cautious of waterborne diseases and chemical hazards.
            Avoid overexertion and ensure proper hydration and nutrition.`,
            isOpen: false
        },
        {
            key: 9,
            title: 'Q: How Can Technology Help in Managing Flood Risks in Agriculture?',
            data: `A: Utilize weather forecasting apps and flood warning systems.
            Adopt precision agriculture techniques to optimize drainage and irrigation.
            Use remote sensing and GIS for better field analysis and planning.`,
            isOpen: false
        },
        {
            key: 10,
            title: 'Q: What Community Resources Can I Access for Flood Recovery?',
            data: `A:  Join local farming groups or cooperatives for shared resources and support.
            Participate in community-based recovery programs.
            Engage with agricultural extension services for expert advice and assistance.`,
            isOpen: false
        },
    ]);

    const toggleAccordion = (accordionkey) => {
        const updatedAccordions = accordions.map((accord) => {
            if (accord.key === accordionkey) {
                return { ...accord, isOpen: !accord.isOpen };
            } else {
                return { ...accord, isOpen: false };
            }
        });

        setAccordion(updatedAccordions);
    };

    return (
        <div>
            <NavbarFarmer />
            {/* black div */}
            <div
                style={{

                    background: 'linear-gradient(to right, #000000, #333333)',
                    color: 'white',
                    padding: '75px 88px',
                    height: '40vh',
                }}
            >
                {/* FAQs Heading */}
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>FAQs</h1>

                {/* FAQs Description */}
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        Get answers to some commonly asked questions about flood protection strategies and insightful
                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '0' }}>
                        guidance on optimal crop selection practices.</p>
                </div>

            </div>

            {/* FAQs section */}

            <div style={{ margin: '5rem 15rem 1rem', paddingBottom: '6rem' }}>
                <h1 className='text-2xl mb-2 mx-auto text-green-800' style={{color: 'black', fontSize: '40px', paddingBottom: '2rem'}}>Flood Protection Strategies FAQs</h1>
                {accordions.map((accordion) => (
                    <Accordion
                        key={accordion.key}
                        title={accordion.title}
                        data={accordion.data}
                        isOpen={accordion.isOpen}
                        toggleAccordion={() => toggleAccordion(accordion.key)}
                    />
                ))}

            </div>
            <Footer/>
        </div>
    );
};

export default FAQ; 
