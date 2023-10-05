import react, { useState } from "react";
import styles from "./signupStyle/style.module.css";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../../Redux/Actions/AuthActions";

export default function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [rPassword, setRpassword] = useState("");

  const handleChange = (name, value) => {
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "rPassword":
        setRpassword(value);
        break;
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(register({ name, email, password ,phone}, navigate));
  };
  return (
    <div className={styles.container}>
      <div className={styles.signup_content}>
        <div className={styles.signup_form}>
          <h2 className={styles.form_title}>Sign up</h2>
          <form
            method="POST"
            className={styles.register_form}
            id="register-form"
          >
            <div className={styles.form_group}>
              <label for="name">
                <i className="zmdi zmdi-account material-icons-name" />
              </label>
              <input
                onChange={(e) => handleChange("name", e.target.value)}
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Your Name"
              />
            </div>
            <div className={styles.form_group}>
              <label for="email">
                <i className="zmdi zmdi-email" />
              </label>
              <input
                onChange={(e) => handleChange("email", e.target.value)}
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Your Email"
              />
            </div>
            <div className={styles.form_group}>
              <label for="phone">
                <i className="zmdi zmdi-email" />
              </label>
              <input
                onChange={(e) => handleChange("phone", e.target.value)}
                type="number"
                name="phone"
                id="phone"
                value={phone}
                placeholder="numero de telephone"
              />
            </div>
            <div className={styles.form_group}>
              <label for="pass">
                <i className="zmdi zmdi-lock" />
              </label>
              <input
                onChange={(e) => handleChange("password", e.target.value)}
                type="password"
                name="pass"
                id="pass"
                value={password}
                placeholder="Password"
              />
            </div>
            <div className={styles.form_group}>
              <label for="re-pass">
                <i className="zmdi zmdi-lock-outline" />
              </label>
              <input
                onChange={(e) => handleChange("rPassword", e.target.value)}
                type="password"
                name="re_pass"
                id="re_pass"
                value={rPassword}
                placeholder="Repeat your password"
              />
            </div>
            <div className={styles.form_group}>
              <input
                type="checkbox"
                name="agree-term"
                id="agree-term"
                className="agree-term"
              />
              <label for="agree-term" className="label-agree-term">
                <span>
                  <span />
                </span>
                I agree all statements in{" "}
                <a href="#" className="term-service">
                  Terms of service
                </a>
              </label>
            </div>
            <div className={styles.form_group}>
              <input
                onClick={(e) => {
                  handleRegister(e);
                }}
                type="submit"
                name="signup"
                id="signup"
                className={styles.form_submit}
                value="Register"
              />
            </div>
          </form>
        </div>
        <div className={styles.signup_image}>
          <figure>
            <img src={logo} alt="sing up image" />
          </figure>
          <a href="/signin" className={styles.signup_image_link}>
            I am already member
          </a>
        </div>
      </div>
    </div>
  );
}
