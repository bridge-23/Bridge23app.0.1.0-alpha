//../src/components/Navbar.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAddress } from '@thirdweb-dev/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Fab} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddIcon from '@mui/icons-material/Add';
import initializeFirebaseClient from "../lib/initFirebase";
import useFirebaseUser from "../lib/useFirebaseUser";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

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
                            <Link href={`/dashboard/${address}`}>
                                <Typography>Dashboard</Typography>
                            </Link>
                        </Button>
                        )}
                        {user && (
                            <Button color="inherit">
                                <Link href={`/transactions/${address}`}>
                                    <Typography>Transactions</Typography>
                                </Link>
                            </Button>
                        )}
                        {user && (
                            <Button color="inherit">
                                <Link href={`/rewards`}>
                                    <Typography>Rewards</Typography>
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

            <AppBar position="fixed" color="primary" sx={{ top: 'auto', down: 'auto', bottom: 0, display: { xs: 'block', sm: 'none'} }}>

                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '40px', paddingLeft: '30px', paddingRight: '30px' }}>

                    <Link href={`/dashboard/${address}`}>
                        <IconButton color="inherit" aria-label="open drawer">
                            <HomeIcon fontSize="large"/>
                        </IconButton>
                    </Link>

                    {user && (
                        <Link href={`/transactions/${address}`}>
                            <IconButton color="inherit" aria-label="open drawer">
                                <AccountBalanceWalletIcon fontSize="large" />
                            </IconButton>
                        </Link>
                    )}

                    {user && (
                        <StyledFab color="secondary" aria-label="add">
                            <a href="/chat" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AddIcon fontSize="large"/>
                            </a>
                        </StyledFab>
                    )}

                    {user && (
                        <Link href={`/rewards`}>
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











