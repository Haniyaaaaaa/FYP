import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import s_table from '../../images/S_table.PNG';
import { Link } from 'react-router-dom'
import s_pic from '../../images/S_pic.PNG';

export default function Sediment() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Sediment Trap and Bunds</h1>

                <div className='m-5'>

                    <h4 className='mb-3'>What are Sediment Traps and Bunds
                    </h4>

                    <p>Sediment traps are small vegetated basins, which allow surface runoff to be guided through. The systems work by retaining water, which
                        allows sediment to settle before entering watercourses. The traps can offer a ‘security blanket’ for preventing runoff entering nearby
                        watercourses and retaining soil on the farm. To ensure they are most effective they should remain ‘dry’ until a rain event whereby they can
                        be used to collect runoff. </p>
                    <img src={s_pic} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh', marginBottom: '1rem' }} />

                    <p>Sediment trap bunds are excavated mounds of earth, which act as a block in the waters path. The systems work best in-field, generally at the
                        bottom of slopes. The bund can ‘trap’ water reducing the flow to nearby watercourse, hence reducing the impact and allowing for soil to be
                        retained on farm.
                    </p>

                    <h4 className='mb-3'>Why install sediment traps?</h4>
                    <div>
                        <img src={s_table} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh' }} />
                    </div>
                    <p>As with most schemes, sediment traps with the largest surface area are more efficient, however, smaller schemes are still beneficial.
                    </p>
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
