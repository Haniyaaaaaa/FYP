import React from 'react'

export default function Header(props) {
  return (
    <div>
       {/* black div */}
       <div
          style={{

            background: 'linear-gradient(to right, #000000, #333333)',
            color: 'white',
            padding: '40px 88px',
            height: '38vh',
          }}
        >
          {/* Heading */}
          <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '30px', fontSize: '55px' }}>{props.heading}</h1>

          {/* Description */}
          <div style={{ marginLeft: '30px', marginTop: '20px' }}>
            <p style={{ fontSize: '20px' }}>
              {props.description1}
            </p>
            <p style={{ fontSize: '20px', lineHeight: '0' }}>
            {props.description2}</p>
          </div>

        </div>
    </div>
  )
}
