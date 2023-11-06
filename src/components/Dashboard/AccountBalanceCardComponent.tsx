//..src/components/Dashboard/AccountBalanceCardComponent.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';

interface AccountBalanceCardProps {
    currentBalance: string; // Prop for the current balance
}
const AccountBalanceCardComponent: React.FC<AccountBalanceCardProps> = ({ currentBalance }) => {
    return (
        <Card
            sx={{
                perspective: '1000px',
                width: { xs: '100%', sm: '300px' }, // Full width on small devices, 300px on larger devices
                height: '200px',
                cursor: 'pointer',
                borderRadius: '24px'
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Avatar aria-label="profile" style={{ backgroundColor: '#1976d2' }}>
                        I
                    </Avatar>

                    <Box display="flex" alignItems="center" marginRight={10}>
                        <Typography variant="subtitle1" color="textSecondary" >September</Typography>
                        <IconButton>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="subtitle2" color="textSecondary" align="center">Accounts balance</Typography>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                    {currentBalance}
                </Typography>

                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <Avatar style={{ backgroundColor: 'green' }} sx={{ mr: 2 }}>
                            <ArrowUpwardSharpIcon style={{ color: 'white' }} />
                        </Avatar>
                        <div>
                            <Typography variant="caption" color="textSecondary">Income</Typography>
                            <Typography variant="subtitle2" style={{ color: 'green' }}>$9,000.00</Typography>
                        </div>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Avatar style={{ backgroundColor: 'red' }} sx={{ mr: 2 }}>
                            <ArrowDownwardSharpIcon style={{ color: 'white' }} />
                        </Avatar>
                        <div>
                            <Typography variant="caption" color="textSecondary">Expenses</Typography>
                            <Typography variant="subtitle2" style={{ color: 'red' }}>$1,300.00</Typography>
                        </div>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AccountBalanceCardComponent;
