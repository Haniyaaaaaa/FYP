import React, { useState } from 'react'
import Gallery from './Gallery'
import NavbarNormalvictim from '../NavbarNormalvictim'
import Footer from '../Footer'
import { Button } from '@mui/material';
import axios from "axios";
import Alert from '@mui/material/Alert';

export default function ElearningCourses() {

    const [notes, setNotes] = useState('')
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savedNotes, setSavedNotes] = useState([]);

    const handleSaveNotes = async () => {
        const url = `http://localhost:5000/api/notes/save`;

        const userToken = localStorage.getItem("token");

        // Check if notes is empty or contains only whitespace
        if (!notes.trim()) {
            // Show an alert to the user
            alert("Notes cannot be empty");
            return;
        }

        try {
            const { data } = await axios.post(url, { userId: userToken, notes });

            if (data.message === 'Notes saved successfully') {
                // Show success alert
                setShowSuccessAlert(true);
                setNotes("");
            }
        } catch (error) {
            // Handle errors if needed
            console.error('Error saving notes:', error);
        }

    }

    const handleViewSavedNotes = async () => {
        try {

            const userToken = localStorage.getItem("token");

            const url = `http://localhost:5000/api/notes/view/${userToken}`;

            // Send a request to get saved notes
            const { data } = await axios.get(url);

            // If the status is 200, update the 'savedNotes' state
            if (data && data.allNotes) {
                setSavedNotes(data.allNotes);

            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            // Handle error, show an alert, or perform other actions
        }
    };


    const handleNotesChange = (event) => {
        // Update the 'notes' state with the notes entered by the user
        setNotes(event.target.value);
    };

    return (
        <div>
            <NavbarNormalvictim />
            {/* black div */}
            <div
                style={{

                    background: 'linear-gradient(to right, #000000, #333333)',
                    color: 'white',
                    padding: '75px 88px',
                    height: '40vh',
                }}
            >
                {/* Heading */}
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>E-LEARNING RESOURCES ON FLOOD PREPAREDNESS</h1>

                {/* Description */}
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        Discover flood preparedness through our video-focused e-learning resources. Gain essential insights and

                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '0' }}>
                        skills to effectively respond to flood-related challenges with engaging video content.</p>
                </div>

            </div>
            <Gallery />

            {/* notes */}
            <div style={{ marginBottom: '3rem' }}>

                <h4 style={{ marginLeft: "11rem", marginTop: "40px", marginBottom: "10px" }}>Take Notes</h4>
                <div class="form-outline" data-mdb-input-init style={{ border: "1px solid #ced4da", width: '105vh', height: '25vh', marginLeft: "11rem", marginBottom: "1rem" }}>
                    <textarea class="form-control" id="textAreaExample" rows="4" value={notes} onChange={handleNotesChange} placeholder='Enter notes'></textarea>
                </div>

                {/* successa alert */}
                {showSuccessAlert && (
                    <Alert
                        severity="success"
                        onClose={() => setShowSuccessAlert(false)}
                        style={{ margin: '10px 10px' }}
                    >
                        Notes saved successfully!
                    </Alert>
                )}

                <div style={{ marginLeft: "25rem" }}>
                    <Button style={{
                        backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "30px", width: "140px",
                        fontWeight: "bold",
                        fontSize: "15px",
                        cursor: "pointer",
                    }}
                        onClick={handleSaveNotes}>Save Notes</Button>

                    <Button style={{
                        backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "30px", width: "190px", marginLeft: '10px',
                        fontWeight: "bold",
                        fontSize: "15px",
                        cursor: "pointer",
                    }}
                        onClick={handleViewSavedNotes}>View Saved Notes</Button>

                </div>

                {savedNotes.length > 0 && (
                    <div style={{ marginLeft: "11rem", marginTop: "40px", marginBottom: "10px" }}>
                        <h4>Your Notes</h4>
                        <ul style={{ listStyleType: 'disc' }}>
                            {savedNotes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>

            <Footer />
        </div>
    )
}
