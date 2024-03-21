import React, { useState } from 'react'
import Gallery from './Gallery'
import NavbarNormalvictim from '../NavbarNormalvictim'
import Footer from '../Footer'
import axios from "axios";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { message } from "antd";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function ElearningCourses() {

    const [notes, setNotes] = useState('')
    const [savedNotes, setSavedNotes] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleSaveNotes = async () => {
        const url = `http://localhost:5000/api/notes/save`;

        const userToken = localStorage.getItem("token");

        // Check if notes is empty or contains only whitespace
        if (!notes.trim()) {
            message.warning('Notes cannot be empty')
            return;
        }

        try {
            const { data } = await axios.post(url, { userId: userToken, notes });

            if (data.message === 'Notes saved successfully') {
                message.success('Notes saved successfully!');
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
            // If the status is 404(no notes), show message to user
            console.error("Error fetching notes:", error);
            message.error("You haven't added any notes yet")
            setSavedNotes([]); // Clear savedNotes state
        }
    };


    const handleNotesChange = (event) => {
        // Update the 'notes' state with the notes entered by the user
        setNotes(event.target.value);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);

        // If the user clicks on the "View Saved Notes" tab, fetch saved notes
        if (newValue === 2) {
            handleViewSavedNotes();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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

            <div style={{ display: 'flex', overflowX: 'hidden' }}>
                <div style={{ marginTop: '6rem' }}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleTabChange}
                        aria-label="Vertical tabs example"
                        sx={{ width: '170px', borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Gallery" {...a11yProps(0)} />
                        <Tab label="Take Notes" {...a11yProps(1)} />
                        <Tab label="View Saved Notes" {...a11yProps(2)} />
                    </Tabs>
                </div>

                <div>
                    {/* Tab Panels */}
                    <TabPanel value={value} index={0}>
                        <Gallery />
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <div style={{ marginBottom: '3rem' }}>

                            <h4 style={{ marginLeft: "11rem", marginTop: "40px", marginBottom: "10px" }}>Take Notes</h4>
                            <div class="form-outline" data-mdb-input-init style={{ border: "1px solid #ced4da", width: '105vh', height: '25vh', marginLeft: "11rem", marginBottom: "1rem" }}>
                                <textarea class="form-control" id="textAreaExample" rows="4" value={notes} onChange={handleNotesChange} placeholder='Enter notes'></textarea>
                            </div>

                            <div style={{ marginLeft: "25rem" }}>
                                <button style={{
                                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "10px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    marginTop: '0.5rem',
                                }} className="btn btn-primary"
                                    onClick={handleSaveNotes}>Save Notes</button>

                            </div>




                        </div>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        {/* View Saved Notes Component */}
                        <div style={{ marginBottom: '3rem' }}>

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
                    </TabPanel>
                </div>
            </div>

            <div style={{ bottom: "0", width: "100%", marginTop: 'auto' }}><Footer /></div>

        </div>
    )
}
