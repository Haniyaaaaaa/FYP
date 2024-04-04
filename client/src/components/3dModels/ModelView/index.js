import React, { useState, useEffect } from "react";
import NavbarFarmer from "../../NavbarFarmer";
import NavbarAdmin from "../../AdminPanel/NavbarAdmin";
import NavbarNormalvictim from "../../NavbarNormalvictim";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { IconButton } from "@mui/material";
import DownloadButton from "@mui/icons-material/Download";
import Select from "react-dropdown-select";
import Interactive3DModel from "../Model/Interactive3dModel";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ModelView = () => {
  let subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userRole, setUserRole] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sqft, setSqft] = useState(0);
  const [cost, setCost] = useState(0);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/locations/get-locations"
      );
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setSqft(0);
    setIsOpen(false);
  }

  const handleCalculateCost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/modelcosts/get-cost?district=${selectedDistrict}&location=${selectedLocation}`
      );
      const cost = response.data.cost;
      const totalCost = cost * sqft;
      setCost(totalCost);
    } catch (error) {
      console.error("Error calculating cost:", error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
    fetchLocations();
  }, []);

  const location = useLocation();
  const { url, title, desc } = location.state?.data || {};

  const districtOptions = locations.map((location) => ({
    label: location.district,
    value: location.district,
  }));

  const locationOptions = selectedDistrict
    ? locations
        .find((location) => location.district === selectedDistrict)
        ?.locations.map((location) => ({
          label: location,
          value: location,
        }))
    : [];

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF();

      // Title
      pdf.text(title, 10, 10);

      // Description
      const descLines = pdf.splitTextToSize(
        desc,
        pdf.internal.pageSize.getWidth() - 20
      );
      pdf.text(descLines, 10, 30);

      // Selected district and location
      pdf.text(`District: ${selectedDistrict}`, 10, 60);
      pdf.text(`Location: ${selectedLocation}`, 10, 70);

      // Sqft and cost
      pdf.text(`Sqft: ${sqft}`, 10, 90);
      pdf.text(`Cost: ${cost} PKR`, 10, 100);

      pdf.save("modelcost.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <React.Fragment>
      {userRole === "farmer" ? (
        <NavbarFarmer />
      ) : userRole === "power admin" ? (
        <NavbarAdmin />
      ) : (
        <NavbarNormalvictim />
      )}
      <div className="p-10">
        <h2>Model Details</h2>
        <div className={styles.main_container}>
          <Interactive3DModel />
          <div className="ml-10">
            <p id="pdf-content" className={styles.title}>
              {title}
            </p>
            <p id="pdf-content" className={styles.desc}>
              {desc}
            </p>
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={openModal}
            className="btn-default overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 hover:shadow-md border border-stone-100 hover:bg-blue-600 hover:-translate-y-[3px]"
          >
            <span className="relative">Calculate cost</span>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Calculate Cost</h2>
        <form>
          <div className="flex flex-col">
            <div>District</div>
            <Select
              options={districtOptions}
              values={[]}
              onChange={(value) => setSelectedDistrict(value[0].label)}
            />
            <div>Location</div>
            <Select
              options={locationOptions}
              values={[]}
              onChange={(value) => setSelectedLocation(value[0].label)}
            />
            <div>Sqft.</div>
            <input
              id="pdf-content"
              type="number"
              value={sqft}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 99999) {
                  setSqft(value);
                } else {
                  setSqft("");
                }
              }}
            />
          </div>
          <button
            onClick={handleCalculateCost}
            className="btn-default overflow-hidden relative w-100 mt-10 bg-blue-500 text-white py-2 px-4 rounded-xl transition-all duration-100 hover:shadow-md border border-stone-100 hover:bg-blue-600 hover:-translate-y-[3px]"
          >
            <span className="relative">Calculate cost</span>
          </button>

          <p id="pdf-content">{cost} PKR</p>

          <IconButton>
            <div onClick={generatePDF}>
              Download pdf
              <DownloadButton />
            </div>
          </IconButton>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ModelView;
