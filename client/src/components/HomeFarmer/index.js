// HomeFarmer.js
import React from 'react';
import NavbarFarmer from '../NavbarFarmer';
import styles from './styles.module.css';
import homepage from '../../images/homepage.jpg';
import styled from 'styled-components';
import Footer from '../Footer';

const StyledComponent = styled.div`
  overflow: hidden;
`;

const HomeFarmer = () => {
  return (
    <StyledComponent>
      <div className={styles.home_farmer_container}>
        <NavbarFarmer />

        {/* <video className={styles.background_video} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video> */}

        <img src={homepage} alt='homepage' style={{ opacity: "0.9", filter: "brightness(55%)" }}></img>

        <div className={styles.heading}>
          <h1 className={styles.welcome_text}>WELCOME TO FLOODSAFE HUB</h1>
          <p className={styles.tagline}>Empowering Communities, Ensuring Resilience: Your Gateway to FloodSafe Futures</p>
        </div>
      
      </div>
      <div style={{position:"absolute",bottom:"0",width:"100%"}}><Footer /></div>

    </StyledComponent>
  );
};

export default HomeFarmer;
