import React, { useState, useEffect } from "react";
import { Input, Modal, Table, Tooltip, Typography, message, } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import NavbarAdmin from './NavbarAdmin'
import Footer from "../Footer";

export default function UserDetails() {
    const [users, setUsers] = useState([]);
    const [editedUserId, setEditedUserId] = useState("");
    const [editedFirstName, setEditedFirstName] = useState(null);
    const [editedLastName, setEditedLastName] = useState(null);
    const [editedEmail, setEditedEmail] = useState(null);
    const [editedRole, setEditedRole] = useState(null);
    const [record, setRecord] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        // Fetch verified users when the component mounts
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
            title: "First Name",
            dataIndex: "firstName",
        },
        {
            key: 2,
            title: "Last Name",
            dataIndex: "lastName",
        },
        {
            key: 3,
            title: "Email",
            dataIndex: "email",
        },
        {
            key: 4,
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
            key: 5,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <Tooltip title="Click to edit the user">
                            <EditOutlined
                                onClick={() => onEdit(record)}
                                style={{ color: "#164863", fontSize: 20, marginRight: 25 }}
                            />
                        </Tooltip>
                        <Tooltip title="Click to delete the user">
                            <DeleteOutlined
                                onClick={() => onDelete(record)}
                                style={{ color: "red", fontSize: 20 }}
                            />
                        </Tooltip>
                    </>
                );
            },
        },
    ];

    const onDelete = (record) => {

        Modal.confirm({
            title: "Are you sure, you want to delete this user?",
            okText: "Yes",
            okType: "danger",
            onOk: async () => {
                await axios.delete(`http://localhost:5000/api/users/delete-user/${record._id}`)
                    .then((response) => {
                        if (response.data.success) {
                            message.success(response.data.message);
                            // Refresh the user list after deletion
                            setUsers(
                                users.filter((user) => user._id !== record._id)
                            );
                        } else {
                            console.log(response);
                            message.error("Failed to delete user");
                        }
                    })
                    .catch((error) => {
                        message.error("Error deleting user");
                    });
            },
        });
    };

    const onEdit = (record) => {
        setShowEditModal(true);
        setRecord(record);
        setEditedUserId(record._id);
        setEditedFirstName(record.firstName);
        setEditedLastName(record.lastName);
        setEditedEmail(record.email);
        setEditedRole(record.role);
    };

    const handleEditRecords = async () => {
        if (!editedFirstName || !editedLastName || !editedEmail || !editedRole) {
            message.error("Please fill all the fields");
            return;
        }

        const data = {
            firstName: editedFirstName,
            lastName: editedLastName,
            email: editedEmail,
            role: editedRole,
        };

        const initialData = {
            firstName: record.firstName,
            lastName: record.lastName,
            email: record.email,
            role: record.role,
        };

        const dataChanged = Object.keys(data).some(
            (key) => data[key] !== initialData[key]
        );

        if (!dataChanged) {
            message.warning("No changes made. Nothing to update.");
            setShowEditModal(false);
            return;
        }

        try {
            const url = `http://localhost:5000/api/users/edit-user/${editedUserId}`
            const response = await axios.put(url, data)

            if (response.status === 201) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === editedUserId ? { ...user, ...data } : user
                    )
                );

                message.success(response.data.message);
                setShowEditModal(false);
            }
        } catch (error) {
            message.error("Error Updating User");
        }
    };


    return (
        <>
            <NavbarAdmin />
            <Typography.Title level={2} style={{ marginTop: '2rem', marginLeft: '12px' }}>User Details</Typography.Title>
            <Table columns={columns} dataSource={users} />

            <Modal
                title="Edit User"
                open={showEditModal}
                okText="Save"
                onOk={handleEditRecords}
                onCancel={() => setShowEditModal(false)}
            >
                <Typography.Text>First Name:</Typography.Text>
                <Input
                    value={editedFirstName}
                    placeholder="Enter First Name"
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    style={{ marginBottom: 15 }}
                />

                <Typography.Text>Last Name:</Typography.Text>
                <Input
                    value={editedLastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => setEditedLastName(e.target.value)}
                    style={{ marginBottom: 15 }}
                />

                <Typography.Text>Email:</Typography.Text>
                <Input
                    value={editedEmail}
                    placeholder="Enter Email"
                    onChange={(e) => setEditedEmail(e.target.value)}
                    style={{ marginBottom: 15 }}
                />

                <Typography.Text>Role:</Typography.Text>
                <Input
                    value={editedRole}
                    placeholder="Enter Role"
                    onChange={(e) => setEditedRole(e.target.value)}
                    style={{ marginBottom: 15 }}
                />
            </Modal>

            <div style={{ position: 'fixed', bottom: '0', width: '100%' }} >
                <Footer />
            </div>
        </>
    );

}
