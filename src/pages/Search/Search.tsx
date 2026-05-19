import type { JSX } from "react";
import { NavMenuSide } from "../../components/NavMenuSide/NavMenuSide";
import style from './Search.module.css'

export const Search = (): JSX.Element => {
  return (
    <div className={style.Search}>
      <NavMenuSide />
      <h1>Search</h1>
    </div>
  );
};
