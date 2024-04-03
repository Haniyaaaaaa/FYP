import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    Space,
    Modal,
    Table,
    Tooltip,
    Typography,
    message,
    Tag,
} from "antd";
import NavbarFarmer from "../NavbarFarmer";
import NavbarNormalvictim from "../NavbarNormalvictim";
import Footer from "../Footer";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

export default function PostFloodChecklist() {

    const [userRole, setUserRole] = useState(""); //for navbar
    const [checklist, setChecklist] = useState([]); //checklist array
    const [editedTaskId, setEditedTaskId] = useState("");
    const [editedTask, setEditedTask] = useState(""); //individual task to be displayed in the table
    const [record, setRecord] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskInput, setTaskInput] = useState(""); //stores task entered in the textfield
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        fetchChecklist();
    }, []);

    const fetchChecklist = async () => {
        try {
            const userToken = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            setUserRole(role);

            const url = `http://localhost:5000/api/checklistt/getChecklistt/${userToken}`;
            const response = await axios.get(url);
            console.log(response.data);
            setChecklist(response.data);
        } catch (error) {
            console.error("Error fetching checklist:", error);
            message.error("Failed to fetch checklist");
        }
    };

    const handleInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();

        try {
            const userToken = localStorage.getItem("token");

            console.log("task is:" + taskInput);
            console.log("userId: " + userToken);

            const url = `http://localhost:5000/api/checklistt/addTaskk`;

            const response = await axios.post(url, {
                task: taskInput,
                userId: userToken,
            });

            // Handle success
            console.log("Task added:", response.data);

            // Update the checklist state by fetching the updated checklist again
            fetchChecklist();

            setTaskInput("");
        } catch (error) {
            // Handle error
            console.error("Error adding task:", error);
        }
    };

    const columns = [
        {
            key: 1,
            title: "Tasks",
            render: (_, record) => {
                return record.task;
            },
            width: "35%",
        },
        {
            key: 2,
            title: "Completed",
            render: (_, record) => (
                <Tag color={record.status ? "green" : "red"} style={{ fontSize: 14 }}>
                    {record.status ? "Yes" : "No"}
                </Tag>
            ),
            width: "35%",
        },

        {
            key: 3,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <Tooltip title="Click to edit the task">
                            <EditOutlined
                                onClick={() => onEdit(record)}
                                style={{
                                    color: "#164863",
                                    fontSize: 20,
                                    marginRight: 25,
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Click to delete the task">
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

    const onEdit = (record) => {
        setShowEditModal(true);
        setRecord(record);
        setEditedTaskId(record.id);
        setEditedTask(record.task);
        console.log(record.id);
    };

    const handleEditRecords = async () => {
        if (!editedTask) {
            message.error("Please enter the task");
            return;
        }

        const data = {
            task: editedTask,
        };

        const initialData = {
            task: record.task,
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
            const userToken = localStorage.getItem("token");
            const url = `http://localhost:5000/api/checklistt/updateTaskk/${editedTaskId}`;

            const response = await axios.put(url, {
                task: editedTask,
                userId: userToken,
            });

            if (response.status === 200) {
                const updatedChecklist = checklist.map((item) => {
                    if (item.id === editedTaskId) {
                        return {
                            ...item,
                            task: editedTask,
                        };
                    }
                    return item;
                });
                setChecklist(updatedChecklist);
                message.success("Task updated successfully");
                setShowEditModal(false);
            }
        } catch (error) {
            console.error("Error updating task:", error);
            message.error("Failed to update task");
        }
    };

    const onDelete = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this task?",
            okText: "Yes",
            okType: "danger",
            onOk: async () => {
                try {
                    const userToken = localStorage.getItem("token");
                    const url = `http://localhost:5000/api/checklistt/deleteTaskk/${record.id}`;

                    const response = await axios.delete(url, {
                        data: { userId: userToken },
                    });

                    if (response.status === 200) {
                        message.success("Task deleted successfully");
                        // Refresh the checklist after deletion
                        setChecklist(checklist.filter((task) => task.id !== record.id));
                    } else {
                        console.log(response);
                        message.error("Failed to delete task");
                    }
                } catch (error) {
                    console.error("Error deleting task:", error);
                    message.error("Error deleting task");
                }
            },
        });
    };

    const handleStatusChange = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning("Please select tasks to update status.");
            return;
        }

        try {
            const userToken = localStorage.getItem("token");
            const url = `http://localhost:5000/api/checklistt/updateStatuss`;

            const response = await axios.put(url, {
                taskIds: selectedRowKeys,
                status: true,
                userId: userToken,
            });

            if (response.status === 200) {
                message.success("Selected tasks status updated successfully");
                // Refresh the checklist after status update
                fetchChecklist();
                setSelectedRowKeys([]);
            }
        } catch (error) {
            console.error("Error updating tasks status:", error);
            message.error("Failed to update tasks status");
        }
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {userRole === "farmer" ? <NavbarFarmer /> : <NavbarNormalvictim />}
            <div
                style={{
                    background: "linear-gradient(to right, #000000, #333333)",
                    color: "white",
                    padding: "75px 88px",
                    height: "40vh",
                }}
            >
                <h1
                    style={{
                        color: "rgba(59, 177, 155, 1)",
                        marginLeft: "30px",
                        marginTop: "10px",
                        fontSize: "55px",
                    }}
                >
                    Post - Flood Recovery Checklist
                </h1>
                <div
                    style={{
                        marginLeft: "30px",
                        marginTop: "20px",
                    }}
                >
                    <p
                        style={{
                            fontSize: "20px",
                        }}
                    >
                        Prepare for floods with our Post - Flood Checklist Interface.Stay
                        ahead of potential risks, secure your assets, and ensure safety with
                        proactive measures.Let 's tackle challenges together for a safer
                        future.
                    </p>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "2rem",
                }}
            >
                <Space.Compact
                    style={{
                        width: "20%",
                        marginBottom: "2rem",
                    }}
                >
                    <Input
                        placeholder="Enter task"
                        style={{
                            height: "40px",
                        }}
                        value={taskInput}
                        onChange={handleInputChange}
                    />

                    <Button
                        style={{
                            backgroundColor: "#3bb19b",
                            color: "white",
                            height: "40px",
                            fontSize: "16px",
                        }}
                        onClick={handleAddTask}
                    >
                        ADD
                    </Button>
                </Space.Compact>

                {/* Button to update task status */}
                <Button style={{
                    backgroundColor: "#3bb19b",
                    color: "white",
                    height: "40px",
                    fontSize: "16px",
                    marginBottom: '1rem'
                }}
                    onClick={handleStatusChange}>
                    Update Selected Tasks Status
                </Button>

                {/* table for checklist */}

                <div
                    style={{
                        width: "70%",
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={checklist}
                        pagination={{ pageSize: 7 }}
                        rowKey="id"
                        rowSelection={{
                            type: "checkbox",
                            selectedRowKeys,
                            onChange: onSelectChange,
                            getCheckboxProps: (record) => ({
                                disabled: record.status === true,
                            }),
                        }}
                    />
                </div>

                <Modal
                    title="Edit Task"
                    open={showEditModal}
                    okText="Save"
                    onOk={handleEditRecords}
                    onCancel={() => setShowEditModal(false)}
                    okButtonProps={{
                        style: { backgroundColor: "#3bb19b", color: "white" },
                    }}
                >
                    <Typography.Text>Task:</Typography.Text>
                    <Input
                        value={editedTask}
                        placeholder="Enter Task"
                        onChange={(e) => setEditedTask(e.target.value)}
                        style={{ marginBottom: 15 }}
                    />
                </Modal>
            </div>
            <div
                style={{
                    bottom: "0",
                    width: "100%",
                    marginTop: "auto",
                }}
            >
                <Footer />
            </div>
        </div>
    )
}
