//..src/dashboard/[userKey].tsx
import React, {useState, useEffect} from 'react';
import { NextPage } from "next";
import { Container, Grid, useMediaQuery, Box } from "@mui/material";
import { Theme } from '@mui/material/styles';
import UserProfileComponent from "../../components/Dashboard/UserProfileComponent";
import AccountBalanceCardComponent from "../../components/Dashboard/AccountBalanceCardComponent";
import ExpensesbyCategoryComponent from "../../components/Dashboard/ExpensesbyCategoryComponent";
import IncomeCardComponent from "../../components/Dashboard/IncomeCardComponent";
import ExpenseCardComponent from "../../components/Dashboard/IncomeCardComponent";
import AccountsList from "../../components/Dashboard/AccountsList";
import dynamic from "next/dynamic";

interface AccountData {
    accountName: string;
    financialInstitution: string;
    currentBalance: number;
    currency: string;
    id: string;
}

const DynamicNewAccountComponent = dynamic(() => import("../../components/Accounts/NewAccountComponent"), {ssr: false});
const DynamicAddExpense = dynamic(() => import("../../components/Dashboard/AddTransaction"), {ssr: false});

const Dashboard: NextPage = () => {
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
        fetchAccounts(); // Call the fetch function on component mount
    }, []);
/*    const handleEdit = (accountId: string) => {
        // Implement your edit logic here
        console.log('Editing account with ID:', accountId);
    };*/
    const fetchAccounts = async () => {
        try {
            const {listDocs} = await import("@junobuild/core");
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
            <Box px={isMobile ? 2 : 2}>
                <Grid container spacing={isMobile ? 2 : 2} direction="row" alignItems="stretch">

                    <Grid item xs={12} md={4}>
                        <AccountBalanceCardComponent currentBalance={formattedTotalBalance} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <IncomeCardComponent/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ExpenseCardComponent/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <UserProfileComponent/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ExpensesbyCategoryComponent />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DynamicAddExpense open={open} onClose={handleClose}/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DynamicNewAccountComponent />
                    </Grid>

                    <Grid item xs={6} md={8}>
                        <AccountsList accounts={accounts} />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <DynamicNewAccountComponent />
                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
};
export default Dashboard;


