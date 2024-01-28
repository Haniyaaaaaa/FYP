import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Footer from "../Footer";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/api/password-reset`;
			const { data } = await axios.post(url, { email });
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
	};

	return (
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className={styles.input}
				/>

				<button type="submit" className={styles.green_btn}>

					Send Login Link
				</button>

				{error && <div className={styles.error_msg}>{error}</div>}
				{msg && <div className={styles.success_msg}>{msg}</div>}

			</form>
			<div style={{ position: "absolute", bottom: "0", width: "100%" }}><Footer /></div>

		</div>
	);
};

export default ForgotPassword;