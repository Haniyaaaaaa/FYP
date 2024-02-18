import React, { useState, useEffect } from "react";
import NavbarFarmer from "../../NavbarFarmer";
import NavbarAdmin from "../../AdminPanel/NavbarAdmin";
import NavbarNormalvictim from "../../NavbarNormalvictim";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";

const ModelView = () => {
  const [userRole, setUserRole] = useState("");

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
          <img src={url} className="h-60 rounded" />
          <div className="ml-10">
            <p className={styles.title}>{title}</p>
            <p className={styles.desc}>{desc}</p>
            {/* Other details */}
          </div>
        </div>
        <div className="mt-10">
          <button class="btn-default overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 hover:shadow-md border border-stone-100 hover:bg-blue-600 hover:-translate-y-[3px]">
            <span class="relative">Calculate cost</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModelView;
