import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  message,
  Tooltip,
  Modal,
  Input,
  Button,
} from "antd";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Footer";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function UserComplaints() {
  const [complaint, setComplaint] = useState([]);
  const [visible, setVisible] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");
  const [complaintId, setComplaintId] = useState("");

  useEffect(() => {
    const fetchUserComplaint = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaint/fetchUser-complaints"
        );
        setComplaint(response.data);
      } catch (error) {
        message.error("No complaint found");
      }
    };

    fetchUserComplaint();
  }, [adminResponse]);

  const columns = [
    {
      key: 1,
      title: "User Name", // Merged column title
      dataIndex: "firstName", // Use "username" as the key for the merged value

      width: "20%",
    },

    {
      key: 2,
      title: "Complaint",
      dataIndex: "complaint",
      width: "45%",
    },

    {
      key: 3,
      title: "Date",
      dataIndex: "date",
      width: "20%",
    },
    {
      key: 4,
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Tooltip title="Click to respond to user">
              <ChatBubbleOutlineIcon
                onClick={() => handleOpenModal(record)}
                style={{
                  color: "#164863",
                  fontSize: 20,
                  marginRight: 25,
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </>
        );
      },
      width: "20%",
    },
  ];

  const handleOpenModal = (record) => {
    setVisible(true);
    setComplaintId(record._id);
  };

  const handleOk = async () => {
    // Handle logic when send button is clicked
    // You can perform API calls to save the response or any other logic

    if (!adminResponse) {
      message.error("Please enter response");
      return;
    }

    //write
    const url = `http://localhost:5000/api/complaint/save-response/${complaintId}`;
    const response = await axios.post(url, { adminResponse });

    setVisible(false);
    setAdminResponse("");
    message.success(response.data.message);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <NavbarAdmin />
      <Typography.Title
        level={2}
        style={{ marginTop: "2rem", marginLeft: "12px" }}
      >
        User Complaints
      </Typography.Title>
      <Table columns={columns} dataSource={complaint} />

      <Modal
        title="Respond"
        open={visible}
        onOk={handleOk} //when send button is clicked
        onCancel={handleCancel} //when cancel button is clicked
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{ backgroundColor: "#3bb19b", color: "white" }}
            onClick={handleOk}
          >
            Send
          </Button>,
        ]}
      >
        <Input.TextArea
          rows={4}
          value={adminResponse}
          onChange={(e) => setAdminResponse(e.target.value)}
          placeholder="Type your response here"
        />
      </Modal>

      <div style={{ bottom: "0", width: "100%", marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}

// username, role, date, location, prediction result
