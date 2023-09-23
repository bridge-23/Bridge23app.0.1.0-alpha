//../src/components/Navbar.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAddress } from '@thirdweb-dev/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import {auth, db} from "../lib/initFirebase";
import useFirebaseUser from "../lib/useFirebaseUser";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { UploadFab } from './Buttons/UploadFab';

//TODO: Add a link to the chat page
//TODO: Make component for upload button
//TODO: Make button more for mobile and add here chat, logout, profile, await upload, etc..

export default function Navbar() {
    const address = useAddress();
    const { user } = useFirebaseUser();
    const router = useRouter();
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
                                <Link href={`/rewards/${address}`}>
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
                                <FormatListBulletedSharpIcon fontSize="large" />
                            </IconButton>
                        </Link>
                    )}

                    {user && (
                        <UploadFab />
                    )}

                    {user && (
                        <Link href={`/rewards/${address}`}>
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











