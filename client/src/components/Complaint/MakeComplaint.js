import React, { useState, useEffect } from 'react';
import NavbarFarmer from '../NavbarFarmer';
import NavbarNormalvictim from '../NavbarNormalvictim';
import Footer from '../Footer';
import Textarea from "@mui/material/TextareaAutosize";
import axios from 'axios';
import { message, Modal } from "antd";

const ComplaintForm = () => {
    const [complaint, setComplaint] = useState('');
    const [userRole, setUserRole] = useState(''); //for navbar

    useEffect(() => {
        //userId is retrieved from local storage
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, []);

    const handleSubmit = () => {
        if (complaint === '') {
            message.error('Enter Complaint first')
            return
        }

        Modal.confirm({
            title: 'Do you want to submit this complaint?',
            onOk() {
                submitComplaint();
            },
            onCancel() {
                message.info('Complaint submission canceled.');
            },
        });
    };

    const submitComplaint = async () => {
        try {
            const userToken = localStorage.getItem("token");
            const url = "http://localhost:5000/api/complaint/save";
            await axios.post(url, { complaint, userId: userToken });
            setComplaint('');
            message.success('Complaint submitted successfully!');
        } catch (error) {
            message.error('Failed to submit complaint. Please try again.');
        }
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {userRole === 'farmer' ? <NavbarFarmer /> : <NavbarNormalvictim />}

                <div style={{
                    background: 'linear-gradient(to right, #000000, #333333)',
                    color: 'white',
                    padding: '75px 88px',
                    height: '44vh',
                }}>
                    <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>Make Complaint</h1>
                    <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                        <p style={{ fontSize: '20px' }}>
                            Addressing issues starts with you! Utilize our 'Make Complaints' page to report problems, share concerns, and collaborate with us to ensure a more satisfactory experience for everyone.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h2 style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>Complaint Form</h2>
                    <Textarea
                        minRows={5}
                        cols="50"
                        placeholder="Enter your complaint"
                        size="lg"
                        variant="soft"
                        value={complaint}
                        onChange={e => setComplaint(e.target.value)}
                        required
                    />
                    <button onClick={handleSubmit} style={{
                        backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginTop: '2rem',
                        marginBottom: '2rem'
                    }} className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <div style={{ bottom: "0", width: "100%", marginTop: 'auto' }}><Footer /></div>
            </div>
        </>
    );
};

export default ComplaintForm;
