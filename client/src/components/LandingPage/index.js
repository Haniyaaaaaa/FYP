import React from 'react';
import video from '../../videos/landingPage.mp4';
import styles from "./styles.module.css";

const LandingPage = () => {
    return (
        <div className={styles.landing_page}>
            
            <h1 className={styles.heading}>FLOODSAFE HUB</h1>

            <video className={styles.background_video} autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            <div className={styles.land_btn}>
           
                <div className="vstack gap-4 mx-auto">
                <a
                    className="btn btn-outline-light btn-lg"
                    href="/login"
                    role="button"
                    style={{ fontWeight: "bold",width: '350px',fontSize:"30px",borderWidth: "2px"  }}
                >
                    Sign in
                </a>
                <a
                    className="btn btn-outline-light btn-lg"
                    href="/signup"
                    role="button"
                    style={{ fontWeight: "bold",width: '350px',fontSize:"30px",borderWidth: "2px"  }}
                >
                    Sign up
                </a>
                </div>

            </div>

        </div>
    );
};

export default LandingPage;
