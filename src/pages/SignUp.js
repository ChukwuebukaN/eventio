import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import onboarding from "../api/onboarding";
import authHandler from "../authHandler";
import LogoBlack from "../images/LogoBlack.png";
import { NonAuthRoutes } from "../constants";

function SignUp() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [inputFirstnameActive, setInputFirstnameActive] = useState(false);
  const [inputLastnameActive, setInputLastnameActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);
  const [inputPasswordValActive, setInputPasswordValActive] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState(false);
  const screenIsMobile = authHandler.getUserIsMobile("userMobile");
  const [signUpErrMsg, setSignUpErrMsg] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  /** handles routing of sign up page to sign in page */
  const handleSignInRoute = () => {
    history.push(NonAuthRoutes.signin);
  };

  /** handles routing to Home page */
  const handleHomeRoute = () => {
    history.push(NonAuthRoutes.signin);
  };

  /** handles FirstName form input transition */
  const handleFirstnameTransition = (text) => {
    setFirstname(text);
    if (text !== "") {
      setInputFirstnameActive(true);
    } else {
      setInputFirstnameActive(false);
    }
  };

  /** handles LastName form input transition */
  const handleLastnameTransition = (text) => {
    setLastname(text);
    if (text !== "") {
      setInputLastnameActive(true);
    } else {
      setInputLastnameActive(false);
    }
  };

  /** handles Email form input transition */
  const handleEmailTransition = (text) => {
    setEmail(text);
    if (text !== "") {
      setInputEmailActive(true);
    } else {
      setInputEmailActive(false);
    }
  };

  /** handles Password form input transition */
  const handlePasswordTransition = (text) => {
    setPassword(text);
    if (text !== "") {
      setInputPasswordActive(true);
    } else {
      setInputPasswordActive(false);
    }
  };

  /** handles Password visibility */
  const handleShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  /** handles Password Validation form input transition */
  const handlePasswordValidateTransition = (text) => {
    setPasswordValidate(text);
    if (text !== "") {
      setInputPasswordValActive(true);
    } else {
      setInputPasswordValActive(false);
    }
  };

  /** handles Password Validation, User Sign Up and then routes User to Sign In page */
  const handleSignUp = (e) => {
    setBtnIsLoading(true);
    e.preventDefault();
    // Password Validator
    if (password !== passwordValidate) {
      setPasswordErrMsg(true);
    } else {
      // make Create User API call
      onboarding
        .SignUp(firstName, lastName, email, password)
        .then((response) => {
          console.log("👍 Backend Sever is Available!", response);
          if (response.status === 201) {
            history.push(NonAuthRoutes.signin);
            console.log("👍 sign up was successful", response);
          }
        })
        .catch((error) => console.log(error));
      setSignUpErrMsg(true);
      setTimeout(() => {
        setBtnIsLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="onboarding">
      <div
        className={
          screenIsMobile === "true" ? "onboarding-mobile" : "onboarding-desktop"
        }
      >
        <img
          src={LogoBlack}
          onClick={handleHomeRoute}
          className={screenIsMobile === "true" ? "logo-mobile" : "hidden"}
          alt="Eventio Logo Black"
        />
        <header
          className={
            screenIsMobile === "true"
              ? "header-text-mobile"
              : "header-text-desktop"
          }
        >
          <h2>Get started absolutely free.</h2>
          {signUpErrMsg || passwordErrMsg ? (
            <h5 style={{ color: "red" }}>
              Oops! Your Details or Password combination is not valid.
            </h5>
          ) : (
            <h5>Enter your details below.</h5>
          )}
        </header>
        <form id="signup" onSubmit={handleSignUp}>
          <div className="onboarding-form">
            <input
              required
              type="text"
              className="onboarding-input"
              value={firstName}
              onChange={(e) => handleFirstnameTransition(e.target.value)}
            />
            <label
              htmlFor="fistname"
              className={inputFirstnameActive ? "Active" : ""}
            >
              First Name
            </label>
          </div>
          <div className="onboarding-form">
            <input
              required
              type="text"
              className="onboarding-input"
              value={lastName}
              onChange={(e) => handleLastnameTransition(e.target.value)}
            />
            <label
              htmlFor="Lastname"
              className={inputLastnameActive ? "Active" : ""}
            >
              Last Name
            </label>
          </div>
          <div className="onboarding-form">
            <input
              required
              type="email"
              className="onboarding-input"
              value={email}
              onChange={(e) => handleEmailTransition(e.target.value)}
            />
            <label htmlFor="email" className={inputEmailActive ? "Active" : ""}>
              E-mail
            </label>
          </div>
          <div className="onboarding-form">
            <div className="onboarding-input-password2">
              <input
                required
                type={showPassword ? "text" : "password"}
                className="onboarding-input"
                value={password}
                onChange={(e) => handlePasswordTransition(e.target.value)}
              />
              <label htmlFor="" className={inputPasswordActive ? "Active" : ""}>
                Password
              </label>
              <MdRemoveRedEye
                className="onboarding-input-icon"
                onClick={handleShowPassword}
              />
            </div>
          </div>
          <div className="onboarding-form">
            <div className="onboarding-input-password">
              <input
                required
                type={showPassword ? "text" : "password"}
                className="onboarding-input"
                value={passwordValidate}
                onChange={(e) =>
                  handlePasswordValidateTransition(e.target.value)
                }
              />
              <label
                htmlFor=""
                className={inputPasswordValActive ? "Active" : ""}
              >
                Repeat Password
              </label>
              <MdRemoveRedEye
                className="onboarding-input-icon"
                onClick={handleShowPassword}
              />
            </div>
          </div>
        </form>
        <div
          onClick={handleSignInRoute}
          className={
            screenIsMobile === "true"
              ? "onboarding-signup-text-mobile"
              : "hidden"
          }
        >
          <h5 className="onboarding-signup-text1">Already have an account?</h5>
          <h5 className="onboarding-signup-text2">SIGN IN</h5>
        </div>
        <div style={{ display: "flex" }}>
          <button
            type="submit"
            form="signup"
            value="Submit form"
            className={
              screenIsMobile === "true"
                ? "onboarding-submit-btn-mobile"
                : "onboarding-submit-btn-desktop"
            }
            onClick={handleSignUp}
          >
            {btnIsLoading ? <FiLoader className="btn-loading" /> : "SIGN UP"}
          </button>
        </div>
      </div>
      <div
        onClick={handleSignInRoute}
        className={
          screenIsMobile === "true"
            ? "hidden"
            : "onboarding-signup-text-desktop"
        }
      >
        <h5 className="onboarding-signup-text1">Already have an account?</h5>
        <h5 className="onboarding-signup-text2">SIGN IN</h5>
      </div>
    </div>
  );
}

export default SignUp;
