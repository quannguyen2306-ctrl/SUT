import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/sut_logo.png"

function Auth() {
  return (
    <div className={styles.container}>
      <div className={styles.sut_welcome}>
        <h1>Welcome to SUT</h1>
        {/* <TypeWriterEffect
          textStyle={{
            fontFamily: "Red Hat Display",
            color: "#3F3D56",
            fontWeight: 500,
            fontSize: "1.5em",
          }}
          startDelay={2000}
          cursorColor="#3F3D56"
          multiText={[
            "Sut ngay",
            "Cut ngay",
            "Ung dung dat san the thao hang dau Viet Nam",
            "Fonts can be customized.",
            "The type speed can be customized as well",
          ]}
          loop={true}
          nextTextDelay={1000}
          typeSpeed={40}
        /> */}
      </div>
      <div className={styles.auth_box}>
        <div className={styles.heading}>Sign Up</div>
        <form action="" className={styles.form}>
          <input
            type="email"
            required=""
            className={styles.inputIn4}
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <input
            type="password"
            required=""
            className={styles.inputIn4}
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          <span className={styles.signInOption}>
            <Link to="/">Or sign in?</Link>
          </span>
          <input
            type="submit"
            value="Sign up"
            className={styles.signInButton}
          />
          
        </form>
      </div>
    </div>
  );
}

export default Auth;
