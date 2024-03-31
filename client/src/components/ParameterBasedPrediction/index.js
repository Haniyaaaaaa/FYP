import axios from 'axios';
import React, { useState } from 'react'
import NavbarFarmer from '../NavbarFarmer'
import Header from '../Header'
import { TextField } from '@mui/material';
import styles from "./styles.module.css";
import Footer from '../Footer';
import { message } from "antd";

export default function Index() {

  const [nitrogen, setNitrogen] = useState(0)
  const [phosphorus, setPhosphorus] = useState(0)
  const [potassium, setPotassium] = useState(0)
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [ph, setPh] = useState(0)
  const [rainfall, setRainfall] = useState(0)
  // eslint-disable-next-line
  const [crop, setCrop] = useState('')
  const [showRec, setShowRec] = useState(false);

  //validation checks for input parameters

  const validateParameters = () => {
    if (nitrogen < 0 || nitrogen > 145) {
      message.warning("Nitrogen value must be between 0 and 145.");
      return false;
    }
    if (phosphorus < 0 || phosphorus > 150) {
      message.warning("Phosphorus value must be between 0 and 150.");
      return false;
    }
    if (potassium < 0 || potassium > 210) {
      message.warning("Potassium value must be between 0 and 210.");
      return false;
    }
    if (humidity < 0 || humidity > 100) {
      message.warning("Humidity must be between 0% and 100%.");
      return false;
    }
    if (temperature < 0 || temperature > 48) {
      message.warning("Temperature must be between 0°C and 48°C.");
      return false;
    }
    if (rainfall < 0 || rainfall > 303) {
      message.warning("Rainfall must be between 0mm and 303mm.");
      return false;
    }
    if (ph < 0 || ph > 14) {
      message.warning("pH value must be between 0 and 14.");
      return false;
    }
    return true;
  };







  // const handleFormSubmission = async (event) => {
  //   event.preventDefault();

  //   


  //   try {
  //     const response = await axios.post('http://127.0.0.1:5000/parameter', { 'nitrogen': nitrogen, 'phosphorus': phosphorus, 'potassium': potassium, 'temperature': temperature, 'humidity': humidity, 'ph': ph, 'rainfall': rainfall });

  //     const responseData = response.data;
  //     console.log(responseData);
  //     setCrop(responseData.prediction);
  //     setShowRec(true);
  //   } catch (error) {
  //     console.error("Error during prediction: ", error.message);
  //   }


  // }
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    if (!validateParameters()) {
      return; // Stop the form submission if validation fails
    }

    const response = await axios.post('http://127.0.0.1:5000/parameter', { 'nitrogen': nitrogen, 'phosphorus': phosphorus, 'potassium': potassium, 'temperature': temperature, 'humidity': humidity, 'ph': ph, 'rainfall': rainfall });
    console.log(response.data);
    setCrop(response.data);
    setShowRec(true);
  };





  return (
    <div>
      <NavbarFarmer />
      <Header heading={"Parameter Based Crop Recommendation"} description1={"Welcome to our crop recommendation system! Use the parameters provided to get personalized"} description2={"recommendations for crops that align with your specific needs and conditions."} />

      <div style={{ flex: '1' }}>

        <div className={styles.parameters}>

          <form onSubmit={handleFormSubmission}>

            <div className={styles.fieldPair}>
              <TextField
                type="text"
                variant='filled'
                color='secondary'
                label="Enter Nitrogen"
                onChange={(e) => {
                  // Use a regular expression to allow only integers or decimal values
                  const value = e.target.value;
                  const isValidInput = /^\d*\.?\d*$/.test(value);
                  if (isValidInput) {
                    setNitrogen(value);
                  }
                }}
                value={nitrogen}
                style={{ width: '400px' }}
                sx={{ mb: 4 }}
                required
              />
              <TextField
                type="text"
                variant='filled'
                color='secondary'
                label="Enter Phosphorus"
                onChange={(e) => {
                  // Use a regular expression to allow only integers or decimal values
                  const value = e.target.value;
                  const isValidInput = /^\d*\.?\d*$/.test(value);
                  if (isValidInput) {
                    setPhosphorus(value);
                  }
                }}
                value={phosphorus}
                style={{ width: '400px' }}
                sx={{ mb: 4 }}
                required
              />

              <TextField
                type="text"
                variant='filled'
                color='secondary'
                label="Enter Potassium"
                onChange={(e) => {
                  // Use a regular expression to allow only integers or decimal values
                  const value = e.target.value;
                  const isValidInput = /^\d*\.?\d*$/.test(value);
                  if (isValidInput) {
                    setPotassium(value);
                  }
                }}
                value={potassium}
                style={{ width: '400px' }}
                sx={{ mb: 4 }}
                required
              />
            </div>

            <div className={styles.fieldPair}>

              <TextField
                type="text"
                variant='filled'
                color='secondary'
                label="Enter Temperature in C"
                onChange={(e) => {
                  // Use a regular expression to allow only integers or decimal values
                  const value = e.target.value;
                  const isValidInput = /^\d*\.?\d*$/.test(value);
                  if (isValidInput) {
                    setTemperature(value);
                  }
                }}
                value={temperature}
                style={{ width: '400px' }}
                sx={{ mb: 4 }}
                required
              />

              <TextField
                type="text"
                variant='filled'
                color='secondary'
                label="Enter pH value"
                onChange={(e) => {
                  // Use a regular expression to allow only integers or decimal values
                  const value = e.target.value;
                  const isValidInput = /^\d*\.?\d*$/.test(value);
                  if (isValidInput) {
                    setPh(value);
                  }
                }}
                value={ph}
                style={{ width: '400px' }}
                sx={{ mb: 4 }}
                required
              />
              <TextField
                type="text"
                variant='filled'
                color='secondary'
                label="Enter Rainfall in mm"
                onChange={(e) => {
                  // Use a regular expression to allow only integers or decimal values
                  const value = e.target.value;
                  const isValidInput = /^\d*\.?\d*$/.test(value);
                  if (isValidInput) {
                    setRainfall(value);
                  }
                }}
                value={rainfall}
                style={{ width: '400px' }}
                sx={{ mb: 4 }}
                required
              />
            </div>
            <TextField
              type="text"
              variant='filled'
              color='secondary'
              label="Enter humidity in %"
              onChange={(e) => {
                // Use a regular expression to allow only integers or decimal values
                const value = e.target.value;
                const isValidInput = /^\d*\.?\d*$/.test(value);
                if (isValidInput) {
                  setHumidity(value);
                }
              }}
              value={humidity}
              style={{ width: '400px' }}
              sx={{ mb: 4 }}
              required
            />
            <div className={styles.btn}>

              <button style={{
                backgroundColor: "#3bb19b", color: "white", marginLeft: "30px", border: "none", "outline": "none", padding: "10px 15px", borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
                alignItems: 'center',
                marginTop: '1rem',
                marginBottom: '2rem'
              }}
                className="btn btn-primary"
                type="submit"
              >Get Recommendation</button>

            </div>

          </form>
        </div>

        {showRec && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '30px' }}>
          <p style={{ backgroundColor: 'black', color: 'white', width: '25rem', padding: '1rem', textAlign: 'center', fontSize: '20px', borderRadius: '7px' }}>Recommended Crop is:
            <span className={styles.crop_d}>{crop}</span></p>
        </div>}
      </div>

      <Footer />

    </div>
  )
}


