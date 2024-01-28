import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import h_table from '../../images/H_table.PNG';
import { Link } from 'react-router-dom'
import h_pic from '../../images/H_pic.PNG';

export default function Hedge() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Hedge Creation</h1>

                <div className='m-5'>

                    <h4 className='mb-3'>What can hedges offer your farm</h4>

                    <p>Hedges can be used as a tool for natural flood management as they can help reduce and slow runoff from your farm, thus reducing the
                        volume of water reaching nearby watercourses. This in a high flow scenario can help to reduce the risk of flooding downstream. The chaotic
                        nature of branches in woody hedges furthermore helps to reduce the flow of water during a flood event, further reducing flooding risks. The
                        benefits, however, of planting or maintaining hedges on farm go beyond NFM. </p>
                    <img src={h_pic} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh', marginBottom: '1rem' }} />

                    <h4 className='mb-3'>What can Hedges bring to Your Farm
                    </h4>
                    <p>Hedges can be used as a tool for natural flood management as they can help reduce and slow runoff from your farm, thus reducing the
                        volume of water reaching nearby watercourses. This in a high flow scenario can help to reduce the risk of flooding downstream. The chaotic
                        nature of branches in woody hedges furthermore helps to reduce the flow of water during a flood event, further reducing flooding risks. The
                        benefits, however, of planting or maintaining hedges on farm go beyond NFM.
                    </p>
                    <div>
                        <img src={h_table} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '50vh' }} />
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
