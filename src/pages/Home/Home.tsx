import type { JSX } from "react";
import { NavMenuSide } from "../../components/NavMenuSide/NavMenuSide";
import style from "./Home.module.css";
import { HomeMain } from "../../components/HomeMain/HomeMain";

export const Home = (): JSX.Element => {
  
  return (
    <div className={style.Home}>
      <NavMenuSide />
      <HomeMain />
    </div>
  );
};
