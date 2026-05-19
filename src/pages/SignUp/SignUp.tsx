import { type JSX } from "react";
import style from "./SignUp.module.css";
import { Link } from "react-router";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

export const SignUp = (): JSX.Element => {
  return (
    <div className={style.SignUp}>
      <header className={style.SignUp__header}>
        <img
          className={style.logo}
          src="./images/signInLogo.png"
          alt=""
        />
      </header>

      <main className={style.SignUp__main}>
        <div className={style.SignUp__fastSignIn}>
          <div
            className={`${style.fastSignIn__facebook} ${style.fastSignIn__btn}`}
          >
            <FaFacebook className={style.fackebookIcon} /> Continue with
            Facebook
          </div>

          <div
            className={`${style.fastSignIn__apple} ${style.fastSignIn__btn}`}
          >
            <FaApple className={style.appleIcon} /> Continue with Apple
          </div>

          <div
            className={`${style.fastSignIn__google} ${style.fastSignIn__btn}`}
          >
            <FaGoogle className={style.googleIcon} /> Continue with Google
          </div>
        </div>

        <SignUpForm />

        <div className={style.SignUp__signIn}>
          <span className={style.signUp__span}>Don't have an account?</span>
          <Link to={"/sign-up"} className={style.signUp_btn}>
            Sign up for Spotify
          </Link>
        </div>
      </main>
    </div>
  );
};
