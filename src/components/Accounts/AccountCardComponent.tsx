//..src/components/Accounts/AccountCardComponent.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface AccountCardProps {
    accountName: string;
    currentBalance: number;
    accountCurrency: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ accountName, currentBalance, accountCurrency }) => {
    return (
        <Box p={3} boxShadow={3} m={2} textAlign="center">
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
                {accountName}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: '8px' }}>
                <Typography variant="subtitle1">
                    Current Balance:
                </Typography>
                <Typography variant="body1">
                    {currentBalance} {accountCurrency}
                </Typography>
            </Box>
        </Box>
    );
};

export default AccountCard;
