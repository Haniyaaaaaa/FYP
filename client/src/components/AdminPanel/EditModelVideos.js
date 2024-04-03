import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  message,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
} from "antd";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Footer";

export default function EditModelVideos() {
  const [videos, setVideos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedVideo, setSelectedVideo] = useState(null); // New state to hold selected video for editing

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/videos/get-videos"
      );
      console.log("Videos:", response.data);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      message.error("Failed to fetch videos");
    }
  };

  const handleAddVideo = () => {
    setVisible(true);
    setSelectedVideo(null); // Clear selected video when adding new
  };

  const handleEditVideo = (record) => {
    setVisible(true);
    setSelectedVideo(record); // Set selected video for editing
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setSelectedVideo(null); // Clear selected video
  };

  const handleSaveVideo = () => {
    form.validateFields().then(async (values) => {
      try {
        if (selectedVideo) {
          // If selected video exists, update it
          await axios.put(
            `http://localhost:5000/api/videos/${selectedVideo._id}/update`,
            values
          );
          message.success("Video updated successfully");
        } else {
          // Otherwise, add a new video
          await axios.post(
            "http://localhost:5000/api/videos/save-video",
            values
          );
          message.success("Video saved successfully");
        }
        setVisible(false);
        form.resetFields();
        fetchVideos();
      } catch (error) {
        console.error("Error saving/updating video:", error);
        message.error("Failed to save/update video");
      }
    });
  };

  const handleDeleteVideo = async (record) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/videos/${record._id}/delete`
      );
      message.success("Video deleted successfully");
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      message.error("Failed to delete video");
    }
  };

  const columns = [
    {
      key: "videoLink",
      title: "Link",
      dataIndex: "videoLink",
      width: "40%",
    },
    {
      key: "videoDescription",
      title: "Description",
      dataIndex: "videoDescription",
      width: "40%",
    },
    {
      key: "date",
      title: "Date Added",
      dataIndex: "date",
      width: "20%",
    },
    {
      key: "edit",
      title: "Edit",
      width: "10%",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEditVideo(record)}>
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      title: "Delete",
      width: "10%",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this video?"
          onConfirm={() => {
            handleDeleteVideo(record);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

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
        Model Videos
      </Typography.Title>

      <Button type="primary" onClick={handleAddVideo}>
        Add Video
      </Button>

      <Table
        dataSource={videos}
        columns={columns}
        rowKey="_id"
        pagination={false}
        style={{ marginTop: "1rem" }}
      />

      <Modal
        title={selectedVideo ? "Edit Video" : "Add Video"}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleSaveVideo}
      >
        <Form form={form} initialValues={selectedVideo}>
          <Form.Item
            name="videoLink"
            label="Video Link"
            rules={[{ required: true, message: "Please enter the video link" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="videoTitle"
            label="Video Title"
            rules={[
              { required: true, message: "Please enter the video title" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="videoDescription"
            label="Video Description"
            rules={[
              { required: true, message: "Please enter the video description" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ bottom: "0", width: "100%", marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}
