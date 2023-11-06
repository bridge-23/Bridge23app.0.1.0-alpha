//../src/components/Navbar.tsx
import React, {useContext} from 'react';
import {CircularProgress, Hidden} from '@mui/material';
import AppBarUser from './AppBarUser';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
    const authContext = useContext(AuthContext);

    // Make sure authContext is not undefined by checking its existence
    if (!authContext) {
        // Handle the case where authContext is not provided, such as showing a loading spinner or error message
        return <CircularProgress />;
    }

    // Destructure the values needed from authContext after confirming its existence
    const { user, setBusy } = authContext;

    return (
        <>
            <Hidden smDown> {user ? (<AppBarUser/>) : (<DesktopNavbar/>)} </Hidden>

            <Hidden mdUp> {user && (<MobileNavbar/>)} </Hidden>
        </>
    );
}






















