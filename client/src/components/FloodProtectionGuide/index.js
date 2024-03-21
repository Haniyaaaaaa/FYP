import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import { Link } from "react-router-dom"
import catchment from '../../images/catchment.PNG';
import riparian from '../../images/riparian.PNG';
import sediment from '../../images/sediment.PNG';
import hedge from '../../images/hedge.PNG';
import cross from '../../images/cross.PNG';
import bank from '../../images/bank.PNG';
import instream from '../../images/instream.PNG';
import Footer from '../Footer';

export default function index() {
  return (
    <div>
      <NavbarFarmer />

      <div>

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
          <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>FLOOD PROTECTION GUIDE</h1>

          {/* Description */}
          <div style={{ marginLeft: '30px', marginTop: '20px' }}>
            <p style={{ fontSize: '20px' }}>
              Welcome to our comprehensive Flood Protection Guide designed to empower farmers with knowledge
            </p>
            <p style={{ fontSize: '20px', lineHeight: '0' }}>
              and strategies to safeguard their fields during flood events.</p>
          </div>

        </div>

        {/* cards */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <img src={catchment} className="card-img-top" alt="Hollywood Sign on The Hill" style={{ height: '43vh' }} />
              <div className="card-body">
                <h5 className="card-title">Catchment Woodland Planting</h5>
                <p className="card-text">
                  Planting woodlands within farms can potentially have great effect on the rate of water that passes through the farm.
                </p>
                <Link to="/catchment-woodland-planting" target='_blank'>
                  <button style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={riparian} className="card-img-top" alt="Palm Springs Road" style={{ height: '43vh' }} />
              <div className="card-body">
                <h5 className="card-title">Riparian Planting</h5>
                <p className="card-text">Planting riparian zones benefits the environment by filtering sediment and nutrients before they enter waterways.</p>
                <Link to="/riparian-planting" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src="data:image/jpeg;base64,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" className="card-img-top" alt="Los Angeles Skyscrapers" />
              <div className="card-body">
                <h5 className="card-title">Soil Management Measures
                </h5>
                <p className="card-text">These include tilling, cultivating, adding fertilizers and lime, growing cover crops, applying compost or manure, rotating crops.</p>
                <Link to="/soil-management" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={sediment} className="card-img-top" alt="Skyscrapers" style={{ height: '43vh' }} />
              <div className="card-body">
                <h5 className="card-title">Sediment Trap and Bunds</h5>
                <p className="card-text">
                  Sediment traps are small vegetated basins, which allow surface runoff to be guided through.
                </p>
                <Link to="/sediment" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={hedge} className="card-img-top" alt="Hollywood Sign on The Hill" style={{ height: '43vh' }} />
              <div className="card-body">
                <h5 className="card-title"> Hedge Creation</h5>
                <p className="card-text">
                  Hedges can be used as a tool for natural flood management as they can help reduce and slow runoff from your farm
                </p>
                <Link to="/hedge" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={cross} className="card-img-top" alt="Palm Springs Road" style={{ height: '43vh' }} />
              <div className="card-body">
                <h5 className="card-title">Cross Drains for Forestry/Farm Tracks</h5>
                <p className="card-text">a system that diverts water from a gateway, a track or farm yard to an area where it will not cause new erosion or runoff issues. </p>
                <Link to="/crossdrains" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src="https://images.creativemarket.com/0.1.0/ps/12933281/3640/2410/m1/fpnw/wm1/dji_0060-.jpg?1660029949&s=427fbed2875f866c23d00e6e5ba4fdba" className="card-img-top" alt="Los Angeles Skyscrapers" />
              <div className="card-body">
                <h5 className="card-title">Wetland Creation</h5>
                <p className="card-text">Wetland areas are naturally saturated areas of land whereby the water table is near ground level.</p>
                <Link to="/wetland-creation" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={bank} className="card-img-top" alt="Palm Springs Road" style={{ height: '43vh' }} />
              <div className="card-body">
                <h5 className="card-title">Bank Restoration</h5>
                <p className="card-text">A natural process in river
                  systems, however, when human activities result in
                  accelerating natural erosion
                  process problems can arise.</p>
                <Link to="/bank-restoration" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img src={instream} className="card-img-top" alt="Los Angeles Skyscrapers" style={{ height: '43vh' }} />
              <div className="card-body">
                <h5 className="card-title">Instream Obstruction</h5>
                <p className="card-text">Instream obstructions are used in natural flood management to slow the flow of a river and
                  reduce flooding downstream risk.</p>
                <Link to="/instream-obstruction" target='_blank'>
                  <button type="button" style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }} className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  )
}
