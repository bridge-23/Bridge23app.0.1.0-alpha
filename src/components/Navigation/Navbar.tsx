//../src/components/Navbar.tsx
import React, {useContext} from 'react';
import {Hidden} from '@mui/material';
import useFirebaseUser from "../../lib/FireBase/useFirebaseUser";
import AppBarUser from './AppBarUser';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
    //const { user } = useFirebaseUser();
    const { user } = useContext(AuthContext);

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






















