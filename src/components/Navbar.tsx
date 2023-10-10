//../src/components/Navbar.tsx
import React from 'react';
import {Hidden} from '@mui/material';
import useFirebaseUser from "../lib/useFirebaseUser";
import AppBarUser from './Navigation/AppBarUser';
import DesktopNavbar from './Navigation/DesktopNavbar';
import MobileNavbar from './Navigation/MobileNavbar';

export default function Navbar() {
    const { user } = useFirebaseUser();
    return (
        <>
            <Hidden smDown>
            {user ? (
                <AppBarUser/>
            ) : (
                <DesktopNavbar/>
            )}
            </Hidden>

            <Hidden mdUp>
            {user && (
                <MobileNavbar/>
            )}
            </Hidden>
        </>
    );
}






















