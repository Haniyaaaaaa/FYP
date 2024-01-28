import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import { Link } from 'react-router-dom'
import b_s from '../../images/B_side.PNG';
import b_tbl from '../../images/B_tbl.PNG';

export default function BankRestore() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Bank Restoration</h1>

                <div className='m-5'>

                    <div className="d-flex">
                        <div className="flex-grow-1 ms-3">
                            <h4 className='mb-3'>What is Bank Restoration?</h4>

                            <p>Bank erosion is an important natural process in river
                                systems, however, when human activities result in
                                accelerating and exacerbating the natural erosion
                                process problems can arise. Erosion on watercourses
                                is often exacerbated by heavy rainfall events, and
                                influenced by agricultural and forestry activities.
                                The issues created by rainfall events include diffuse
                                pollution, caused by sediment and phosphate loss
                                from soil erosion, all of which affect the water
                                ecosystem and the species it supports, including
                                salmon and fresh water pearl mussel. Damage to
                                the edges of watercourses is often historic, however,
                                remedial action is possible in the form of bank
                                restoration.</p>


                        </div>
                        <div className="flex-shrink-0">
                            <img src={b_s} alt="Palm Springs Road" />
                        </div>

                    </div>

                    <h4 className='mb-3'>Would Bank Restoration Work on Your Farm?</h4>

                    <img src={b_tbl} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '70vh' }} />

                    <p>All these questions need to be answered before beginning your project to ensure that these schemes would be best for you and your farm.
                        Ensure that you contact SEPA in the initial feasibility stage for advice and allow any potential concerns to be raised.</p>

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
