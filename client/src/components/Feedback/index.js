// Import necessary dependencies and styles if needed
import React, { useState, useEffect } from 'react';
import NavbarFarmer from '../NavbarFarmer';
import NavbarNormalvictim from '../NavbarNormalvictim'
import Footer from '../Footer';
import Textarea from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { Rating, Typography, Alert } from '@mui/material';
import axios from 'axios';

// FeedbackForm component
const FeedbackForm = () => {

    const [feedback, setFeedback] = useState('');
    const [userRole, setUserRole] = useState('');
    const [rating, setRating] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {

        //userId is retreived from local storage
        const role = localStorage.getItem('role');
        setUserRole(role);

    }, []);


    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (feedback === '' || rating === null) {
            alert('Enter feedback and also rate your experience')
            setShowSuccessAlert(false)
            return
        }

        const userToken = localStorage.getItem("token");
        const url = "http://localhost:5000/api/feedback/save";

        const { data } = await axios.post(url, { feedback, rating, userId: userToken });
        console.log(data)

        setFeedback('')
        setRating('')
        setShowSuccessAlert(true)
    };

    return (
        <>
            <div>
                {userRole === 'farmer' ? <NavbarFarmer /> : <NavbarNormalvictim />}
                {showSuccessAlert && <Alert severity="success" style={{ width: '100%', fontSize: '17px' }} onClose={() => setShowSuccessAlert(false)}>Feedback submitted successfully!</Alert>}

                {/* black div */}
                <div
                    style={{
                        background: 'linear-gradient(to right, #000000, #333333)',
                        color: 'white',
                        padding: '60px 88px',
                        height: '31vh',
                    }}
                >
                    {/* Heading */}
                    <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>Feedback</h1>

                    {/* Description */}
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

                    <Button onClick={handleSubmit} style={{
                        backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "30px", width: "140px",
                        fontWeight: "bold",
                        fontSize: "15px",
                        cursor: "pointer",
                        marginTop: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        Submit
                    </Button>

                </div>

                <Footer />


            </div>
        </>
    );
};

export default FeedbackForm;

