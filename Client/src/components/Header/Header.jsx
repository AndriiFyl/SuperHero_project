import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const getClassname = ({ isActive }) =>
    `${styles.headerLink} ${isActive ? styles.headerLinkActive : ""}`;
  return (
    <div className={`${styles.headerContainerOuter}`}>
      <div className={`${styles.headerContainerInner}`}>
        <NavLink className={getClassname} to="/">
          Home page
        </NavLink>
        <NavLink className={getClassname} to="/createSuperhero">
          Create Superhero
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
