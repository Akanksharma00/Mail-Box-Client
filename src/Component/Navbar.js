import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import '../Style/Navbar.css';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const isLoggedIn = !!token;

    

    return(
        <nav className='navbar'>
            <ul>
                {isLoggedIn && <li>
                    <NavLink to='/inbox'>Inbox</NavLink>
                </li>}
                {isLoggedIn && <li>
                    <NavLink to='/compose'>Compose</NavLink>
                </li>}
                {isLoggedIn && <li>
                    <NavLink to='/sent'>Sent</NavLink>
                </li>}
                <li>
                    {!isLoggedIn && <NavLink to='/signUp'>SignUp</NavLink>}
                </li>
                <li>
                    {!isLoggedIn && <NavLink to='/login'>Login</NavLink>}
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;