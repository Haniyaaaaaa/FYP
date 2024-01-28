import React from 'react'
import Gallery from './Gallery'
import NavbarNormalvictim from '../NavbarNormalvictim'
import Footer from '../Footer'

export default function index() {
    return (
        <div>
            <NavbarNormalvictim />
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
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>DOCUMENTRIES ON FLOOD HISTORY</h1>

                {/* Description */}
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        Dive into the historical narratives of devastating floods with our curated collection of documentaries.
                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '0' }}>
                        Witness the impact, consequences, and human resilience throughout the annals of flood history.</p>
                </div>

            </div>
            <Gallery />
            <Footer />
        </div>
    )
}
