//..src/components/Dashboard/MobileDashboardComponent.tsx
import React, {useState, useEffect, useContext} from 'react';
import {Box, CircularProgress, Container, Grid, useMediaQuery} from "@mui/material";
import { Theme } from '@mui/material/styles';
import AccountBalanceCardComponent from "../Dashboard/AccountBalanceCardComponent";
import ExpensesbyCategoryComponent from "../Dashboard/ExpensesbyCategoryComponent";
import NewAccountComponent from "../Accounts/NewAccountComponent";
import AccountsList from "../Dashboard/AccountsList";
import AddExpense from "../Dashboard/AddTransaction";
import Amount from "../Dashboard/Amouth";
import {listDocs} from "@junobuild/core-peer";
import {AuthContext} from "../../contexts/AuthContext";
interface AccountData {
    accountName: string;
    financialInstitution: string;
    currentBalance: number;
    currency: string;
    id: string;
}
const MobileDashboardComponent = () => {
    const { user, loading } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const totalCurrentBalance = accounts.reduce((sum, account) => sum + account.currentBalance, 0);
    const formattedTotalBalance = totalCurrentBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'IDR', // Change to the actual currency code if necessary
    });
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if (!user) return; // If there's no user, skip the fetch
        fetchAccounts()
            .then(() => {
                // Handle success if needed
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }, [user]); // dependency array includes user

    const fetchAccounts = async () => {
        try {
            const accountsData = await listDocs({
                collection: "Accounts"
            });

            if (accountsData && accountsData.items) {
                const fetchedAccounts = accountsData.items.map(doc => {
                    const data = doc.data as AccountData;
                    return {
                        accountName: data.accountName,
                        financialInstitution: data.financialInstitution,
                        currentBalance: data.currentBalance,
                        currency: data.currency,
                        id: doc.key
                    };
                });
                setAccounts(fetchedAccounts);
                console.log(accountsData);
            } else {
                console.error("Accounts data is undefined or items are missing");
                alert('Failed to fetch accounts. Please try again.');
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            alert('Failed to fetch accounts. Please try again.');
        }
    };
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px',}}>
            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} alignItems="stretch">

                <Grid item xs={12}>
                    <AccountBalanceCardComponent currentBalance={formattedTotalBalance} />
                </Grid>

                <Grid item xs={12}>
                    <NewAccountComponent />
                </Grid>

                <Grid item xs={12}>
                    <AccountsList accounts={accounts} />
                </Grid>

                <Grid item xs={12}>
                    <Amount />
                </Grid>

                <Grid item xs={12}>
                    <ExpensesbyCategoryComponent />
                </Grid>



                <Grid item xs={12}>
                    <AddExpense open={open} onClose={handleClose}/>
                </Grid>
            </Grid>
        </Container>
    );
};
export default MobileDashboardComponent;
