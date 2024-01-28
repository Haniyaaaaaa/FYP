import React from 'react'
import NavbarFarmer from '../NavbarFarmer'
import { Link } from 'react-router-dom'
import i_p from '../../images/I_pics.PNG';
import i_tbl from '../../images/I_tbl.PNG';

export default function InstreamObstruct() {
    return (
        <div>
            <NavbarFarmer />

            <div style={{ marginLeft: '8rem', marginTop: '4rem', paddingBottom: '2rem' }}>
                <h1>Instream Obstruction</h1>

                <div className='m-5'>

                    <h4 className='mb-3'>What is Instream Obstruction
                    </h4>

                    <p>Instream obstructions, usually in the form of woody debris, are used in natural flood management to disrupt and slow the flow of a river and
                        reduce the risk of flooding downstream. They can come in many shapes and sizes and consist of a log or bunch of logs crossing a bank either
                        under or over the surface of the water. They can occur naturally in rivers through trees falling across a river.
                    </p>
                    <p> However, the benefits felt in and around the watercourse are far more than just from flood management.  </p>
                    <img src={i_p} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh', marginBottom: '1rem' }} />

                    <h4 className='mb-3'>What Instream Obstructions Can Offer Your Farm</h4>
                    <div>
                        <img src={i_tbl} alt="Palm Springs Road" style={{ maxWidth: '100%', height: '40vh', paddingBottom: '1rem' }} />
                    </div>
                    <p>To install instream obstructions consultation with SEPA is required and beneficial. SEPA can advise of issues and support the plan for the
                        most appropriate and suitable scheme for the farm. It is important to ensure that any obstruction is sited in a suitable location, which SEPA
                        can advise on. For example, if a potential location is on steep gradients above a bridge the structures could cause a washout and flooding/
                        blockage, therefore, making situations worse. This highlights the importance of finding a good location for these schemes to ensure the
                        greatest benefit can be reached.</p>
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
