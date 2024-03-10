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

  const options = [
    {
      value: 1,
      label: "Sydney",
    },
    {
      value: 2,
      label: "Melbourne",
    },
    {
      value: 3,
      label: "AB",
    },
    {
      value: 4,
      label: "C",
    },
    {
      value: 5,
      label: "D",
    },
  ];
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userRole, setUserRole] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    //userId is retreived from local storage
    const role = localStorage.getItem("role");
    setUserRole(role);
    console.log(userRole);
  }, []);

  const location = useLocation();
  const { url, title, desc } = location.state?.data || {};

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
            <p className={styles.title}>{title}</p>
            <p className={styles.desc}>{desc}</p>
            {/* Other details */}
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={openModal}
            class="btn-default overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 hover:shadow-md border border-stone-100 hover:bg-blue-600 hover:-translate-y-[3px]"
          >
            <span class="relative">Calculate cost</span>
          </button>
        </div>
        {/* calculate cost modal */}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Calculate Cost</h2>
        <form>
          <div class="flex flex-col">
            <div>Location</div>
            <Select
              options={options}
              values={[]}
              onChange={(value) => console.log(value)}
            />
            <div>Sqft.</div>
            <Select
              options={options}
              values={[]}
              onChange={(value) => console.log(value)}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("clicked");
            }}
            class="btn-default overflow-hidden relative w-50 bg-blue-500 text-white py-2 px-4 rounded-xl transition-all duration-100 hover:shadow-md border border-stone-100 hover:bg-blue-600 hover:-translate-y-[3px]"
          >
            <span class="relative">Calculate cost</span>
          </button>
          <IconButton>
            <div>
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
