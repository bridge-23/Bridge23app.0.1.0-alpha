//..src/components/Dashboard/AccountBalanceCardComponent.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface AccountBalanceCardProps {
    currentBalance: string; // Prop for the current balance
}
const AccountBalanceCardComponent: React.FC<AccountBalanceCardProps> = ({ currentBalance }) => {
    return (
        <Card
            sx={{
                perspective: '1000px',
                width: { xs: '100%', sm: '300px' },
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

                    <Box display="flex" alignItems="center" marginRight={12}>
                        <Typography variant="subtitle1" color="textSecondary" >November</Typography>
                        <IconButton>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="subtitle2" color="textSecondary" align="center">Accounts balance</Typography>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                    {currentBalance}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AccountBalanceCardComponent;
