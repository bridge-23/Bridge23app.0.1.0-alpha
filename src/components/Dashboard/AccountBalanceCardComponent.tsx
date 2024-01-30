//..src/components/Dashboard/AccountBalanceCardComponent.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, IconButton, useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import Amount from "../Dashboard/Amouth";
import { AvatarContext } from '../ProfilePage/AvatarContext';
import { useTheme } from "@mui/material/styles";
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { avatarUrlState } from '../../state/atoms';
interface AccountBalanceCardProps {
    currentBalance: string; // Prop for the current balance
}
const AccountBalanceCardComponent: React.FC<AccountBalanceCardProps> = ({ currentBalance }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const avatarUrl = useRecoilValue(avatarUrlState);
    const router = useRouter();

    const handleAvatarClick = () => {
        router.push('/profile');
    }

    const avatar: File | null = null;

    return (
        <Card
            sx={{
                perspective: '1000px',
                width: { xs: '100%', sm: '300px' },
                height: { xs: '280px', sm: '280px', md: '150px' },
                cursor: 'pointer',
                borderRadius: '24px'
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {isMobile &&
                        <Avatar
                            src={avatarUrl} // Fix the 'avatar' usage
                            onClick={handleAvatarClick}
                        />
                    }
                    {isMobile &&
                        <Box display="flex" alignItems="center" >
                            <Typography variant="subtitle1" color="textSecondary" >November</Typography>
                            <IconButton>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </Box>
                    }
                    {isMobile &&
                        <Avatar aria-label="profile" style={{ backgroundColor: '#1976d2' }}>
                            <SettingsIcon />
                        </Avatar>
                    }
                </Box>

                <Typography variant="subtitle2" color="textSecondary" align="center">Accounts balance</Typography>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                    {currentBalance}
                </Typography>
                {isMobile && <Amount />}
            </CardContent>
        </Card>
    );
}
export default AccountBalanceCardComponent;
