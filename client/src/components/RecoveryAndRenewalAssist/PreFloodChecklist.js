import React, { useState, useEffect } from 'react'
import { Button, Input, Space, Modal, Table, Tooltip, Typography, message, } from 'antd';
import NavbarFarmer from '../NavbarFarmer';
import NavbarNormalvictim from '../NavbarNormalvictim';
import Footer from '../Footer';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

export default function PreFloodChecklist() {

    const [userRole, setUserRole] = useState(''); //for navbar
    const [checklist, setChecklist] = useState([]);     //checklist array
    const [editedTaskId, setEditedTaskId] = useState("");
    const [editedTask, setEditedTask] = useState("");    //individual task to be displayed in the table
    const [record, setRecord] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [taskInput, setTaskInput] = useState(''); //stores task entered in the textfield 

    useEffect(() => {
        // Fetch verified users when the component mounts
        const fetchChecklist = async () => {
            try {
                const userToken = localStorage.getItem('token');
                const role = localStorage.getItem('role');
                setUserRole(role);

                const url = `http://localhost:5000/api/checklist/getChecklist/${userToken}`
                const response = await axios.get(url);
                // console.log(response.data)
                setChecklist(['save food at home for future use in bulk', 'a', 'b', 'c']);
                console.log(checklist)
                // setChecklist(response.data);

            } catch (error) {
                console.error("Error fetching checklist:", error);
                message.error("Failed to fetch checklist");
            }
        };

        fetchChecklist();
    }, []);

    const handleInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();

        try {
            const userToken = localStorage.getItem('token');

            console.log('task is:' + taskInput)
            console.log('userId: ' + userToken)

            const url = `http://localhost:5000/api/checklist/addTask`;

            const response = await axios.post(url, { task: taskInput, userId: userToken });

            // Handle success
            console.log('Task added:', response.data);

            setTaskInput('');

        } catch (error) {
            // Handle error
            console.error('Error adding task:', error);
        }
    };


    const columns = [
        {
            key: 1,
            title: "Tasks",
            dataIndex: "task", //keep this name in db
            width: '70%',
        },
        {
            key: 2,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <Tooltip title="Click to edit the task">
                            <EditOutlined
                                onClick={() => onEdit(record)}
                                style={{ color: "#164863", fontSize: 20, marginRight: 25 }}
                            />
                        </Tooltip>
                        {/* <Tooltip title="Click to delete the task">
                            <DeleteOutlined
                                onClick={() => onDelete(record)}
                                style={{ color: "red", fontSize: 20 }}
                            />
                        </Tooltip> */}
                    </>
                );
            },
        },
    ];

    const onEdit = (record) => {
        setShowEditModal(true);
        setRecord(record);
        setEditedTaskId(record._id);
        setEditedTask(record.task);
    };

    // const handleEditRecords = async () => {
    //     if (!editedTask) {
    //         message.error("Please enter the task");
    //         return;
    //     }

    //     const data = {
    //         task: editedTask,
    //         // tasks is the name of the column on table
    //         //editedTask is the edited task that will be set equal to the tasks after editing
    //     };

    //     const initialData = {
    //         task: record.task,
    //     };

    //     const dataChanged = Object.keys(data).some(
    //         (key) => data[key] !== initialData[key]
    //     );

    //     if (!dataChanged) {
    //         message.warning("No changes made. Nothing to update.");
    //         setShowEditModal(false);
    //         return;
    //     }

    //     try {
    //         const url = `http://localhost:5000/api/users/edit-user/${editedUserId}`
    //         const response = await axios.put(url, data)

    //         if (response.status === 201) {
    //             setUsers((prevUsers) =>
    //                 prevUsers.map((user) =>
    //                     user._id === editedUserId ? { ...user, ...data } : user
    //                 )
    //             );

    //             message.success(response.data.message);
    //             setShowEditModal(false);
    //         }
    //     } catch (error) {
    //         message.error("Error Updating User");
    //     }
    // };

    // const onDelete = (record) => {

    //     Modal.confirm({
    //         title: "Are you sure, you want to delete this task?",
    //         okText: "Yes",
    //         okType: "danger",
    //         onOk: async () => {
    //             await axios.delete(`http://localhost:5000/api/users/delete-user/${record._id}`)
    //                 .then((response) => {
    //                     if (response.data.success) {
    //                         message.success(response.data.message);
    //                         // Refresh the checklist after deletion
    //                         setChecklist(
    //                             checklist.filter((task) => task._id !== record._id)
    //                         );
    //                     } else {
    //                         console.log(response);
    //                         message.error("Failed to delete task");
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     message.error("Error deleting task");
    //                 });
    //         },
    //     });
    // };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {userRole === 'farmer' ? <NavbarFarmer /> : <NavbarNormalvictim />}

            <div style={{
                background: 'linear-gradient(to right, #000000, #333333)',
                color: 'white',
                padding: '75px 88px',
                height: '40vh',
            }}>
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>Pre-Flood Recovery Checklist</h1>
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        Prepare for floods with our Pre-Flood Checklist Interface. Stay ahead of potential risks, secure your assets, and ensure safety with proactive measures. Let's tackle challenges together for a safer future.
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>

                <Space.Compact
                    style={{
                        width: '20%',
                        marginBottom: '2rem',
                    }}
                >
                    <Input placeholder='Enter task'
                        style={{ height: '40px' }}
                        value={taskInput}
                        onChange={handleInputChange} />

                    <Button style={{
                        backgroundColor: "#3bb19b", color: "white", height: '40px', fontSize: "16px"
                    }}
                        onClick={handleAddTask}
                    >ADD</Button>

                </Space.Compact>

                {/* table for checklist */}

                <div style={{ width: '70%' }}>
                    <Table columns={columns} dataSource={checklist} />
                </div>

                {/* <Modaswl
                title="Edit Task"
                open={showEditModal}
                okText="Save"
                onOk={handleEditRecords}
                onCancel={() => setShowEditModal(false)}
                okButtonProps={{ style: { backgroundColor: '#3bb19b', color: 'white' } }}
            >
                <Typography.Text>Task:</Typography.Text>
                <Input
                    value={editedTask}
                    placeholder="Enter Task"
                    onChange={(e) => setEditedTask(e.target.value)}
                    style={{ marginBottom: 15 }}
                />



            </Modaswl> */}


            </div>
            <div style={{ bottom: "0", width: "100%", marginTop: 'auto' }}><Footer /></div>

        </div>
    )
}
