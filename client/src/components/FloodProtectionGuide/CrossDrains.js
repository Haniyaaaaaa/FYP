import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import { Link } from 'react-router-dom'
import c_pic from '../../images/C_pic.PNG';
import c_tbl from '../../images/C_tbl.PNG';

export default function Hedge() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Cross Drains for Forestry/Farm Tracks</h1>

                <div className='m-5'>

                    <p>Road and tracks are essential infrastructure within a farm. However, when discussing movement of water they can operate as a passage for
                        water to run through farms at speed. This can have damaging effects to existing infrastructure and the surrounding environment.
                    </p>
                    <p>The impact of heavy rain falls have been observed in recent years throughout Scotland. The increase in flash flooding, as a result of heavy
                        downpours, impacts the longevity of farm tracks. </p>
                    <img src={c_pic} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '20vh', marginBottom: '1rem' }} />

                    <h4 className='mb-3'>What issues arise from water erosion on farm tracks
                    </h4>

                    <div>
                        <img src={c_tbl} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '60vh', paddingBottom: '1rem' }} />
                    </div>

                    <p>Increased flows carry vital sediment and nutrients from farm, accelerating the speed to which they reach nearby waterbodies. As a result, the
                        fields remaining can experience soil damage and loss of important nutrients.</p>
                    <p>Protecting tracks from the offset can significantly save you money in maintenance and soil damage</p>

                    <h4 className='mb-3'>Where to Install Cross Drains
                    </h4>
                    <p>Installing cross drains strategically along tracks can helps minimise water damage. Focus on ’hot spots’, which are more liable for flooding, for
                        example by gates, at watering points, bottom of steep slopes. Trying to reduce the momentum of the water can significantly help reduce the
                        impact on tracks. Setting cross drains tactically could increase the life time of road infrastructure and save money. Additionally combining drains
                        with sediment traps (see page 15) can catch run off and protect nearby waterbodies, while maintaining material on farm. </p>

                    <p style={{ marginTop: '20px' }}><strong>Further Information Online:</strong></p>
                    <Link to="https://www.sepa.org.uk/media/219450/bank_protection_guidance.pdf" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>https://www.sepa.org.uk/media/219450/bank_protection_guidance.pdf</Link>
                    <br />
                    <Link to="https://www.sepa.org.uk/media/163560/sepa-natural-flood-management-handbook1.pdf" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>https://www.sepa.org.uk/media/163560/sepa-natural-flood-management-handbook1.pdf</Link>
                    <br />
                    <Link to="https://forestryandland.gov.scot/" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>https://forestryandland.gov.scot/</Link>


                </div>
            </div>
        </div>
    )
}
