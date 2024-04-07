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
  Select,
} from "antd";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Footer";

const { Option } = Select;

export default function EditSqftCost() {
  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [newDistrict, setNewDistrict] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const districtResponse = await axios.get(
        "http://localhost:5000/api/locations/get-districts"
      );
      setDistricts(districtResponse.data);

      const locationResponse = await axios.get(
        "http://localhost:5000/api/locations/get-district-location-cost"
      );
      setLocations(locationResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    }
  };

  const handleAddLocation = () => {
    setVisible(true);
    setSelectedLocation(null);
  };

  const handleEditLocation = (record) => {
    setVisible(true);
    setSelectedLocation(record);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setSelectedLocation(null);
    setNewDistrict(null);
  };

  const handleSaveLocation = () => {
    form.validateFields().then(async (values) => {
      try {
        const { location, cost } = values;
        let districtName = null;

        if (newDistrict) {
          // If user entered a new district
          await axios.post("http://localhost:5000/api/locations/add-district", {
            district: newDistrict,
            locations: [location],
          });
          districtName = newDistrict;
        } else {
          // If user selected an existing district
          districtName = selectedDistrict;
          // Add new location to the selected district

          await axios.post(
            `http://localhost:5000/api/locations/add-location/${districtName}/${location}`
          );
        }

        // Add district location with cost
        console.log(cost);
        await axios.post(
          `http://localhost:5000/api/locations/add-district-location-cost`,
          {
            districtName,
            location,
            cost,
          }
        );

        message.success("Location added successfully");
        setVisible(false);
        form.resetFields();
        fetchData();
      } catch (error) {
        console.error("Error adding location:", error);
        message.error("Failed to add location");
      }
    });
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/sqft/locations/${locationId}`
      );
      message.success("Location deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting location:", error);
      message.error("Failed to delete location");
    }
  };

  const handleDeleteDistrict = async (districtId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/sqft/districts/${districtId}`
      );
      message.success("District deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting district:", error);
      message.error("Failed to delete district");
    }
  };

  const columns = [
    {
      key: "district",
      title: "District",
      dataIndex: "district",
    },
    {
      key: "location",
      title: "Location",
      dataIndex: "location",
    },
    {
      key: "cost",
      title: "Cost",
      dataIndex: "cost",
    },
    {
      key: "edit",
      title: "Edit",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEditLocation(record)}>
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      title: "Delete",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this location?"
          onConfirm={() => handleDeleteLocation(record._id)}
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

  const filteredLocations = selectedDistrict
    ? locations.filter((location) => location.district === selectedDistrict)
    : locations;

  return (
    <div>
      <NavbarAdmin />
      <div className="ml-2">
        <Typography.Title level={2}>SQFT Costs</Typography.Title>

        <Button type="primary" onClick={handleAddLocation}>
          Add Location
        </Button>
        <Select
          showSearch
          style={{ width: 200, marginLeft: 16 }}
          placeholder="Select a district or add a new one"
          optionFilterProp="children"
          onChange={(value) => {
            if (value === "new") {
              setNewDistrict(""); // Show input for new district
              setSelectedDistrict(null); // Reset selected district
            } else {
              setNewDistrict(null); // Hide input for new district
              setSelectedDistrict(value); // Set selected district
            }
          }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {districts.map((district) => (
            <Option key={district._id} value={district.district}>
              {district.district}
            </Option>
          ))}
          <Option value="new">Add New District</Option>
        </Select>

        {newDistrict !== null && (
          <Input
            style={{ width: 200, marginLeft: 16 }}
            placeholder="Enter new district name"
            value={newDistrict}
            onChange={(e) => setNewDistrict(e.target.value)}
          />
        )}
      </div>
      <Table
        dataSource={filteredLocations}
        columns={columns}
        rowKey="_id"
        pagination={false}
        style={{ marginTop: "1rem" }}
      />

      <Modal
        title={selectedLocation ? "Edit Location" : "Add Location"}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleSaveLocation}
      >
        <Form form={form} initialValues={selectedLocation}>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter the location" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cost"
            label="Cost"
            rules={[{ required: true, message: "Please enter the cost" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Footer />
    </div>
  );
}
