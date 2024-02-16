import React, { useState, useEffect } from "react";
import { Table, Typography, message, } from "antd";
import axios from "axios";
import NavbarAdmin from './NavbarAdmin'
import Footer from "../Footer";
import { Rating } from '@mui/material';

export default function UserFeedback() {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {

        const fetchUserFeedbacks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/feedback/get-feedback");
                setFeedback(response.data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                message.error("Failed to fetch feedback");
            }
        };

        fetchUserFeedbacks();
    }, []);

    const columns = [
        {
            key: 1,
            title: "User Name", // Merged column title
            dataIndex: "username", // Use "username" as the key for the merged value
            render: (text, record) => `${record.firstName} ${record.lastName}`,
            width: '20%',
        },
        {
            key: 2,
            title: "Email",
            dataIndex: "email",
            width: '20%',
        },
        {
            key: 3,
            title: "Feedback",
            dataIndex: "feedback",
            width: '20%',
        },
        {
            key: 4,
            title: "Rating",
            dataIndex: "rating",
            render: (text, record) => (
                <Rating
                    name={`rating-${record._id}`}
                    value={record.rating}
                    readOnly
                    precision={0.5}
                />
            ),
        },
        {
            key: 5,
            title: "Date",
            dataIndex: "date",
            width: '20%',
        },

    ];

    return (
        <>
            <NavbarAdmin />
            <Typography.Title level={2} style={{ marginTop: '2rem', marginLeft: '12px' }}>User Feedbacks</Typography.Title>
            <Table columns={columns} dataSource={feedback} />



            <div style={{ position: 'fixed', bottom: '0', width: '100%' }} >
                <Footer />
            </div>
        </>
    );

}


// username, role, date, location, prediction result