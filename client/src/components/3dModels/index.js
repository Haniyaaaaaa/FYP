import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.css";
import NavbarFarmer from "../NavbarFarmer";
import NavbarAdmin from "../AdminPanel/NavbarAdmin";
import NavbarNormalvictim from "../NavbarNormalvictim";
import PlayButtonIcon from "@mui/icons-material/PlayCircle";
import Slider from "react-slick";
import axios from "axios";

const ThreeDModels = () => {
  const [userRole, setUserRole] = useState("");
  const [models, setModels] = useState([]);

  const url = `http://localhost:5000/api/floodmodels/get-models`;

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(url);
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModels();

    const role = localStorage.getItem("role");
    setUserRole(role);
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
          <p className="text-sm ml-5 mt-1">Flood resilient models</p>
        </div>

        {/* image slider */}
        <div className={styles.slider_container}>
          <Slider {...settings}>
            {models.map((model) => (
              <Link
                to={`/detail/${model._id}`}
                state={{
                  data: {
                    url: model.url,
                    title: model.title,
                    desc: model.desc,
                  },
                }}
                key={model.id}
                className={styles.link}
              >
                <div className="p-2 relative group hover:translate-y-[-5px] transition-transform rounded ">
                  <img
                    src={model.url}
                    className="h-36 rounded hover:cursor-pointer"
                  />
                  <p style={{ color: "black" }}>{model.title}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThreeDModels;
