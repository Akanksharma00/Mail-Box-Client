import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import '../Style/Navbar.css';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const isLoggedIn = !!token;

    const noOfUnreadMail = useSelector(state => state.mail.noOfUnreadMail);
    let hasNewMails = false;
    if(noOfUnreadMail !== 0){
        hasNewMails = true;
    }

    return(
        <nav className='navbar'>
            <ul>
                {isLoggedIn && <li>
                    <NavLink to='/inbox' className='navlink'>
                        Inbox
                        {hasNewMails && <span className='badge'>{noOfUnreadMail}</span>}
                    </NavLink>
                </li>}
                {isLoggedIn && <li>
                    <NavLink to='/compose' className='navlink'>Compose</NavLink>
                </li>}
                {/* {isLoggedIn && <li>
                    <NavLink to='/starred' className='navlink'>Starred</NavLink>
                </li>} */}
                {isLoggedIn && <li>
                    <NavLink to='/sent' className='navlink'>Sent</NavLink>
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