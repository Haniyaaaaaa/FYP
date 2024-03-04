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

const ThreeDModels = () => {
  const [userRole, setUserRole] = useState("");
  const data = [
    {
      id: 1,
      url: "/models/image1.jpg",
      title: "Model 1",
      desc: "Some description is required  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
    },
    {
      id: 2,
      url: "/models/image1.jpg",
      title: "Model 2",
      desc: "Some description is required  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
    },
    {
      id: 3,
      url: "/models/image1.jpg",
      title: "Model 3",
      desc: "Some description is required  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
    },
    {
      id: 4,
      url: "/models/image1.jpg",
      title: "Model 4",
      desc: "Some description is required  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
    },
    {
      id: 5,
      url: "/models/image1.jpg",
      title: "Model 5",
      desc: "Some description is required  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
    },
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
              <Link
                to={`/detail/${d.id}`}
                state={{ data: { url: d.url, title: d.title, desc: d.desc } }}
                key={d.id}
                className={styles.link}
              >
                <div className="p-2 relative group hover:translate-y-[-5px] transition-transform rounded ">
                  <img
                    src={d.url}
                    className="h-36 rounded hover:cursor-pointer"
                  />
                  <p style={{ color: "black" }}>{d.title}</p>
                </div>
              </Link>
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
              <div className="p-2 relative group hover:translate-y-[-5px] transition-transform rounded ">
                <img src={d.url} className="h-36 rounded" />

                {/* Material Icon for Play Button */}
                <div className={styles.playbutton}>
                  <PlayButtonIcon className={styles.button} />
                  <div className={`rounded-bottom ${styles.title_container}`}>
                    <p className={styles.title}>{d.title}</p>
                  </div>
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
