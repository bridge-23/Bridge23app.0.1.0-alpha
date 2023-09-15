//../src/components/Navbar.tsx
import React, { useState } from 'react';
import { useAddress, ConnectWallet, useAuth } from '@thirdweb-dev/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, CardActions, Fab} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

import initializeFirebaseClient from "../lib/initFirebase";
import { getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithCustomToken, signOut } from "firebase/auth";
import useFirebaseUser from "../lib/useFirebaseUser";
import { useRouter } from 'next/router';

import Link from 'next/link';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export default function Navbar() {
    const address = useAddress();
    const { user } = useFirebaseUser();
    const {auth, db} = initializeFirebaseClient();
    const router = useRouter();

    console.log("Address:", address);
    console.log("User:", user);

    const logUserAction = async (action: 'login' | 'logout', uid: string) => {
        try {
            const logRef = doc(db, 'logins', uid);
            await setDoc(logRef, {
                action: action,
                timestamp: serverTimestamp()
            }, { merge: true });
            router.push('/');
        } catch (error) {
            console.error("Error logging user action:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            if (user && user.uid) {
                logUserAction('logout', user.uid);
                console.log(`User with ID: ${user.uid} has logged out at ${new Date().toISOString()}`);
            }
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bridge 23
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Button color="inherit">
                            <Link href="/">
                                <Typography>Home</Typography>
                            </Link>
                        </Button>

                        {user && (
                            <Button color="inherit">
                                <Link href={`/profile/${address}`}>
                                    <Typography>Profile</Typography>
                                </Link>
                            </Button>
                        )}
                        {user && (
                            <Button color="inherit">
                                <Link href={`/claim/${address}`}>
                                    <Typography>Claim Rewards</Typography>
                                </Link>
                            </Button>
                        )}
                        {user && (
                            <Button color="inherit">
                                <Link href={`/chat`}>
                                    <Typography>Chat</Typography>
                                </Link>
                            </Button>
                        )}
                    </Box>

                    { user ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    ) : null }
                </Toolbar>

            </AppBar>

            <AppBar position="fixed" color="primary" sx={{ top: 'auto', down: 'auto', bottom: 0, display: { xs: 'block', sm: 'none' } }}>

                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Link href="/">
                        <IconButton color="inherit" aria-label="open drawer">
                            <HomeIcon fontSize="large"/>
                        </IconButton>
                    </Link>

                    {user && (
                        <Link href={`/profile/${address}`}>
                            <IconButton color="inherit" aria-label="open drawer">
                                <AccountBalanceWalletIcon fontSize="large" />
                            </IconButton>
                        </Link>
                    )}

                    {user && (
                        <StyledFab color="secondary" aria-label="add">
                            <a href="/chat" target="_blank" rel="noopener noreferrer">
                                <CenterFocusStrongIcon fontSize="large"/>
                            </a>
                        </StyledFab>
                    )}

                    {user && (
                        <Link href={`/claim/${address}`}>
                            <IconButton color="inherit" aria-label="open drawer">
                                <CardGiftcardIcon fontSize="large"/>
                            </IconButton>
                        </Link>
                    )}

                    { user && (
                        <IconButton color="inherit" onClick={handleSignOut}>
                            <LogoutIcon fontSize="large" />
                        </IconButton>
                    )}

                </Toolbar>
            </AppBar>
        </>
    );
}











