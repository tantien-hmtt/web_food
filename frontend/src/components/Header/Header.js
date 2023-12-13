import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import classes from "./header.module.css";
import { useAuth } from "../../hooks/useAuth";


export default function Header() {
  const { user, logout } = useAuth();

  

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          <h3>HomePage</h3>
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <a onClick={logout}>Đăng xuất</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}

            
          </ul>
        </nav>
      </div>
    </header>
  );
}
