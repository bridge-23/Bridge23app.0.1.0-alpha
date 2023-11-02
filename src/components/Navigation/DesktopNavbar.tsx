//..src/components/Navigation/DesktopNavbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

function DesktopNavbar() {

    return (
        <AppBar color="primary" position="static" sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                    <Button color="inherit">
                        <Link href="/">
                            <Typography>Support</Typography>
                        </Link>
                    </Button>
                    {/* The rest of the static app bar items here... */}
                </Box>
                <ThemeToggleButton />
            </Toolbar>
        </AppBar>
    );
}

export default DesktopNavbar;
