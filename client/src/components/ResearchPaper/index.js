import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';
import NavbarNormalvictim from '../NavbarNormalvictim'
import { Link } from 'react-router-dom';
import Footer from '../Footer';

export default function ResearchPaper() {
    return (
        <div>

            <NavbarNormalvictim />

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
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>RESEARCH PAPER ON FLOOD</h1>

                {/* Description */}
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        Explore flood research through our curated collection of scholarly papers. Delve into topics such as prevention strategies, risk
                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '0' }}>
                        assessment, socio-economic impacts, uncovering valuable insights into the complexities of flood dynamics.</p>
                </div>

            </div>

            {/* cards */}
            <MDBCard className='text-center mb-3 mt-3'>
                <MDBCardBody className='text-left'>
                    <MDBCardTitle>The Effect of Flood Protection Works on Flood Risk</MDBCardTitle>
                    <MDBCardText>
                        We investigated the impact of flood protection works on flood risk in Mandra, Greece, using integrated hydrological and hydrodynamic calculations. The study revealed a significant reduction (53–89%) in inundation areas and improvements in key risk indicators, demonstrating the effectiveness of the implemented protection measures.
                    </MDBCardText>
                    <Link to="https://www.mdpi.com/2073-4441/14/23/3936" target='_blank'>
                        <MDBBtn>Read More</MDBBtn>
                    </Link>
                </MDBCardBody>
            </MDBCard>

            <MDBCard className='text-center mb-3'>
                <MDBCardBody className='text-left'>
                    <MDBCardTitle>A review of the flood management: from flood control to flood resilience</MDBCardTitle>
                    <MDBCardText>
                        Climate change and socioeconomic developments are increasing the frequency and severity of floods. Flood management is widely recognized as an effective way to reduce the adverse consequences, and a more resilient and sustainable flood management approach has been the goal in recent studies.
                    </MDBCardText>
                    <Link to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9713350/" target='_blank'>
                        <MDBBtn>Read More</MDBBtn>
                    </Link>
                </MDBCardBody>
            </MDBCard>

            <MDBCard className='text-center mb-3'>
                <MDBCardBody className='text-left'>
                    <MDBCardTitle>Identifying and characterising individual flood precautionary behaviour dynamics from panel data</MDBCardTitle>
                    <MDBCardText>
                        Individual precautionary behaviour in response to flooding can considerably reduce flood impacts. Therefore, understanding its drivers and temporal dynamics is of high interest for risk management and communication. Previous studies are mostly based on temporally limited data by using cross-sectional surveys.
                    </MDBCardText>
                    <Link to="https://www.sciencedirect.com/science/article/abs/pii/S2212420923003151" target='_blank'>
                        <MDBBtn>Read More</MDBBtn>
                    </Link>
                </MDBCardBody>
            </MDBCard>

            <MDBCard className='text-center mb-3'>
                <MDBCardBody className='text-left'>
                    <MDBCardTitle>Quantifying Flood Vulnerability Reduction via Private Precaution</MDBCardTitle>
                    <MDBCardText>
                        Private precaution is an important component in contemporary flood risk management and climate adaptation. However, quantitative knowledge about vulnerability reduction via private precautionary measures is scarce and their effects are hardly considered in loss modeling and risk assessments.
                    </MDBCardText>
                    <Link to="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2018EF000994" target='_blank'>
                        <MDBBtn>Read More</MDBBtn>
                    </Link>
                </MDBCardBody>
            </MDBCard>

            <MDBCard className='text-center mb-3'>
                <MDBCardBody className='text-left'>
                    <MDBCardTitle>Identifying the drivers of private flood precautionary measures in Ho Chi Minh City, Vietnam</MDBCardTitle>
                    <MDBCardText>
                        Private flood precautionary measures have proven to reduce flood damage effectively. Integration of these measures into flood response systems can improve flood risk management in high-risk areas such as Ho Chi Minh City (HCMC). Since uptake of such measures is voluntary, it is important to know what drives householders to implement precautionary measures.
                    </MDBCardText>
                    <Link to="https://nhess.copernicus.org/articles/23/1125/2023/" target='_blank'>
                        <MDBBtn>Read More</MDBBtn>
                    </Link>
                </MDBCardBody>
            </MDBCard>

            <MDBCard className='text-center mb-3'>
                <MDBCardBody className='text-left'>
                    <MDBCardTitle>Why People (Do Not) Adopt the Private Precautionary and Mitigation Measures: A Review of the Issue from the Perspective of Recent Flood Risk Research</MDBCardTitle>
                    <MDBCardText>
                        Based on the literature review, this paper synthesizes recent state of knowledge on flood risk perception and related human behaviors. The main attention is paid to private precautionary and mitigation measures, and the reasons why these are (not) adopted by agents such as individual households. Results of a wide range of relevant studies are presented and critically examined.
                    </MDBCardText>
                    <Link to="https://www.mdpi.com/2073-4441/13/2/140" target='_blank'>
                        <MDBBtn>Read More</MDBBtn>
                    </Link>
                </MDBCardBody>
            </MDBCard>

            <MDBCard className='text-center mb-3'>
                <MDBCardBody className='text-left'>
                    <MDBCardTitle>Needed: A systems approach to improve flood risk mitigation through private precautionary measures</MDBCardTitle>
                    <MDBCardText>
                        Private precautionary measures play an increasingly important role in flood risk management. The degree to which private precautionary measures mitigate flood risk depends mainly on the type of measure (and how effective it is) and how frequently and successfully it is implemented.
                    </MDBCardText>
                    <Link to="https://www.sciencedirect.com/science/article/abs/pii/S2468312420300225" target='_blank'>
                        <MDBBtn>Read More</MDBBtn>
                    </Link>
                </MDBCardBody>
            </MDBCard>
            <Footer />
        </div>
    );
}
