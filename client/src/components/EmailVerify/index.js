import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.jpg";
import styles from "./styles.module.css";
import { Fragment } from "react";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const url = `http://localhost:5000/api/users/${param.id}/verify/${param.token}`;

    const verifyEmailUrl = async () => {
      try {
        //useparams is used to get the parameters from the route defined fro this particular interface
        console.log("URL:", url);
        const { data } = await axios.get(url);
        console.log(data);

        if (data && data.message === "Email has already been verified") {
          setValidUrl(false);
        } else {
          setValidUrl(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Email verified successfully. Now you can login</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>You have already been verified</h1>
        </div>
      )}
    </Fragment>
  );
};

export default EmailVerify;
