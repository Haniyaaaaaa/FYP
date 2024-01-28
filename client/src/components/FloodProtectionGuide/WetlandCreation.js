import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import { Link } from 'react-router-dom'
// import w_s from '../../images/side_img.PNG';
import w_h from '../../images/W_H.PNG';
import w_b from '../../images/W_block.PNG';
import w_p from '../../images/W_pic.PNG';
import w_t from '../../images/W_tbl.PNG';
import w_s from '../../images/side_img.png';
import circle from '../../images/circle.PNG';


export default function WetlandCreation() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Wetland Creation</h1>

                <div className='m-5'>

                    <div className="d-flex">
                        <div className="flex-grow-1 ms-3">
                            <h4 className='mb-3'>What are Wetlands</h4>

                            <p>Wetland areas are naturally saturated areas of land whereby the water table is near ground level.
                                They offer great havens for biodiversity, water purification and storage. Many wetland areas have
                                been drained throughout the years, however, great effort has been undertaken to restore land
                                to its natural state and encourage the rewetting of areas that were drained. As a result, benefits
                                of these systems have shown that creating wetlands can have huge beneficial effects to water
                                quality and slowing the effects of flooding downstream. In addition wetlands can offer a filtering
                                operation, in which nutrients and sediment can be absorbed and deposited, allowing cleaner
                                water to reach nearby waterbodies.</p>


                            <h4 className='mb-3'>What is Upland Wetland Creation</h4>
                            <p>Wetland creation largely commences in the uplands and begins with blocking
                                drainage grips to increase water storage capacity of peatland. During peak
                                rainfall it is the acceleration of water from the open channels, and collection
                                of debris, which leads to flooding, scouring and sediment deposition in the
                                lower sections of water course. This causes environmental degradation,
                                destruction and displacement.</p>
                            <p>Upland drain blocking consists of a manmade dam, depending on size, using
                                impermeable peat, robust wood, stone or plastic. Dam blockers are installed
                                slightly elevated from any existing dams to allow overflow water to be
                                distributed to the surrounding area. The dams then work as a barrier and the
                                water must then dissipate to the surrounding ground.</p>
                            <p> Additional water storage capacity can be created by breaking in-field drainage,
                                in fields with a naturally occurring high water table. This serves to store
                                additional water and helps encourage sphagnum regeneration, which aids
                                slowing the flow during floods, and essentially acting as a flood plain.</p>

                        </div>
                        <div className="flex-shrink-0">
                            <img src={w_s} alt="Palm Springs Road" />
                        </div>

                    </div>
                    <img src={w_p} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh' }} />

                    <h4 className='mb-3'>What is Lowland Wetland Creation</h4>
                    <p>The creation of lowland wetland is established through a similar method to upland wetland creation. Barriers are installed, reducing the
                        flow of runoff from the farm, which in turn aid sediment deposition and increased infiltration rate.</p>
                    <p>As with upland wetlands, creating wetlands can be to increase water storage capacity, filter runoff water and offer habitats for biodiversity.</p>
                    <p>The systems can offer:</p>

                    <div>
                        <img src={w_h} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '20vh' }} />
                    </div>

                    <h4 className='mb-3'>Why is there a need for Wetland Creation?</h4>
                    <p>Large scale draining for agricultural improvement began in the 1840s. Draining was introduced for various reasons, however, following the
                        Second World War there was an initiative to improve and increase land for food production. Since the 1980s, however, growing evidence has
                        suggested that draining certain areas of land may increase the likelihood of flooding downstream.</p>
                    <p>Emphasis has now moved to removing/blocking appropriate farm drains, which can allow land to return to an improved state and can help
                        reduce flooding downstream.
                    </p>

                    <h4 className='mb-3'>What is Farm Drain Blocking</h4>
                    <p>For fields, which have high water tables or suffer from saturation, blocking drains and converting some part of a field to a wetland area may
                        be beneficial. The process involves breaking in-field underdrainage and allowing runoff water to accumulate. If fields continuously suffer
                        from saturation altering the land use to allow wetland formation could be more financially viable and offer more benefits than trying to
                        drain the area.
                        Drain blocking is a relatively low cost, low maintenance management tool depending on scale.
                    </p>

                    <h4 className='mb-3'>How Drain Blocking could benefit your Farm</h4>
                    <div>
                        <img src={w_b} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh' }} />
                    </div>

                    <div className="d-flex mt-4">
                        <div className="flex-grow-1 ms-3">
                            <h4 className='mb-3'>Would Wetlands Work For You?</h4>

                            <p>When considering installing wetlands into a farm the financial cost of the project
                                needs to be considered. </p>

                            <ul>
                                <li>Is there land that is frequently wet that could be productive to turn into a
                                    wetland?</li>
                                <li>By converting the land would the benefits outweigh the loss of potential
                                    arable land?</li>
                            </ul>


                            <p>It is important to discuss projects with SEPA as soon as possible. Advice can be
                                sought on many issues that may arise from installing a scheme on farm.
                            </p>

                        </div>
                        <div className="flex-shrink-0">
                            <img src={circle} alt="Palm Springs Road" />
                        </div>

                    </div>

                    <h4 className='mb-3'>What Scheme Would Suit you?</h4>
                    <img src={w_t} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '70vh' }} />






                    <p style={{ marginTop: '20px' }}><strong>Further Information Online:</strong></p>
                    <Link to="https://www.therrc.co.uk/manual-river-restoration-techniques" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>https://www.therrc.co.uk/manual-river-restoration-techniques</Link>
                    <br />
                    <Link to="https://www.sepa.org.uk/media/163560/sepa-natural-flood-management-handbook1.pdf" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>https://www.sepa.org.uk/media/163560/sepa-natural-flood-management-handbook1.pdf</Link>
                    <br />
                    <Link to="https://forestryandland.gov.scot/" target='_blank' style={{ textDecoration: 'none', color: 'black' }}>https://forestryandland.gov.scot/</Link>


                </div>
            </div>
        </div >
    )
}
