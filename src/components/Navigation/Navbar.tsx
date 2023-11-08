//../src/components/Navbar.tsx
import React, {useContext} from 'react';
import {Hidden} from '@mui/material';
import DesktopNavbar from './DesktopNavbar';
import { AuthContext } from "../../contexts/AuthContext";
import dynamic from "next/dynamic";

const DynamicAppBarUser = dynamic(() => import('./AppBarUser'));
const DynamicMobileNavbar = dynamic(() => import('./MobileNavbar'));

export default function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Hidden smDown> {user ? (<DynamicAppBarUser/>) : (<DesktopNavbar/>)} </Hidden>

            <Hidden mdUp> {user && (<DynamicMobileNavbar/>)} </Hidden>
        </>
    );
}






















