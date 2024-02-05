//..src/components/Navigation/AppBarUser.tsx
import React, {useContext} from 'react';
import {AppBar, Toolbar, IconButton, Menu, MenuItem, Fab, Dialog, useMediaQuery, Drawer} from '@mui/material';
import Link from 'next/link';
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import {bindMenu, bindTrigger} from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChecklistIcon from '@mui/icons-material/Checklist';
import {useRouter} from "next/router";
import { usePopupState } from "material-ui-popup-state/hooks";
import { signOut } from '@junobuild/core-peer';
import {AuthContext} from "../../contexts/AuthContext";
import TransactionList from './TransactionList';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {useTheme} from "@mui/material/styles";
function MobileNavbar() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleModalOpen = () => {
        setDialogOpen(true);
    };
    const handleModalClose = () => {
        setDialogOpen(false);
    };
    const handleFeedbackClick = () => {
        popupState.close(); // Close the popup menu
        window.open('https://cko8sv40a0v.typeform.com/to/HfkJUBdq', '_blank'); // Replace 'YOUR_FEEDBACK_FORM_URL' with your actual feedback form URL
    };

    const popupState = usePopupState({ variant: 'popover', popupId: 'demo-popup-menu' });
    const handleProfileClick = () => {
        popupState.close(); // Close the popup, if necessary
        router.push('/profile'); // Navigate to /profile
    };
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
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', down: 'auto', bottom: 0, zIndex: 500, display: { xs: 'block', sm: 'none'} }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '40px', paddingLeft: '30px', paddingRight: '30px' }}>
                {user && (
                <Link href={`/`}>
                    <IconButton color="inherit" aria-label="open drawer">
                        <HomeIcon fontSize="large"/>
                    </IconButton>
                </Link>
                )}
                {user && (
                    <Link href={`/transactions`}>
                        <IconButton color="inherit" aria-label="open drawer">
                            <FormatListBulletedSharpIcon fontSize="large" />
                        </IconButton>
                    </Link>
                )}
                {user && (
                    <Fab
                        size="large"
                        color="secondary"
                        aria-label="add"
                        onClick={handleModalOpen}
                        sx={{ position: 'relative', bottom: '25px' }}
                    >
                        <ReceiptIcon />
                    </Fab>
                )}
{/*                {user && (
                    <UploadFab />
                )}*/}
                {user && (
                    <Link href={`/magiclists`}>
                        <IconButton color="inherit" aria-label="open drawer">
                            <ChecklistIcon fontSize="large" />
                        </IconButton>
                    </Link>
                )}
                {user && (
                    <>
                        <IconButton color="inherit" {...bindTrigger(popupState)}>
                            <MoreVertIcon fontSize="large" />
                        </IconButton>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                            <MenuItem onClick={popupState.close}>Support</MenuItem>
                            <MenuItem onClick={() => {
                                popupState.close();
                                window.open('https://cko8sv40a0v.typeform.com/to/HfkJUBdq', '_blank');
                            }}>Feedback</MenuItem>


                            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
                <Drawer
                    anchor="bottom"
                    open={dialogOpen}
                    onClose={handleModalClose}
                    sx={{
                        '& .MuiDrawer-paper': {
                            borderTopLeftRadius: '24px',
                            borderTopRightRadius: '24px',
                            paddingBottom: '300px',
                        },
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <TransactionList/>
                </Drawer>
        </AppBar>
    );
}
export default MobileNavbar;
