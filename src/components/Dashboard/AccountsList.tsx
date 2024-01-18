//..src/components/Accounts/AccountList.tsx
import React from "react";
import {Grid, Card, CardContent, Typography, useMediaQuery} from "@mui/material";
import AccountCard from "../Accounts/AccountCardComponent";
import {useTheme} from "@mui/material/styles";
import { SxProps, Theme } from "@mui/material/styles";
//import { setDoc } from "@junobuild/core-peer";

interface AccountData {
  accountName: string;
  financialInstitution: string;
  currentBalance: number;
  currency: string;
  id: string;
}
interface AccountsListProps {
  accounts: AccountData[]; // Use the AccountData interface
}
const AccountList: React.FC<AccountsListProps> = ({ accounts }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const scrollContainerStyle = {
        display: 'flex',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        // Adjust padding and margin as needed
        padding: theme.spacing(1),
        '& > *': {
            flex: 'none', // Prevents cards from stretching
            width: '100%', // Set card width
            maxWidth: '300px', // Adjust maximum width as needed
            marginRight: theme.spacing(1)
        }
    };
  // Accept props here
  const handleEdit = (accountId: string) => {
    // Logic to handle edit operation
    console.log(`Edit account with ID: ${accountId}`);
  };


    return (
        <Card sx={{ mx: "auto", my: 2, p: 0, borderRadius: 0, boxShadow: 'none' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Accounts
                </Typography>
                {isMobile ? (
                    <div style={scrollContainerStyle}>
                        {accounts.map(account => (
                            <AccountCard
                                key={account.id}
                                accountName={account.accountName}
                                financialInstitution={account.financialInstitution}
                                currentBalance={account.currentBalance}
                                accountCurrency={account.currency}
                                onEdit={() => console.log(`Edit account with ID: ${account.id}`)}
                                //sx={{ minWidth: 300, marginRight: theme.spacing(2) }}
                            />
                        ))}
                    </div>
                ) : (
                    <Grid container spacing={3}>
                        {accounts.map(account => (
                            <Grid item xs={12} sm={6} md={4} key={account.id}>
                                <AccountCard
                                    accountName={account.accountName}
                                    financialInstitution={account.financialInstitution}
                                    currentBalance={account.currentBalance}
                                    accountCurrency={account.currency}
                                    onEdit={() => console.log(`Edit account with ID: ${account.id}`)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default AccountList;
