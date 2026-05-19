import { type JSX } from "react";
import style from "./NavMenuSide.module.css";
import { Link, useLocation } from "react-router";
import { FiSearch } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { LuLibrary } from "react-icons/lu";
import { AiFillPlusSquare } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";

export const NavMenuSide = (): JSX.Element => {
  const { pathname } = useLocation();
  const activeNav = pathname.slice(1, pathname.length).toLowerCase();

  return (
    <div className={style.NavMenuSide}>
      <header className={style.NavMenuSide__header}>
        <Link to={"/"}>
          <img src="./images/logo.png" alt="logo" />
        </Link>
      </header>

      <nav className={style.NavMenuSide__nav}>
        <Link
          to={"/"}
          className={`${style.nav__link} ${style.link_home} ${activeNav === "" ? style.activeLink : ""}`}
        >
          <GoHomeFill className={`${style.nav__icon} ${style.home__icon}`} />
          Home
        </Link>

        <Link
          to={"/search"}
          className={`${style.nav__link} ${style.link_search} ${activeNav === "search" ? style.activeLink : ""}`}
        >
          <FiSearch className={`${style.nav__icon} ${style.search__icon}`} />
          Search
        </Link>

        <Link
          to={"/library"}
          className={`${style.nav__link} ${style.link_yourLibrary}`}
        >
          <LuLibrary
            className={`${style.nav__icon} ${style.library__icon} ${activeNav === "library" ? style.activeLink : ""}`}
          />
          Your Libary
        </Link>
      </nav>

      <div className={style.NavMenuSide__actions}>
        <Link
          to={"/"}
          className={`${style.actions__link} ${style.action__createPlaylist}`}
        >
          <AiFillPlusSquare className={style.createPlaylist__icon} />
          <span className={style.action__span}>Create Playlist</span>
        </Link>
        <Link
          to={"/"}
          className={`${style.actions__link} ${style.action__likedSongs}`}
        >
          <FaHeart className={style.likedSongs__icon} />
          <span className={style.action__span}>Liked Songs</span>
        </Link>
      </div>

      <div className={style.NavMenuSide__langSwap}>
        <div className={style.langSwap__action}>
          <GrLanguage className={style.langSpwap__icon} />
          <span className={style.langSwap__span}>English</span>
        </div>
      </div>
    </div>
  );
};
