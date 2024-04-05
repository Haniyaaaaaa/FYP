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

export default function Edit3dModel() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedModel, setSelectedModel] = useState(null);
  const [floodModels, setFloodModels] = useState([]);

  useEffect(() => {
    fetchEdit3dModels();
  }, []);

  const fetchEdit3dModels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/floodmodels/get-models"
      );
      setFloodModels(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      message.error("Failed to fetch feedback");
    }
  };

  const handleAddModel = () => {
    setVisible(true);
    setSelectedModel(null);
  };

  const handleEditModel = (record) => {
    setVisible(true);
    setSelectedModel(record);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setSelectedModel(null);
  };

  const handleSaveModel = () => {
    form.validateFields().then(async (values) => {
      try {
        if (selectedModel) {
          await axios.put(
            `http://localhost:5000/api/floodmodels/${selectedModel._id}/update`,
            values
          );
          message.success("Model details updated successfully");
        } else {
          await axios.post(
            "http://localhost:5000/api/floodmodels/save-model",
            values
          );
          message.success("Model details saved successfully");
        }
        setVisible(false);
        form.resetFields();
        fetchEdit3dModels();
      } catch (error) {
        console.error("Error saving/updating model:", error);
        message.error("Failed to save/update model");
      }
    });
  };

  const handleDeleteModel = async (record) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/floodmodels/${record._id}/delete`
      );
      message.success("Model details deleted successfully");
      fetchEdit3dModels();
    } catch (error) {
      console.error("Error deleting model details:", error);
      message.error("Failed to delete model details");
    }
  };

  const columns = [
    {
      key: "url",
      title: "Image url",
      dataIndex: "url",
      width: "40%",
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      width: "40%",
    },
    {
      key: "desc",
      title: "Description",
      dataIndex: "desc",
      width: "20%",
    },
    {
      key: "edit",
      title: "Edit",
      width: "10%",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEditModel(record)}>
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
          title="Are you sure you want to delete this model?"
          onConfirm={() => {
            handleDeleteModel(record);
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
        Models
      </Typography.Title>

      <Button type="primary" onClick={handleAddModel}>
        Add Model
      </Button>

      <Table
        dataSource={floodModels}
        columns={columns}
        rowKey="_id"
        pagination={false}
        style={{ marginTop: "1rem" }}
      />

      <Modal
        title={selectedModel ? "Edit Model" : "Add Model"}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleSaveModel}
      >
        <Form form={form} initialValues={selectedModel}>
          <Form.Item
            name="url"
            label="URL"
            rules={[
              { required: true, message: "Please enter the model img url" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please enter the model title" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Model Description"
            rules={[
              { required: true, message: "Please enter the model description" },
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
