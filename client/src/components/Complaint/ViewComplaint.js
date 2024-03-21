import Footer from '../Footer';
import NavbarFarmer from '../NavbarFarmer';
import Accordion from './ComplaintsAccordion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarNormalvictim from '../NavbarNormalvictim'

const ViewComplaint = () => {

    const [accordions, setAccordion] = useState([]);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {

        const fetchComplaints = async () => {
            try {
                const userToken = localStorage.getItem("token");
                const role = localStorage.getItem('role');
                setUserRole(role);

                const url = `http://localhost:5000/api/complaint/get-complaint/${userToken}`;

                const response = await axios.get(url);

                // Assuming your server response contains an array of complaints
                const fetchedAccordions = response.data.map((item, index) => {
                    const title = `${item.complaint}`;
                    const responseText = item.response !== null ? <span style={{ fontWeight: 'bold' }}>Response:</span> : ''; // Include bold style only when there is a response
                    const data = (
                        <span>
                            {responseText}
                            {item.response !== null ? ` ${item.response}` : "Not responded yet"}
                        </span>
                    );

                    return {
                        key: index + 1,
                        title: title,
                        data: data,
                        isOpen: false
                    };
                });


                setAccordion(fetchedAccordions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchComplaints();
    }, []);





    return (
        <div>
            {userRole === 'farmer' ? <NavbarFarmer /> : <NavbarNormalvictim />}

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
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>Complaints</h1>

                {/* FAQs Description */}
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        Explore a comprehensive overview of your submitted complaints, each detailing the issues you've raised. Gain insights into the status and responses provided by administrators, ensuring a transparent and informative experience on your concerns.
                    </p>

                </div>

            </div>

            {/* FAQs section */}

            <div style={{ margin: '5rem 15rem 1rem', paddingBottom: '6rem' }}>
                <h1 className='text-2xl mb-2 mx-auto text-green-800' style={{ color: 'black', fontSize: '40px', paddingBottom: '2rem' }}>Complaints</h1>
                {accordions.map((accordion) => (
                    <Accordion
                        key={accordion.key}
                        title={accordion.title}
                        data={accordion.data}
                        isOpen={true}

                    />
                ))}

            </div>
            <div style={{ position: 'fixed', bottom: '0', width: '100%' }} >
                <Footer />
            </div>
        </div>
    );
};

export default ViewComplaint; 
