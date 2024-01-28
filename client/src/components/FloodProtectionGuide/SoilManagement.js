import React from 'react'
import { Link } from 'react-router-dom'
import NavbarFarmer from '../NavbarFarmer'
import m_b from '../../images/M_B.PNG';
import m_pics from '../../images/M_pics.PNG';
import m_p from '../../images/M_P.PNG';
import m_tt from '../../images/M_TT.PNG';
import m_n from '../../images/M_nN.PNG';
import m_m from '../../images/M_M.PNG';
import m_benefits from '../../images/M_benef.PNG';

export default function SoilManagement() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Soil Management Measures</h1>
                <p>The management of soil runoff is an ongoing battle of the farming industry. The cost to the farm and the surrounding area from the
                    movement of soil can be vast. This section explores different methods to reduce the soil loss from the farm, trying to keep the soil and nutrients
                    as close as possible to their origin.</p>
                <div className='m-5'>

                    <div className="d-flex">
                        <div className="flex-grow-1 ms-3">

                            <h4 className='my-3'>Relieving Compaction</h4>
                            <h4 className='mb-3'>What is Soil Compaction and Why is it an Issue?</h4>
                            <p>Soil compaction is one of the biggest problems modern farmers face when managing their soil resource. Increased use of heavy machinery,
                                stocking densities and high rainfall winters has led to it becoming a hot topic among arable and livestock alike. The role compaction can play
                                in increasing the amount of runoff from farms also contributes to the total amount of water reaching the burn when there is heavy rainfall,
                                thus impacts on potential flood waters. During a rainfall event un-compacted soil will soak up water until it fills its pore space and becomes
                                saturated, a compacted soil will soak up less water and will reach saturation slower allowing more water to flow into the burn, as shown in the
                                figures below
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
                            <img src={m_pics} alt="Palm Springs Road" />
                        </div>

                    </div>

                    <h4 className='mb-3'>What can you do to avoid soil compaction</h4>
                    <p>To try to avoid soil compaction on farm make simple changes that can have huge benefit</p>


                    <div>
                        <img src={m_b} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '60vh' }} />
                        <p>Reducing soil compaction will not only help to reduce run off and flood waters it can also help to increase grass and crop yields and reduce
                            fertiliser loss.</p>
                        <img src={m_p} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh' }} />

                    </div>
                    {/* 
                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 className='mb-3'>Riparian Planting Top Tips</h4>
                        <img src={r_table} alt="Palm Springs Road" />
                    </div> */}

                    <h4 className='mb-3 mt-4'>Tram Lines</h4>

                    <h4>Why is Tramline Management Important in NFM?</h4>
                    <p>Tramlines are a recognised practice in arable farming allowing for simpler field operations. If tramlines become compacted they can encourage
                        the channelling of water and potentially increase diffuse pollution. Making small changes to tramlines can make a huge difference to the
                        surface runoff.</p>

                    <h4 className='mb-3 mt-4'>Tramline Management – Top Tips</h4>
                    <img src={m_tt} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '60vh' }} />

                    <h4 className='mb-3 mt-4'>Buffer Strips and Fencing</h4>
                    <h4 className='mb-3 mt-4'>What are Buffer Strips</h4>
                    <p>Buffer strips are vegetated strip(s), generally consisting of grassland, wetland, scrub or trees, lying alongside watercourse and ditches. The
                        width of strips varies depending on site, however, a minimum 2m is required to comply with Good Agricultural and Environmental Conditions
                        (GAECs). </p>
                    <img src={m_n} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '60vh' }} />

                    <h4 className='mb-3 mt-4'>What Can Buffer Strips Offer Your Farm</h4>
                    <img src={m_m} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '30vh', margin: '2rem' }} />
                    <img src={m_benefits} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh' }} />


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
