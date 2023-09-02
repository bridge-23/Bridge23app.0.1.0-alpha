import React, { useState } from 'react';
import { useAddress, useLogin, Web3Button, ConnectWallet } from '@thirdweb-dev/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import styled from 'styled-components';
import Link from 'next/link';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

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
    const { login, isLoading } = useLogin();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsNavOpen(!isNavOpen);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setIsNavOpen(false);
    };

    return (
        <>
            <AppBar position="static" sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={isNavOpen} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>
                            <Link href="/">
                                <Typography style={{ color: 'black' }}>Home</Typography>
                            </Link>
                        </MenuItem>
                        {address && (
                            <MenuItem onClick={handleMenuClose}>
                                <Link href={`/profile/${address}`}>
                                    <Typography style={{ color: 'black' }}>Profile</Typography>
                                </Link>
                            </MenuItem>
                        )}
                        {address && (
                            <MenuItem onClick={handleMenuClose}>
                                <Link href={`/claim/${address}`}>
                                    <Typography style={{ color: 'black' }}>Claim Rewards</Typography>
                                </Link>
                            </MenuItem>
                        )}
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bridge 23
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Button color="inherit">
                            <Link href="/">
                                <Typography>Home</Typography>
                            </Link>
                        </Button>
                        {address && (
                            <Button color="inherit">
                                <Link href={`/profile/${address}`}>
                                    <Typography>Profile</Typography>
                                </Link>
                            </Button>
                        )}
                        {address && (
                            <Button color="inherit">
                                <Link href={`/claim/${address}`}>
                                    <Typography>Claim Rewards</Typography>
                                </Link>
                            </Button>
                        )}
                    </Box>

                    <ConnectWallet theme={"light"}/>

                </Toolbar>
            </AppBar>

            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, display: { xs: 'block', sm: 'none' } }}>

                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Link href="/">
                        <IconButton color="inherit" aria-label="open drawer">
                            <HomeIcon />
                        </IconButton>
                    </Link>

                    {address && (
                    <Link href={`/profile/${address}`}>
                        <IconButton color="inherit" aria-label="open drawer">
                            <AccountBalanceWalletIcon />
                        </IconButton>
                    </Link>
                    )}

                    {address && (
                     <StyledFab color="secondary" aria-label="add">
                        <CenterFocusStrongIcon />
                     </StyledFab>
                    )}

                    {address && (
                    <Link href={`/claim/${address}`}>
                        <IconButton color="inherit" aria-label="open drawer">
                            <CardGiftcardIcon />
                        </IconButton>
                    </Link>
                        )}

                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </>
    );
}








{/*                <div className={styles.navLinks}>
                    {address && (
                        <Link href={'/rewards'}>
                            <p>My rewards</p>
                        </Link>
                    )}
                </div>*/}



