import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarFarmer from "../NavbarFarmer";
import NavbarAdmin from "../AdminPanel/NavbarAdmin";
import NavbarNormalvictim from "../NavbarNormalvictim";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.css";
import PlayButtonIcon from "@mui/icons-material/PlayCircle";

import Slider from "react-slick";

const ThreeDModels = () => {
  const [userRole, setUserRole] = useState("");
  const data = [
    "/models/image1.jpg",
    "/models/image1.jpg",
    "/models/image1.jpg",
    "/models/image1.jpg",
    "/models/image1.jpg",
  ];

  const url = `http://localhost:5000/api/update-profile`;

  useEffect(() => {
    //userId is retreived from local storage
    const role = localStorage.getItem("role");
    setUserRole(role);
    console.log(userRole);
  }, []);

  var settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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

      <div className={styles.main_container}>
        <div className={styles.text_container}>
          <h2 className={styles.heading}>Models</h2>
        </div>

        {/* image slider */}
        <div className={styles.slider_container}>
          <Slider {...settings}>
            {data.map((d) => (
              <div className="p-2 hover:translate-y-[-5px] transition-transform">
                <img
                  src={d}
                  className="rounded transition-opacity hover:brightness-75"
                ></img>
              </div>
            ))}
          </Slider>
        </div>

        <div className={styles.text_container}>
          <h2 className={styles.heading}>Videos</h2>
        </div>
        {/* video slider */}
        <div className={styles.slider_container}>
          <Slider {...settings}>
            {data.map((d) => (
              <div className="p-2 relative group hover:translate-y-[-5px] transition-transform rounded hover:brightness-75">
                <img src={d} className="rounded" />

                {/* Material Icon for Play Button */}
                <div className={styles.playbutton}>
                  <PlayButtonIcon
                    style={{ color: "white", height: "40", width: "40" }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThreeDModels;
