import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import style from './Navbar.module.css';
import { authActions } from "../store/authReducer";

const Navbar = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return(
        <nav className={style.navbar}>
            <ul className={style.navList}>
                {isLoggedIn && <li className={style.navListItem}>
                    <NavLink to='/inbox'>Inbox</NavLink>
                </li>}
                {isLoggedIn && <li className={style.navListItem}>
                    <NavLink to='/compose'>Compose</NavLink>
                </li>}
                <li className={style.navListItem}>
                    {!isLoggedIn && <NavLink to='/signUp'>SignUp</NavLink>}
                </li>
                <li className={style.navListItem}>
                    {!isLoggedIn && <NavLink to='/login'>Login</NavLink>}
                    {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;