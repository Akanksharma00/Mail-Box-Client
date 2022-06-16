import React from "react";
import yahooLogo from '../Asset/yahooLogo.png';
import userIcon from '../Asset/icon.png';

import { useDispatch } from "react-redux";
import { authActions } from "../store/authReducer";

import '../Style/Header.css';

const Header = (props) => {
    const dispatch = useDispatch();
    const email = localStorage.getItem('email');
    const string = email.split('@');
    const username = string[0];

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(authActions.logout());
    }

    return (
        <section className='header'>
            <div className='header-logo'>
                <img src={yahooLogo} className='logo-img'/>
                <h1 className='logo-name'> MAIL BOX</h1>
            </div>
            <div className='header-username'>
                <img src={userIcon} className='icon' />
                <span className='username'>{username}</span>
                <button className='btn' onClick={logoutHandler}>Logout</button>
            </div>
        </section>
    );
};

export default Header;
