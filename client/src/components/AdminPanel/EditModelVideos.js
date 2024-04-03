import React, { useState, useEffect } from "react";
import { Table, Typography, message, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Footer";

export default function EditModelVideos() {
  const [videos, setVideos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/videos/get-videos"
      );
      console.log("Videos:");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      message.error("Failed to fetch videos");
    }
  };

  const handleAddVideo = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSaveVideo = () => {
    form.validateFields().then(async (values) => {
      try {
        await axios.post("http://localhost:5000/api/videos/save-video", values);
        setVisible(false);
        form.resetFields();
        message.success("Video saved successfully");
      } catch (error) {
        console.error("Error saving video:", error);
        message.error("Failed to save video");
      }
    });
  };

  const columns = [
    {
      key: "videoLink",
      title: "Link",
      dataIndex: "videoLink",
      width: "20%",
    },
    {
      key: "videoDescription",
      title: "Description",
      dataIndex: "videoDescription",
      width: "20%",
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
        title="Add Video"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleSaveVideo}
      >
        <Form form={form}>
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
