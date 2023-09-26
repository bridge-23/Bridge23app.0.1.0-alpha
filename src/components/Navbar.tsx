//../src/components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import {auth, db} from "../lib/initFirebase";
import useFirebaseUser from "../lib/useFirebaseUser";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { UploadFab } from './Buttons/UploadFab';
import ThemeToggleButton from './Buttons/ThemeToggleButton';
import {usePopupState} from "material-ui-popup-state/hooks";

//TODO: Delete chat
//TODO: Make PopipState

export default function Navbar() {
    const address = useAddress();
    const { user } = useFirebaseUser();
    const router = useRouter();
    const handleFeedbackClick = () => {
        // For demonstration purposes. Replace with your desired logic.
        alert("Thank you for your feedback!");
        popupState.close();
    };
    const popupState = usePopupState({ variant: 'popover', popupId: 'demo-popup-menu' });
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
                                <Link href={`/rewards/${address}`}>
                                    <Typography>Support</Typography>
                                </Link>
                            </Button>
                        )}
                    </Box>
                    <ThemeToggleButton />
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
            {user && (
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

                    {user && (
                        <>
                            <IconButton color="inherit" {...bindTrigger(popupState)}>
                                <MoreVertIcon fontSize="large" />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>Profile</MenuItem>
                                <MenuItem onClick={popupState.close}>Support</MenuItem>
                                <MenuItem onClick={handleFeedbackClick}>FeedBack</MenuItem>
                                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}

                </Toolbar>
            </AppBar>
            )}
        </>
    );
}











