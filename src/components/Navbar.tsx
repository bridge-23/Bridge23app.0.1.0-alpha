import React, { useState } from 'react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import  Link  from "next/link";

export default function Navbar() {
    const address = useAddress();
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
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                    <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={isNavOpen} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/">
                            <Typography>Home</Typography>
                        </Link>
                    </MenuItem>
                    {address && (
                        <MenuItem onClick={handleMenuClose}>
                            <Link href={`/profile/${address}`}>
                                <Typography>Profile</Typography>
                            </Link>
                        </MenuItem>
                    )}
                    {address && (
                        <MenuItem onClick={handleMenuClose}>
                            <Link href={`/claim/${address}`}>
                                <Typography>Claim Rewards</Typography>
                            </Link>
                        </MenuItem>
                    )}
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Logo
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button color="inherit">
                        <Link href="/">
                            <Typography>Home</Typography>
                        </Link>
                    </Button>
                    {address && (
                        <Button color="inherit">
                            <Link href={`profile/${address}`}>
                                <Typography>Profile</Typography>
                            </Link>
                        </Button>
                    )}
                    {address && (
                        <Button color="inherit">
                            <Link href={`claim/${address}`}>
                                <Typography>Claim Rewards</Typography>
                            </Link>
                        </Button>
                    )}
                </Box>
                <ConnectWallet theme={"light"} />
            </Toolbar>
        </AppBar>
    );
}






{/*                <div className={styles.navLinks}>
                    {address && (
                        <Link href={'/rewards'}>
                            <p>My rewards</p>
                        </Link>
                    )}
                </div>*/}



