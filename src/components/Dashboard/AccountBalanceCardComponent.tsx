//..src/components/Dashboard/AccountBalanceCardComponent.tsx
import React from 'react';
import {Box, Card, CardContent, Typography, Avatar, IconButton, useMediaQuery} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import Amount from "../Dashboard/Amouth";
import {useTheme} from "@mui/material/styles";
interface AccountBalanceCardProps {
    currentBalance: string; // Prop for the current balance
}
const AccountBalanceCardComponent: React.FC<AccountBalanceCardProps> = ({ currentBalance }) => {
    console.log("currentBalance", {currentBalance})
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                    <Avatar aria-label="profile" style={{ backgroundColor: '#1976d2' }}>
                        I
                    </Avatar>
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
