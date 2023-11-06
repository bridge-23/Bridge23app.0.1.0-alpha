//..src/dashboard/[userKey].tsx
import React, {useState, useEffect, useContext} from 'react';
import { NextPage } from "next";
import { Container, Grid, useMediaQuery, Box } from "@mui/material";
import { Theme } from '@mui/material/styles';
import UserProfileComponent from "../../components/Dashboard/UserProfileComponent";
import AccountBalanceCardComponent from "../../components/Dashboard/AccountBalanceCardComponent";
import ExpensesbyCategoryComponent from "../../components/Dashboard/ExpensesbyCategoryComponent";
import NewAccountComponent from "../../components/Accounts/NewAccountComponent";
import AccountsList from "../../components/Dashboard/AccountsList";
import AddExpense from "../../components/Dashboard/AddExpense";
import {AuthContext} from "../../contexts/AuthContext";
import {listDocs} from "@junobuild/core";
interface AccountData {
    accountName: string;
    currentBalance: number;
    currency: string;
    type: string; // Corresponds to accountType
    id: string;
}
const Dashboard: NextPage = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const totalCurrentBalance = accounts.reduce((sum, account) => sum + account.currentBalance, 0);

    const formattedTotalBalance = totalCurrentBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'IDR', // Change to the actual currency code if necessary
    });

    useEffect(() => {
        fetchAccounts(); // Call the fetch function on component mount
    }, []);
    const handleEdit = (accountId: string) => {
        // Implement your edit logic here
        console.log('Editing account with ID:', accountId);
    };
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
                        currentBalance: data.currentBalance,
                        currency: data.currency,
                        type: data.type, // Make sure that this value exists in your fetched data
                        id: doc.key
                    };
                });
                setAccounts(fetchedAccounts); // Update the component's state with the fetched accounts
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
            <Box px={isMobile ? 2 : 0}>
                <Grid container spacing={isMobile ? 2 : 4} direction="row" alignItems="stretch">

                    <Grid item xs={12} md={4}>
                        <AccountBalanceCardComponent currentBalance={formattedTotalBalance} />
                    </Grid>


                    <Grid item xs={12} md={4}>
                        <UserProfileComponent/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ExpensesbyCategoryComponent />
                    </Grid>

                    {/* Second row of cards */}
                    <Grid item xs={12} md={4}>
                        <NewAccountComponent />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <AddExpense open={open} onClose={handleClose}/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <AccountsList accounts={accounts} />
                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
};
export default Dashboard;


