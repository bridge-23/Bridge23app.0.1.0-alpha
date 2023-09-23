//../src/components/Navbar.tsx
import React, {useRef, useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAddress } from '@thirdweb-dev/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Fab} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import {auth, db, storage} from "../lib/initFirebase";
import useFirebaseUser from "../lib/useFirebaseUser";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import {ref, uploadBytes} from "firebase/storage";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

//TODO: Add a link to the chat page
//TODO: Make component for upload button
//TODO: Make button more for mobile and add here chat, logout, profile, await upload, etc..

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

    const fileRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleUpload = async () => {
        const user = auth.currentUser;
        if (!user) {
            setMessage('Please sign in to upload.');
            setOpen(true);
            return;
        }

        const files = fileRef.current?.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const storageFileRef = ref(storage, `bills/${user.uid}/${file.name}`);
                await uploadBytes(storageFileRef, file);
            }
            setMessage(`${files.length} files uploaded successfully!`);
            setOpen(true);
        } else {
            setMessage('Please select files to upload.');
            setOpen(true);
        }
    };

    const triggerFileSelect = () => {
        fileRef.current?.click();
    };

    const handleClose = (
        event: React.SyntheticEvent<any, Event> | Event,
        reason: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
        setOpen(false);
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
                        <>
                            <StyledFab color="secondary" aria-label="add" onClick={triggerFileSelect}>
                                <ReceiptIcon fontSize="large"/>
                                <input
                                    type="file"
                                    multiple
                                    ref={fileRef}
                                    onChange={handleUpload}
                                    style={{ display: 'none' }}
                                />
                            </StyledFab>

                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
                                    {message}
                                </Alert>
                            </Snackbar>
                        </>
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











