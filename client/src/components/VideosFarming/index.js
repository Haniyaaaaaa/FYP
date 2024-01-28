import React from 'react'
import Gallery from './Gallery'
import NavbarFarmer from '../NavbarFarmer'
import Footer from '../Footer'

export default function index() {
    return (
        <div>
            <NavbarFarmer />
            {/* black div */}
        <div
          style={{

            background: 'linear-gradient(to right, #000000, #333333)',
            color: 'white',
            padding: '75px 88px',
            height: '40vh',
          }}
        >
          {/* Heading */}
          <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>FARMING VIDEOS</h1>

          {/* Description */}
          <div style={{ marginLeft: '30px', marginTop: '20px' }}>
            <p style={{ fontSize: '20px' }}>
            Farming Videos: Cultivate Your Knowledge. Explore expert insights, tips, and techniques 
            </p>
            <p style={{ fontSize: '20px', lineHeight: '0' }}>
            in our collection for a thriving agricultural journey.</p>
          </div>

        </div>
            <Gallery />
            <Footer/>
        </div>
    )
}
