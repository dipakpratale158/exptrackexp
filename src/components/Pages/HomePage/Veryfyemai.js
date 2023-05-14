import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./Home.module.css";
import { NavLink } from "react-router-dom";
import './profile.css'
const Home = () => {
  const token = useSelector((state) => state.auth.token);
  console.log("in home", token);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.users[0].emailVerified) {
          setIsVerified(true);
        }
      })
      .catch((err) => {
        let errorMessage = "failed to get details please logout and login again";
        // alert(errorMessage);
        // throw new Error(err.message);
      });
  }, [token]);
//emqail verifiation
  const VerifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        let errorMessage = "failed to verify";
        alert(errorMessage);
        throw new Error(err.message);
      });
  };
  return (
    <Fragment>
      <h1 className={classes.title}>Welcome Profile</h1>


      {/* if email already verify not showing veryfy button */}
      {!isVerified && (
        <div>
          <button onClick={VerifyEmailHandler}>Verify email</button>
        </div>
      )}



{/* user profile  */}
            <h4 className={classes.incompleteProfile}> Your profile is incomplete</h4>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home/userDetails"
            >
              <h3 className={classes.navlink}>complete now</h3>
            </NavLink>
        
    </Fragment>
  );
};

export default Home;