import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavbarFarmer from '../NavbarFarmer';
import NavbarAdmin from '../AdminPanel/NavbarAdmin';
import NavbarNormalvictim from '../NavbarNormalvictim'
import Footer from '../Footer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { message, Modal } from "antd";

const EditProfile = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [updPassword, setUpdPassword] = useState('')
    const [delPassword, setDelPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    //for updating the textfields
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const [msg1, setMsg1] = useState("");
    const [error1, setError1] = useState("");

    const [msg2, setMsg2] = useState("");
    const [error2, setError2] = useState("");
    const [userRole, setUserRole] = useState('');

    const [deleteAccount, setDeleteAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const url = `http://localhost:5000/api/update-profile`;

    useEffect(() => {

        //userId is retreived from local storage
        const userToken = localStorage.getItem("token");
        const role = localStorage.getItem('role');
        setUserRole(role);
        console.log(userRole);
        const getDetails = async () => {
            try {
                //userId sent to backend
                const { data } = await axios.post(url, { userId: userToken });

                setNewFirstName(data.firstName);
                setNewLastName(data.lastName);
                setEmail(data.email);

                //write these lines in handlesubmit function. msg should occur when update button is pressed
                // setMsg("Details updated successfully");
                // setError("");
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                    setMsg("");
                }
            }
        };

        getDetails();
        // eslint-disable-next-line
    }, []);

    const handleSubmitUpdateDetails = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost:5000/api/update-profile/rename`;

            const userToken = localStorage.getItem("token");

            // Validation: Check if first name and last name contain only letters
            if (!/^[a-zA-Z]+$/.test(newFirstName) || !/^[a-zA-Z]+$/.test(newLastName)) {
                setError("First name and last name should contain only letters.");
                return;
            }
            //request sent to server
            const { data } = await axios.post(url, { userToken, newFirstName, newLastName });

            setMsg(data.message);
            setError("");

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    }

    const handleSubmitUpdatePassword = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost:5000/api/update-profile/password`;

            const userToken = localStorage.getItem("token");

            //request sent to server
            const { data } = await axios.post(url, { userToken, currentPassword, updPassword });

            setMsg1(data.message);
            setError1("");

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError1(error.response.data.message);
                setMsg1("");
            }
        }
    }

    const handleSubmitDeleteAccount = (event) => {
        event.preventDefault();

        Modal.confirm({
            title: 'Are you sure you want to delete your account?',
            onOk() {
                handleDeleteAccount();
            },
            onCancel() {
                message.info('Account deletion cancelled');
            },
        });

    }

    const handleDeleteAccount = async () => {
        try {
            const url = `http://localhost:5000/api/update-profile/delete`;

            const userToken = localStorage.getItem("token");

            //request sent to server
            const { data } = await axios.post(url, { userToken, delPassword });
            setDeleteAccount(true)
            setMsg2(data.message);
            setError2("");
            // Show CircularProgress for 3 seconds
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                // Reset deleteAccount state and navigate to login page
                setDeleteAccount(false);
                navigate('/login');
            }, 3000);

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError2(error.response.data.message);
                setMsg2("");
            }
        }
    }

    return (
        <React.Fragment>

            {userRole === 'farmer' ? <NavbarFarmer /> : (userRole === 'power admin' ? <NavbarAdmin /> : <NavbarNormalvictim />)}

            <div style={{ width: "100%;", minHeight: "100vh", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", flexDirection: "column" }}>

                <h2 style={{ margin: "30px" }}> My Profile</h2>

                {/* //div 1 */}
                <div className={styles.border_design} style={{ backgroundColor: "#ffffff", width: "600px", marginBottom: "25px" }}>

                    <h4 style={{ textAlign: "center", padding: "15px" }}>Update Details</h4>
                    <form style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} onSubmit={handleSubmitUpdateDetails}>

                        <TextField
                            type="text"
                            variant='filled'
                            color='secondary'
                            label="Email"
                            value={email}
                            fullWidth
                            required
                            inputProps={
                                { readOnly: true, }
                            }
                            sx={{ mb: 4 }}
                            style={{ width: 500 }}

                        />

                        <TextField
                            type="text"
                            variant='filled'
                            color='secondary'
                            label="First Name"
                            onChange={(e) => setNewFirstName(e.target.value)}
                            value={newFirstName}
                            style={{ width: 500 }}
                            sx={{ mb: 4 }}
                            required
                        />
                        <TextField
                            type="text"
                            variant='filled'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setNewLastName(e.target.value)}
                            value={newLastName}
                            style={{ width: 500 }}
                            sx={{ mb: 4 }}
                            required
                        />

                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}

                        <button style={{
                            backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                            fontSize: "16px",
                            cursor: "pointer",
                            marginTop: '0.4rem',
                            marginBottom: '2rem'
                        }} className="btn btn-primary" type="submit">update details</button>



                    </form>
                </div>
                {/* //div2 */}
                <div className={styles.border_design} style={{ backgroundColor: "#ffffff", width: "600px", marginBottom: "25px" }}>
                    <h4 style={{ textAlign: "center", padding: "15px" }}>Update Password</h4>
                    <form style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} onSubmit={handleSubmitUpdatePassword}>
                        <TextField
                            type="Password"
                            variant='filled'
                            color='secondary'
                            label="Current Password"
                            onChange={e => setCurrentPassword(e.target.value)}
                            value={currentPassword}
                            required
                            style={{ width: 500 }}
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="Password"
                            variant='filled'
                            color='secondary'
                            label="New Password"
                            onChange={e => setUpdPassword(e.target.value)}
                            value={updPassword}
                            required
                            style={{ width: 500 }}
                            sx={{ mb: 4 }}
                        />

                        {error1 && <div className={styles.error_msg}>{error1}</div>}
                        {msg1 && <div className={styles.success_msg}>{msg1}</div>}

                        <button style={{
                            backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                            fontSize: "16px",
                            cursor: "pointer",
                            marginTop: '0.4rem',
                            marginBottom: '2rem'
                        }} className="btn btn-primary" type="submit">update Password</button>

                    </form>
                </div>
                {/* //div3 */}
                {userRole !== 'power admin' ? <div className={styles.border_design} style={{ backgroundColor: "#ffffff", width: "600px", marginBottom: "30px" }}>
                    <h4 style={{ textAlign: "center", padding: "15px" }}>Delete Account</h4>
                    <form style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} onSubmit={handleSubmitDeleteAccount}>
                        <TextField
                            type="Password"
                            variant='filled'
                            color='secondary'
                            label="Enter Password to Delete Account"
                            onChange={e => setDelPassword(e.target.value)}
                            value={delPassword}
                            required
                            style={{ width: 500 }}
                            sx={{ mb: 4 }}
                        />

                        {error2 && <div className={styles.error_msg}>{error2}</div>}
                        {msg2 && <div className={styles.success_msg}>{msg2}</div>}

                        <button style={{
                            backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", borderRadius: "10px",
                            fontSize: "16px",
                            cursor: "pointer",
                            marginTop: '0.4rem',
                            marginBottom: '2rem'
                        }} className="btn btn-primary" type="submit">Delete account</button>

                    </form>
                </div> : null}

                {deleteAccount && isLoading && (
                    <Box sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <CircularProgress color="inherit" />
                    </Box>
                )}

                <Footer />
            </div>
        </React.Fragment >

    )
}

export default EditProfile;