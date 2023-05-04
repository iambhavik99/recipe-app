import './Header.css';

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { AppButton } from '../Button/Button';

export const Header = (props) => {

    const [isLoggedInUser, setStatus] = useState(true);

    useEffect(() => {
        setStatus(!!localStorage.getItem('access_token'));
    }, [])

    const onClickHandler = () => {
        props.navigate('/login')
    }

    return (
        <React.Fragment>
            <AppBar color="transparent" position={'relative'}>
                <Toolbar className='header-toolbar'>
                    <div className='header-title' onClick={() => props.navigate('/')}>
                        Recipes
                    </div>
                    <div>
                        {
                            isLoggedInUser ? '' : <AppButton
                                className='secondary-button'
                                variant='outlined'
                                onClick={onClickHandler}
                                text="Log in"
                            />

                        }
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment >
    );
}