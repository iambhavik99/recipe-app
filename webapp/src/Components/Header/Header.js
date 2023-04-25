import './Header.css';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useNavigate } from 'react-router-dom';


export const Header = () => {

    const navigation = useNavigate({});

    return (
        <React.Fragment>
            <AppBar color="transparent" position={'relative'}>
                <Toolbar className='header-toolbar'>
                    <div className='header-title' onClick={() => navigation('/')}>
                        Recipes
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment >
    );
}