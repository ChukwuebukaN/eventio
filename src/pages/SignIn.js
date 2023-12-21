import React, { useEffect, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import onboarding from "../api/onboarding";
import { signedInUser, signinUser } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import authHandler from "../authHandler";
import LogoBlack from "../images/LogoBlack.png";
import { AuthRoutes, NonAuthRoutes } from "../constants";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userIsSignedIn = useSelector(signedInUser);
  const [showPassword, setShowPassword] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInErrMsg, setSignInErrMsg] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const screenIsMobile = authHandler.getUserIsMobile("userMobile");

  /** UseEffect to handle Signed In user in redirected to Dashboard  */
  useEffect(() => {
    const ac = new AbortController();

    if (userIsSignedIn !== "true") return;

    return function cleanup() {
      ac.abort();
    };
  }, [history, userIsSignedIn]);

  /** handles routing of sign in page to sign up page */
  const handleSignUpRoute = () => {
    history.push(NonAuthRoutes.signup);
  };

  /** handles routing to Home page */
  const handleHomeRoute = () => {
    history.push(NonAuthRoutes.signin);
  };

  /** handles password visibility */
  const handleShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  /** handles email form input transition */
  const handleEmailTransition = (text) => {
    setEmail(text);
    if (text !== "") {
      setInputEmailActive(true);
    } else {
      setInputEmailActive(false);
    }
  };

  /** handles password form input transition */
  const handlePasswordTransition = (text) => {
    setPassword(text);
    if (text !== "") {
      setInputPasswordActive(true);
    } else {
      setInputPasswordActive(false);
    }
  };

  /** handles Tokenization, User Sign In and Stores the token to Redux and localStorage*/
  const handleSignIn = (e) => {
    e.preventDefault();
    setBtnIsLoading(true);
    history.push(AuthRoutes.dashboard);
    try {
      onboarding
        .SignIn(email, password)
        .then((response) => {
          console.log("👍 Backend Server is Available!", response);
          let accessToken = response.headers["authorization"];
          dispatch(
            signinUser({
              token: accessToken,
              isSignedIn: "true",
            })
          );
          authHandler.handle(accessToken);
          localStorage.setItem("isSignedIn", true);
          let id = response.data.id;
          let firstName = response.data.firstName;
          let lastName = response.data.lastName;
          let email = response.data.email;
          let name = [firstName, lastName].join(" ");
          authHandler.setUserInfo(id, firstName, lastName, email, name);
          console.log("👍 user info Saved!");
          if (response.status === 201) {
            setBtnIsLoading(false);
          }
          history.push(AuthRoutes.dashboard);
          console.log("👍 sign in was successful");
        })
        .catch((error) => setSignInErrMsg(true));
      setTimeout(() => {
        setBtnIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
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
          <h2>Sign in to Eventio.</h2>
          {signInErrMsg ? (
            <h5 style={{ color: "red" }}>
              Oops! That email and pasword combination is not valid.
            </h5>
          ) : (
            <h5>Enter your details below.</h5>
          )}
        </header>
        <form id="signin" onSubmit={handleSignIn}>
          <div className="onboarding-form">
            <input
              type="email"
              className="onboarding-input"
              required
              value={email}
              onChange={(e) => handleEmailTransition(e.target.value)}
            />
            <label htmlFor="email" className={inputEmailActive ? "Active" : ""}>
              E-Mail
            </label>
          </div>
          <div className="onboarding-form">
            <div className="onboarding-input-password">
              <input
                type={showPassword ? "text" : "password"}
                className="onboarding-input"
                required
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
        </form>
        <div
          onClick={handleSignUpRoute}
          className={
            screenIsMobile === "true"
              ? "onboarding-signup-text-mobile"
              : "hidden"
          }
        >
          <h5 className="onboarding-signup-text1">Don’t have an account?</h5>
          <h5 className="onboarding-signup-text2">SIGN UP</h5>
        </div>
        <div style={{ display: "flex" }}>
          <button
            type="submit"
            form="signin"
            value="Submit form"
            className={
              screenIsMobile === "true"
                ? "onboarding-submit-btn-mobile"
                : "onboarding-submit-btn-desktop"
            }
            onClick={handleSignIn}
          >
            {btnIsLoading ? <FiLoader className="btn-loading" /> : "SIGN IN"}
          </button>
        </div>
      </div>
      <div
        onClick={handleSignUpRoute}
        className={
          screenIsMobile === "true"
            ? "hidden"
            : "onboarding-signup-text-desktop"
        }
      >
        <h5 className="onboarding-signup-text1">Don’t have an account?</h5>
        <h5 className="onboarding-signup-text2">SIGN UP</h5>
      </div>
    </div>
  );
}

export default SignIn;
