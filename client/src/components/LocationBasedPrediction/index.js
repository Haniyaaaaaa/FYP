import React, { useState } from 'react'
import NavbarFarmer from '../NavbarFarmer'
import Header from '../Header'
import styles from "./styles.module.css";
import Footer from '../Footer';
import MyAutocomplete from './MyAutocomplete';
import { Button } from '@mui/material';
import axios from "axios";


export default function Index() {

  const [showRec, setShowRec] = useState(false);
  const [crop, setCrop] = useState('')
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    if (selectedCity == null) {
      return;
    }
    setShowRec(true);

    try {
      const url = `http://localhost:5000/api/crop-recommendation/location`;

      console.log("selected city: " + selectedCity);

      //request sent to server
      const { data } = await axios.post(url, { selectedCity });

      setCrop(data.crop);
      console.log("crop: " + data.crop);


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavbarFarmer />
      <Header heading={"Location Based Crop Recommendation"} description1={"Welcome to our Location Based Crop Recommendation system! Enter your location, and we'll provide"} description2={"personalized recommendations for the best crops suited to your area."} />

      <div className={styles.parameters}>
        <MyAutocomplete onSelectCity={handleCitySelect} />
      </div>

      <div className={styles.btn}>
        <Button style={{
          backgroundColor: "#3bb19b", color: "white", marginLeft: "30px", border: "none", "outline": "none", padding: "10px 15px", borderRadius: "25px", width: "14rem", height: '4rem',
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          alignItems: 'center',
          marginTop: '1rem'
        }}
          sx={{ mb: 4 }}
          type="Button"
          onClick={handleOnClick}
        >Get Recommendation</Button>
      </div>

      {showRec && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <p className={styles.rec} style={{ color: "white" }}><span style={{ color: "aqua" }}>{crop}</span></p>



      </div>}
      <div style={{ position: "absolute", bottom: "0", width: "100%" }}><Footer /></div>

    </div>
  )
}
