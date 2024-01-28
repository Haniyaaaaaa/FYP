import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import c_b from '../../images/C_B.PNG';
import c_table from '../../images/C_table.PNG';
import { Link } from 'react-router-dom'
import c_pics from '../../images/C_pics.PNG';

export default function Catchment() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Catchment Woodland Planting</h1>

                <div className='m-5'>

                    <div className="d-flex">
                        <div className="flex-grow-1 ms-3">
                            <h4 className='mb-3'>What Catchment Planting Can Do</h4>

                            Planting woodlands within farms can potentially have great effect on the rate of water that passes through the farm.
                            <p></p>
                            Woodlands can offer:

                            <ul>
                                <li>• Wind breaks and land roughness</li>
                                <li>• Protect soil from disturbance</li>
                                <li>• Improved soil structure</li>
                                <li>Tree roots bind soil together, while the woodland</li>
                                <li>• provides high organic matter</li>
                            </ul>

                            <h4 className='mb-3'>What Catchment Woodlands Can Offer Your Farm</h4>
                            <ul>
                                <li>• Well sited woodlands can slow peak flows reducing
                                    flood peaks downstream</li>
                                <li>• Reduced erosion</li>
                                <li>• Reduced silt entering waterbodies</li>

                            </ul>

                        </div>
                        <div className="flex-shrink-0">
                            <img src={c_b} alt="Palm Springs Road" />
                        </div>

                    </div>

                    <h4 className='mb-3'> What Woodland would suit you?</h4>
                    <p>Both broadleaved and conifer woodland can help with
                        Natural Flood Management on a catchment scale. Deciding
                        what would be most suitable for your farm depends on the
                        issue you are hoping to resolve:
                    </p>
                    <p>This increased ability of the soil to receive and store rain water is often referred to as the forest ‘sponge effect’.
                        There are limitations to this effect, however, as most major floods occur following periods of exceptionally heavy and/or prolonged rainfall.
                        On these occasions the forest soils which will be intercepting water, however, are generally fully rewetted with a reduced capacity to receive
                        and store storm water.</p>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',margin: '3rem' }}>
                        <img src={c_pics} alt="Palm Springs Road" style={{maxWidth: '100%', height: '40vh' }} />
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 className='mb-3'>Catchment Woodland Top Tips</h4>
                        <img src={c_table} alt="Palm Springs Road" />
                    </div>


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
