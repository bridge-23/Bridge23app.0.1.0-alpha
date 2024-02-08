import React, { useState, useContext } from 'react';
import { Box, CircularProgress, Container, Grid, Select, MenuItem, FormControl, InputLabel, useMediaQuery, Theme } from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import AccountBalanceCardComponent from "../Dashboard/AccountBalanceCardComponent";
import ExpenseCategoryComponent from "./ExpenseCategoryComponent";
import AccountsList from "../Dashboard/AccountsList";
import AddExpense from "../Dashboard/AddTransaction";
import { AuthContext } from "../../contexts/AuthContext";
import { useRecoilValue } from "recoil";
import { accountDataState } from "../../state/atoms";
import { useExchangeRates } from "../../hooks/useExchangeRates";
import { calculateTotalBalance } from '../../utils/calculateTotalBalance';

const MobileDashboardComponent: React.FC = () => {
    const accounts = useRecoilValue(accountDataState);
    const { user, loading: userLoading } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState<string>('USD');
    const { exchangeRates, loading: ratesLoading, error: ratesError } = useExchangeRates();

    const handleClose = () => setOpen(false);
    const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
        setCurrency(event.target.value as string);
    };

    const totalCurrentBalanceInCents = calculateTotalBalance(accounts, exchangeRates, currency);
    const formattedTotalBalance = (totalCurrentBalanceInCents / 100).toLocaleString('en-US', { style: 'currency', currency });

    if (userLoading || ratesLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const getErrorMessage = (error: string | Error | null): string => {
        if (error instanceof Error) {
            return error.message;
        } else if (typeof error === 'string') {
            return error;
        } else {
            return 'Unknown error';
        }
    };

    if (ratesError) {
        return <Box>Error: {getErrorMessage(ratesError)}</Box>;
    }

    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px' }}>
            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} alignItems="stretch">
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="currency-select-label">Currency</InputLabel>
                        <Select
                            labelId="currency-select-label"
                            id="currency-select"
                            value={currency}
                            onChange={handleCurrencyChange}
                        >
                            {Object.keys(exchangeRates).map((cur) => (
                                <MenuItem key={cur} value={cur}>{cur}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <AccountBalanceCardComponent currentBalance={formattedTotalBalance} />
                </Grid>
                <Grid item xs={12}>
                    <AccountsList />
                </Grid>
                <Grid item xs={12}>
                    <ExpenseCategoryComponent />
                </Grid>
                <Grid item xs={12}>
                    <AddExpense open={open} onClose={handleClose} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default MobileDashboardComponent;
