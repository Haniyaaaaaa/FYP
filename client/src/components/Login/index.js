import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "normal victim",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:5000/api/auth";

      // Check if all three fields (email, password, role) are present
      if (!data.email || !data.password || !data.role) {
        setError("Please enter email, password, and select a role.");
        return;
      }

      const { data: res } = await axios.post(url, data);

      // userId is set in localStorage of browser
      // {token:userId}
      //token field contains userId

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      window.dispatchEvent(new Event("storageChange"));

      console.log(res.data.token);
      console.log(res.data.role);

      if (res.data.role === "power admin") {
        navigate("/admin-dashboard");
      } else if (res.data.role === "farmer") {
        navigate("/home-farmer");
      } else if (res.data.role === "normal victim") {
        navigate("/home-normalvictim");
      }
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
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
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

            <label style={{ alignSelf: "flex-start", marginLeft: "17px" }}>
              <input
                type="checkbox"
                onChange={handleTogglePassword}
                checked={showPassword}
                style={{ margin: "5px" }}
              />
              Show Password
            </label>

            <div
              style={{
                alignSelf: "flex-start",
                margin: "5px",
                marginLeft: "17px",
              }}
            >
              <label>Role:</label>
              <label style={{ margin: "5px" }}>
                <input
                  type="radio"
                  name="role"
                  value="power admin"
                  checked={data.role === "power admin"}
                  onChange={handleChange}
                  style={{ margin: "5px" }}
                />
                Power Admin
              </label>
              <label style={{ margin: "5px" }}>
                <input
                  type="radio"
                  name="role"
                  value="farmer"
                  checked={data.role === "farmer"}
                  onChange={handleChange}
                  style={{ margin: "5px" }}
                />
                Farmer
              </label>
              <label style={{ margin: "5px" }}>
                <input
                  type="radio"
                  name="role"
                  value="normal victim"
                  checked={data.role === "normal victim"}
                  onChange={handleChange}
                  style={{ margin: "5px" }}
                />
                Normal Victim
              </label>
            </div>

            <Link
              to="/forgot-password"
              style={{
                alignSelf: "flex-end",
                textDecoration: "none",
                color: "#3bb19b",
                marginRight: "10px",
              }}
            >
              <p>Forgot Password?</p>
            </Link>

            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>

          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
