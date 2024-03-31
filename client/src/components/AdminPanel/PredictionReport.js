import React, { useState, useEffect } from "react";
import { Table, Typography, message, } from "antd";
import axios from "axios";
import NavbarAdmin from './NavbarAdmin'
import Footer from "../Footer";

export default function UserDetails() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch prediction results from db when the component mounts
        //make endpoint for this
        const fetchVerifiedUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/get-users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching verified users:", error);
                message.error("Failed to fetch verified users");
            }
        };

        fetchVerifiedUsers();
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
            title: "Role",
            dataIndex: "role",
            filters: [
                {
                    text: 'farmer',
                    value: 'farmer',
                },
                {
                    text: 'normal victim',
                    value: 'normal victim',
                },
            ],
            onFilter: (value, record) => record.role.startsWith(value),
            width: '20%',
        },
        {
            key: 3,
            title: "Date",
            dataIndex: "date",
            width: '20%',
        },
        {
            key: 4,
            title: "Location",
            dataIndex: "location",
        },
        {
            key: 5,
            title: "Prediction Result",
            dataIndex: "predictionResult",
            filters: [
                {
                    text: 'Yes',
                    value: 'Yes',
                },
                {
                    text: 'No',
                    value: 'No',
                },
            ],
            onFilter: (value, record) => record.predictionResult.startsWith(value),
            width: '20%',
        },

    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <NavbarAdmin />
            <Typography.Title level={2} style={{ marginTop: '2rem', marginLeft: '12px' }}>Prediction Report</Typography.Title>
            <Table columns={columns} dataSource={users} />

            <div style={{ bottom: "0", width: "100%", marginTop: 'auto' }}><Footer /></div>

        </div>
    );

}


// username, role, date, location, prediction result