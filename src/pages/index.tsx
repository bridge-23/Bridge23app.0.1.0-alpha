//..src/pages/index.tsx
import React, {useState, useEffect, useContext} from 'react';
import { NextPage } from "next";
import {Box, CircularProgress, Container, Grid, useMediaQuery} from "@mui/material";
import { Theme } from '@mui/material/styles';
import AccountBalanceCardComponent from "../components/Dashboard/AccountBalanceCardComponent";
import ExpensesbyCategoryComponent from "../components/Dashboard/ExpensesbyCategoryComponent";
import NewAccountComponent from "../components/Accounts/NewAccountComponent";
import AccountsList from "../components/Dashboard/AccountsList";
import AddExpense from "../components/Dashboard/AddTransaction";
import Amount from "../components/Dashboard/Amouth";
import {listDocs} from "@junobuild/core-peer";
import LoginComponentJuno from "../components/LoginComponentJuno";
import {AuthContext} from "../contexts/AuthContext";
//import usePullToRefresh from '../../hooks/usePullToRefresh';
interface AccountData {
    accountName: string;
    financialInstitution: string;
    currentBalance: number;
    currency: string;
    id: string;
}
const Home: NextPage = () => {
    //usePullToRefresh();
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    /*    const handleOpen = () => {
        setOpen(true);
    };*/
    const handleClose = () => {
        setOpen(false);
    };
    const totalCurrentBalance = accounts.reduce((sum, account) => sum + account.currentBalance, 0);
    const formattedTotalBalance = totalCurrentBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'IDR', // Change to the actual currency code if necessary
    });


    useEffect(() => {
        fetchAccounts()
            .then(() => {
                // Handle success if needed
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }, []);
    /*    const handleEdit = (accountId: string) => {
            // Implement your edit logic here
            console.log('Editing account with ID:', accountId);
        };*/
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


    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px',}}>
            {!user && (
                    <LoginComponentJuno />
            )}
            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} alignItems="stretch">

                <Grid item xs={12} md={4}>
                    <AccountBalanceCardComponent currentBalance={formattedTotalBalance} />
                </Grid>

                <Grid xs={12} md={4}>
                    <Amount />
                </Grid>

                <Grid item xs={12} md={4}>
                    <ExpensesbyCategoryComponent />
                </Grid>

                <Grid item xs={12} md={4}>
                    <NewAccountComponent />
                </Grid>

                <Grid item xs={12} md={isMobile ? 4 : 8}>
                    <AccountsList accounts={accounts} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <AddExpense open={open} onClose={handleClose}/>
                </Grid>

            </Grid>
        </Container>
    );
};
export default Home;




