// Import necessary dependencies and styles if needed
import React, { useState, useEffect } from 'react';
import NavbarFarmer from '../NavbarFarmer';
import NavbarNormalvictim from '../NavbarNormalvictim';
import Footer from '../Footer';
import Textarea from "@mui/material/TextareaAutosize";
import { Rating, Typography } from '@mui/material';
import axios from 'axios';
import { Modal, message } from "antd";

// FeedbackForm component
const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');
    const [userRole, setUserRole] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        //userId is retrieved from local storage
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, []);

    const handleSubmit = () => {
        if (feedback === '' || rating === '' || rating === null) {
            message.error('Enter feedback and also rate your experience');
            return;
        }

        Modal.confirm({
            title: 'Do you want to submit this feedback?',
            onOk() {
                submitFeedback();
            },
            onCancel() {
                message.info('Feedback submission canceled.');
            },
        });
    };

    const submitFeedback = async () => {
        try {
            const userToken = localStorage.getItem("token");
            const url = "http://localhost:5000/api/feedback/save";
            await axios.post(url, { feedback, rating, userId: userToken });
            setFeedback('');
            setRating('');
            message.success('Feedback submitted successfully!');
        } catch (error) {
            message.error('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <>
            <div>
                {userRole === 'farmer' ? <NavbarFarmer /> : <NavbarNormalvictim />}

                <div style={{
                    background: 'linear-gradient(to right, #000000, #333333)',
                    color: 'white',
                    padding: '60px 88px',
                    height: '31vh',
                }}>
                    <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>Feedback</h1>
                    <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                        <p style={{ fontSize: '20px' }}>
                            Your feedback is invaluable to us! Share your thoughts and experiences to help us enhance our services and better meet your needs.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h2 style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>Feedback Form</h2>
                    <Textarea
                        minRows={5}
                        cols="50"
                        placeholder="Enter your feedback"
                        size="lg"
                        variant="soft"
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        required
                    />
                    <Typography component="legend" style={{ marginTop: '1rem', fontWeight: '500', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>Rate your experience</Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <button className="btn btn-primary" onClick={handleSubmit} style={{
                        backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginTop: '2rem',
                        marginBottom: '2rem'
                    }}>
                        Submit
                    </button>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default FeedbackForm;
