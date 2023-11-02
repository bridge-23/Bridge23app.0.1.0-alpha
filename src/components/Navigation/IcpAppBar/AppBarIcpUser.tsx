//..src/components/Navigation/IcpAppBar/AppBarIcpUser.tsx
import React, {useContext} from 'react';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {  IconButton, Box, Divider, List, Dialog, ListItemText, ListItemButton, ListItem, CssBaseline} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CustomList from '../CustomList';
import { AuthContext } from "../../../contexts/AuthContext";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function AppBarUser() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const address = useAddress();
    const { user } = useContext(AuthContext);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false); // For the drawer
    const [dialogOpen, setDialogOpen] = React.useState(false); // For the dialog/modal
    const items = ['New', 'Get Infinity', 'Dashboard', 'Accounts', 'Tokens', 'Rewards', 'More Options', 'Settings', 'Help center'];

    const handleModalOpen = () => {
        setDialogOpen(true);
    };

    const handleModalClose = () => {
        setDialogOpen(false);
    };

    const router = useRouter();  // <-- add this line

    const navigateTo = (path: string) => {
        router.push(path);
    };


    const getHrefForItem = (text: string) => {
        switch (text) {
            case 'New':
                handleModalOpen();
                break;
            case 'Get Infinity':
                navigateTo('/get-infinity');
                break;
            case 'Dashboard':
                navigateTo(`/dashboard/${address}`);
                break;
            case 'Accounts':
                navigateTo(`/accounts`);
                break;
            case 'Tokens':
                navigateTo(`/tokenslist/${address}`);
                break;
            case 'Rewards':
                navigateTo(`/rewards/${address}`);
                break;
            case 'More Options':
                navigateTo('/more-options');
                break;
            case 'Settings':
                navigateTo('/settings');
                break;
            case 'Help center':
                navigateTo('/help-center');
                break;
            default:
                navigateTo('/');
                break;
        }
    }
    const getIconForItem = (text: string) => {
        switch (text) {
            case 'New':
                return <AddIcon/>;
            case 'Get Infinity':
                return <StarIcon/>;
            case 'Dashboard':
                return <HomeIcon/>;
            case 'Accounts':
                return <AccountBalanceIcon/>;
            case 'Tokens':
                return <FormatListBulletedIcon/>;
            case 'Rewards':
                return <CardGiftcardIcon/>;
            case 'More Options':
                return <MoreVertIcon/>;
            case 'Settings':
                return <SettingsIcon/>;
            case 'Help center':
                return <HelpCenterIcon/>;
            default:
                return <HomeIcon/>;
        }
    }
    const handleDrawerOpen = () => {
        setOpen((prevOpen: boolean) => !prevOpen); // Toggle between true and false
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerOpen}>
                        {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />
                <List>
                    {items.map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                                onClick={() => getHrefForItem(text)}
                            >
                                <Box component="div" display="flex" alignItems="center">
                                    <ListItemIcon
                                        sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
                                    >
                                        {getIconForItem(text)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={{ opacity: open ? 1 : 0, width: open ? 'auto' : 0, color: 'primary.main' }}
                                    />
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Dialog open={dialogOpen} onClose={handleModalClose}>
                <CustomList/>
            </Dialog>
        </Box>
    );
}