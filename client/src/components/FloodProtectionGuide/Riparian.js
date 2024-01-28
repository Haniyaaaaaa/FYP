import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import r_b from '../../images/R_B.PNG';
import r_table from '../../images/R_table.PNG';
import { Link } from 'react-router-dom'
import r_pics from '../../images/R_pics.PNG';

export default function Riparian() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Riparian Planting</h1>

                <div className='m-5'>

                    <div className="d-flex">
                        <div className="flex-grow-1 ms-3">
                            <h4 className='mb-3'>What is Riparian Planting</h4>

                            <p>This is planting woodland along riverbanks and areas of wet woodland extending beyond the riparian zone across the flood plain. Such
                                woodland, if containing appropriate trees and well managed, can provide numerous benefits for natural flood management:</p>


                            <h4 className='mb-3'>Would Riparian Planting be right for Your Farm?</h4>
                            <p>Care is required to avoid sites where the backing-up of floodwaters upstream could affect local properties, or the washout of large woody
                                debris could block downstream bridges or culverts. Access may be needed to maintain flood protection measures. Ensure that Forest and Water
                                Guidelines are followed throughout the whole process.
                            </p>

                            <p>Groups of conifers produce heavy shade. This reduces the biodiversity and productivity of a water course and should be avoided. The lack
                                of ground vegetation that results from the heavy shade can also lead to increased soil erosion. Finding the right species for the woodland is
                                important for the success of the project. </p>

                            <p>Riparian woodland often involves long thin strips of woodland on fertile ground. These can be expensive to establish with high protection
                                costs (long lengths of fencing per area planted) and high weeding costs. Fencing can also be difficult along flood plain areas and will need to
                                be replaced if damaged by a flood Consider flow pathways during flood events and avoid fencing transverse to these, alternatively use specially
                                designed fences, which are easy to reinstall.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <img src={r_b} alt="Palm Springs Road" />
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

                    <div>
                        <img src={r_pics} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh' }} />
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 className='mb-3'>Riparian Planting Top Tips</h4>
                        <img src={r_table} alt="Palm Springs Road" />
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
