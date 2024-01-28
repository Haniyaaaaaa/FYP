import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		reenterPassword: "",
		role: "normal victim", // Default role selection
	});
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		let timer;
		// If there's an error or success message, start a timer to clear it after 2 seconds
		if (error || msg) {
			timer = setTimeout(() => {
				setError('');
				setMsg('');
			}, 3000);
		}

		return () => clearTimeout(timer);
	}, [error, msg]);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation: Check if first name and last name contain only letters
		if (!/^[a-zA-Z]+$/.test(data.firstName) || !/^[a-zA-Z]+$/.test(data.lastName)) {
			setError("First name and last name should contain only letters.");
			return;
		}

		// Validation: Check if email follows the email pattern
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
			setError("Please enter a valid email address.");
			return;
		}

		// Check if passwords match on the frontend
		if (data.password !== data.reenterPassword) {
			setError("Passwords do not match");
			return;
		}

		// Remove reenterPassword from data before sending to backend
		// postData contains all properties of fata except reenter password
		const { reenterPassword, ...postData } = data;

		try {
			const url = "http://localhost:5000/api/users";
			const { data: res } = await axios.post(url, postData);
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>

						<input
							type={showPassword ? "text" : "password"}
							placeholder="Re-enter password"
							name="reenterPassword"
							onChange={handleChange}
							value={data.reenterPassword}
							required
							className={styles.input}
						/>

						<label style={{ alignSelf: "flex-start" }}>
							<input
								type="checkbox"
								onChange={handleTogglePassword}
								checked={showPassword}
								style={{ margin: '5px' }}
							/>
							Show Password
						</label>

						<div style={{ alignSelf: "flex-start", margin: '5px' }}>
							<label>Role:</label>
							<label style={{ margin: '5px' }}>
								<input
									type="radio"
									name="role"
									value="farmer"
									checked={data.role === "farmer"}
									onChange={handleChange}
									style={{ margin: '5px' }}
								/>
								Farmer
							</label>
							<label style={{ margin: '5px' }}>
								<input
									type="radio"
									name="role"
									value="normal victim"
									checked={data.role === "normal victim"}
									onChange={handleChange}
									style={{ margin: '5px' }}
								/>
								Normal Victim
							</label>

						</div>

						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>

						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}

					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
