//..src/components/Dashboard/MobileDashboardComponent.tsx
import React, { useState, useContext } from 'react';
import { Box, CircularProgress, Container, Grid, useMediaQuery } from "@mui/material";
import { Theme } from '@mui/material/styles';
import AccountBalanceCardComponent from "../Dashboard/AccountBalanceCardComponent";
import ExpenseCategoryComponent from "./ExpenseCategoryComponent";
import AccountsList from "../Accounts/AccountsList";
import AddExpense from "../Dashboard/AddTransaction";
import { AuthContext } from "../../contexts/AuthContext";
import { useFetchAccounts } from '../../lib/Juno/fetchAccounts';
import {useRecoilValue} from "recoil";
import {accountDataState} from "../../state/atoms";
const MobileDashboardComponent = () => {
    const { user, loading: userLoading } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const accounts = useRecoilValue(accountDataState);
    const { loading: accountsLoading, error: accountsError } = useFetchAccounts();
    const handleClose = () => setOpen(false);
    // Calculate the total current balance
    const totalCurrentBalance = accounts.reduce((sum, account) => sum + account.currentBalance, 0);
    const formattedTotalBalance = totalCurrentBalance.toLocaleString('en-US', { style: 'currency', currency: 'IDR' });

    if (userLoading || accountsLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px'}}>
            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} alignItems="stretch">
                <Grid item xs={12}><AccountBalanceCardComponent currentBalance={formattedTotalBalance} /></Grid>
                <Grid item xs={12}><AccountsList/></Grid>
                <Grid item xs={12}><ExpenseCategoryComponent /></Grid>
                <Grid item xs={12}><AddExpense open={open} onClose={handleClose}/></Grid>
            </Grid>
        </Container>
    );
};

export default MobileDashboardComponent;

