//..src/components/Accounts/AccountCardComponent.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, Card, CardContent } from '@mui/material';
import AccountCard from '../Accounts/AccountCardComponent';


const AccountList: React.FC = () => {
    const [accounts, setAccounts] = useState<any[]>([]);

/*    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "accounts"));
                const accountsData = querySnapshot.docs.map(doc => doc.data());
                setAccounts(accountsData);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);*/

    return (
            <Card
                sx={{
                    perspective: '1000px',
                    width: '300px',
                    height: '200px',
                    cursor: 'pointer',
                    borderRadius: '18px'
                }}
            >
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Accounts
                    </Typography>
                </CardContent>

            <Grid container spacing={3}>
                {accounts.map((account, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <AccountCard
                            accountName={account.accountName}
                            currentBalance={account.currentBalance}
                            accountCurrency={account.currency}
                        />
                    </Grid>
                ))}
            </Grid>
            </Card>
    );
};
export default AccountList;

