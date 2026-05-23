import { useEffect, type JSX } from "react";
import { NavMenuSide } from "../../components/NavMenuSide/NavMenuSide";
import { useAuthSign } from "../../hooks/mutations/useAuthSign";
import style from "./Profile.module.css";

export const Profile = (): JSX.Element => {
  const { user, isFetchingMe, refetchMe, logout } = useAuthSign();

  useEffect(() => {
    if (!user && !isFetchingMe) {
      refetchMe();
    }
  }, []);

  if (isFetchingMe) {
    return (
      <>
        <NavMenuSide />
        <div>Loading profile...</div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <NavMenuSide />
        <div>User not found. Please login.</div>
      </>
    );
  }

  const handleLogout = () => {
    logout();
    return;
  };

  return (
    <div className={style.Profile}>
      <NavMenuSide />
      <div className={style.Profile__user}>
        <div className={style.user__topInfo}>
          <div className={style.info__avatar}>{user.username.charAt(0)}</div>
          <h2 className={style.info__username}>{user.username}</h2>
        </div>

        <div className={style.user__bottomInfo}>
          <div className={style.info__email}>
            <span className={style.email__span}>Email: </span>
            <p className={style.email}>{user.email}</p>
          </div>

          <div className={style.info__description}>More info</div>
        </div>

        <button className={style.logoutBtn} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
};
