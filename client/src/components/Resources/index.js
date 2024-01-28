import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavbarNormalvictim from '../NavbarNormalvictim'

function createData(department, phone, helpline) {
    return { department, phone, helpline };
}

const rows = [
    createData('PDMA', '(92-42) 99204408, 99204409', '1129'),
    createData('Police Emergency', '-', '15'),
    createData('Edhi Ambulance', '-', '115'),
    createData('Rescue 1122', '-', '1122'),
    createData('NDMA', '051-111-157-157', '-'),
    createData('Flood Forecasting Division', '+92 42 99200139, +92 42 99200208', '-'),
    createData('Civil Hospital(Karachi)', '(0213)992 15960', '-'),
    createData('Civil Hospital(Lahore)', '(0423)992 1110-9', '-'),
    createData('Civil Hospital(Islamabad)', '(051)555 0311', '-'),
    createData('Civil Hospital(Peshawar)', '(021)582 3998', '-'),
    createData('Civil Hospital(Quetta)', '(081)920 2018', '-'),
    createData('Civil Hospital(Faisalabad)', '(041)920 0140', '-'),
];

export default function BasicTable() {
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
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>RESOURCES ON POST FLOOD REHABILITATION</h1>

                {/* Description */}
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        Discover essential resources on post-flood rehabilitation, including emergency contact numbers and helpline support, offering
                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '0' }}>
                        crucial assistance and guidance for affected communities in the aftermath of flooding incidents.</p>
                </div>

            </div>

            <TableContainer component={Paper} className='pt-3' style={{ paddingLeft: '250px', paddingRight: '250px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: '20px' }}>Department</TableCell>
                            <TableCell style={{ fontSize: '20px' }}>Phone</TableCell>
                            <TableCell style={{ fontSize: '20px' }}>Helpline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.department}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.department}
                                </TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.helpline}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
