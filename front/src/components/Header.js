import React from 'react';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';

import { goToLogin } from '../utils';

function Header() {
    return (
        <header>
            <AppBar title='Web lab 4'>
                <Navigation>
                    <Link active label='Logout' onClick={logout} />          
                </Navigation>
            </AppBar>
        </header>
    );
}

function logout() {
    window.localStorage.removeItem("jwt-token");

    goToLogin();
}

export default Header;