import { useEffect, type JSX } from "react";
import { NavMenuSide } from "../../components/NavMenuSide/NavMenuSide";
import { useAuthSign } from "../../hooks/mutations/useAuthSign";
import style from "./Profile.module.css";

export const Profile = (): JSX.Element => {
  const { user, isFetchingMe, refetchMe } = useAuthSign();

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

  return (
    <div className={style.Profile}>
      <NavMenuSide />
      <div className={style.Profile__user}>
        <span>{user.id}</span>
        <span>{user.email}</span>
        <span>{user.username}</span>
      </div>
    </div>
  );
};
