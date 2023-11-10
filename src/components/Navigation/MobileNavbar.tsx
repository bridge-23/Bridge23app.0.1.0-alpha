//..src/components/Navigation/AppBarUser.tsx
import React, {useContext} from 'react';
import {AppBar, Toolbar, IconButton, Menu, MenuItem} from '@mui/material';
import Link from 'next/link';
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import {UploadFab} from "../Buttons/UploadFab";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import {bindMenu, bindTrigger} from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useRouter} from "next/router";
import { usePopupState } from "material-ui-popup-state/hooks";
import { signOut } from '@junobuild/core-peer';
import {AuthContext} from "../../contexts/AuthContext";
function MobileNavbar() {
    const router = useRouter();
    const { userKey } = router.query;
    const { user } = useContext(AuthContext);
    const handleFeedbackClick = () => {
        // For demonstration purposes. Replace with your desired logic.
        alert("Thank you for your feedback!");
        popupState.close();
    };
    const popupState = usePopupState({ variant: 'popover', popupId: 'demo-popup-menu' });

    const handleSignOut = async () => {
        try {
            await signOut(); // Your signOut logic
            console.log("Sign-out successful!");

            // Redirect to the desired path after sign out
            router.push('/'); // Adjust the path as needed

        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    };

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', down: 'auto', bottom: 0, display: { xs: 'block', sm: 'none'} }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '40px', paddingLeft: '30px', paddingRight: '30px' }}>
                {user && (
                <Link href={`/dashboard`}>
                    <IconButton color="inherit" aria-label="open drawer">
                        <HomeIcon fontSize="large"/>
                    </IconButton>
                </Link>
                )}
                {user && (
                    <Link href={`/shoppinglist`}>
                        <IconButton color="inherit" aria-label="open drawer">
                            <FormatListBulletedSharpIcon fontSize="large" />
                        </IconButton>
                    </Link>
                )}
                {user && (
                    <UploadFab />
                )}
                {user && (
                    <Link href={`/rewards`}>
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
    );
}

export default MobileNavbar;
