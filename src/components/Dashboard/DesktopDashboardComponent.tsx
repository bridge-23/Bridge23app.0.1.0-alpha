//..src/components/Dashboard/DesktopDashboardComponent.tsx
import React, {useState, useContext} from 'react';
import {Box, CircularProgress, Container, Grid, useMediaQuery} from "@mui/material";
import AccountBalanceCardComponent from "../Dashboard/AccountBalanceCardComponent";
import ExpenseCategoryComponent from "./ExpenseCategoryComponent";
import AccountsList from "../Accounts/AccountsList";
import AddExpense from "../Dashboard/AddTransaction";
import Amount from "../Dashboard/Amouth";
import { AuthContext } from "../../contexts/AuthContext";
import { Theme } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { accountDataState } from '../../state/atoms';
import { useFetchAccounts } from '../../lib/Juno/fetchAccounts';
const DesktopDashboardComponent = () => {
    const accounts = useRecoilValue(accountDataState);
    const totalCurrentBalance = accounts.reduce((sum, account) => sum + (account.currentBalance ?? 0), 0);
    const formattedTotalBalance = totalCurrentBalance.toLocaleString('en-US', { style: 'currency', currency: 'IDR' });
    const { user, loading: userLoading } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const { loading: accountsLoading, error: accountsError } = useFetchAccounts();
    const handleClose = () => setOpen(false);

    if (userLoading || accountsLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px',}}>

            <Grid container spacing={2}  alignItems="stretch">

                <Grid item xs={12} md={4}>
                    <AccountBalanceCardComponent currentBalance={formattedTotalBalance} />
                </Grid>

                <Grid xs={12} md={4}>
                    <Amount />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ExpenseCategoryComponent />
                </Grid>

                <Grid item xs={6} md={8}>
                    <AccountsList />
                </Grid>

                <Grid item xs={12} md={4}>
                    <AddExpense open={open} onClose={handleClose}/>
                </Grid>

            </Grid>

        </Container>
    );
};
export default DesktopDashboardComponent;
