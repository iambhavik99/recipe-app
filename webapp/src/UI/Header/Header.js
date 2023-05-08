import './Header.css';

import { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { AppButton } from '../Button/Button';

import logo from "../../assets/logo.svg";

export const Header = (props) => {
    const { isLoggedInUser } = props.loggedInUserInfo;

    const logout = () => {
        localStorage.clear();
        props.navigate('/login');
    }

    const showLoginButton = () => {
        if (!isLoggedInUser) {
            return (
                <AppButton
                    className='link-button'
                    variant='outlined'
                    onClick={() => props.navigate('/login')}
                    text="Log in"
                />
            );
        }
        else {
            return (
                <AppButton
                    className='link-button'
                    variant='outlined'
                    onClick={logout}
                    text="Log out"
                />
            )
        }
    }

    return (
        <Fragment>
            <AppBar color="transparent" position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar className='header-toolbar'>
                    <div onClick={() => props.navigate('/')}>
                        <div className='header-title' >
                            <img src={logo} alt='logo' className='header-logo' />
                            <div style={{ marginLeft: 8 }}>Recipe</div>
                        </div>
                    </div>
                    <div>{showLoginButton()}</div>
                </Toolbar>
            </AppBar>
        </Fragment >
    );
}