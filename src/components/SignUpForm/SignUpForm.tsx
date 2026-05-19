import { useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import style from "../../pages/SignUp/SignUp.module.css";
import { Link } from "react-router";
import { FaCheck } from "react-icons/fa";
import { useAuthSign } from "../../hooks/mutations/useAuthSign";

type Inputs = {
  email: string;
  password: string;
	username: string;
};

export const SignUpForm = (): JSX.Element => {
  const [typeForPassword, setTypeForPassword] = useState("password");
  const { signUp, isSignedUp, signUpError } = useAuthSign();

  const handlePasswordVisibility = () => {
    if (typeForPassword === "password") setTypeForPassword("text");
    else setTypeForPassword("password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signUp({ email: data.email, password: data.password, username: data.username });
    } catch (error) {}
  };
  return (
    <form className={style.SignUp__form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${style.form__email} ${style.form__input}`}>
        <span className={`${style.form__span}`}>Email address or username</span>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email address or username"
        />

        {errors.email && (
          <span className={style.form__error}>Email field is required</span>
        )}
      </div>

      <div className={`${style.form__username} ${style.form__input}`}>
        <span className={`${style.form__span}`}>Username</span>
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
        />

        {errors.username && (
          <span className={style.form__error}>Username field is required</span>
        )}
      </div>

      <div className={`${style.form__password} ${style.form__input}`}>
        <span className={`${style.form__span}`}>Password</span>
        <input
          type={typeForPassword}
          {...register("password", { required: true, maxLength: 16 })}
          placeholder="Password"
        />

        {typeForPassword === "password" ? (
          <FiEyeOff
            className={`${style.passwordVisibility} ${style.slashEye}`}
            onClick={() => handlePasswordVisibility()}
          />
        ) : (
          <FiEye
            className={style.passwordVisibility}
            onClick={() => handlePasswordVisibility()}
          />
        )}

        {errors.password && (
          <span className={style.form__error}>Password field is required</span>
        )}
      </div>

			{signUpError && (
        <div className={style.form__error}>
          {signUpError.message || "Login failed. Please try again."}
        </div>
      )}

      <Link to={"/"} className={style.form__forgotPassword}>
        Forgot your password?
      </Link>

      <div className={style.form__logIn}>
        <div className={style.logIn__checkbox}>
          <input
            id="checkbox-remember-me"
            type="checkbox"
            className={style.checkbox}
          />
          <label
            htmlFor="checkbox-remember-me"
            className={style.checkbox__label}
          >
            <FaCheck className={style.checkbox__check} />
          </label>
          <label
            htmlFor="checkbox-remember-me"
            className={style.checkbox__span}
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className={style.logIn__btn}
          disabled={isSignedUp}
        >
          {isSignedUp ? "Loggin in..." : "Log in"}
        </button>
      </div>
    </form>
  );
};
