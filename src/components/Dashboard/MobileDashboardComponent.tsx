import React, { useState, useContext, useEffect } from 'react';
import { Box, CircularProgress, Container, Grid, Select, MenuItem, FormControl, InputLabel, useMediaQuery, Theme } from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import AccountBalanceCardComponent from "../Dashboard/AccountBalanceCardComponent";
import ExpenseCategoryComponent from "./ExpenseCategoryComponent";
import AccountsList from "../Dashboard/AccountsList";
import AddExpense from "../Dashboard/AddTransaction";
import { AuthContext } from "../../contexts/AuthContext";
import { useFetchAccounts } from '../../lib/Juno/fetchAccounts';
import { useRecoilValue } from "recoil";
import { accountDataState } from "../../state/atoms";

interface ExchangeRates {
    [key: string]: number;
}

const useExchangeRates = (): { exchangeRates: ExchangeRates; loading: boolean; error: Error | null } => {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://v6.exchangerate-api.com/v6/9548ea81b15e52da78700ceb/latest/USD');
                const data = await response.json();
                setExchangeRates(data.conversion_rates);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    return { exchangeRates, loading, error };
};

const MobileDashboardComponent: React.FC = () => {
    const { user, loading: userLoading } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState<string>('USD');
    const accounts = useRecoilValue(accountDataState);
    const { loading: accountsLoading, error: accountsError } = useFetchAccounts();

    const { exchangeRates, loading: ratesLoading, error: ratesError } = useExchangeRates();

    const handleClose = () => setOpen(false);
    const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
        setCurrency(event.target.value as string);
    };

    const calculateTotalBalance = (): number => {
        const totalInUSD = accounts.reduce((sum, account) => {
            const rateToUSD = exchangeRates[account.currency] || 1;
            const usdBalance = rateToUSD !== 0 ? (account.currentBalance ?? 0) / rateToUSD : 0;
            return sum + usdBalance;
        }, 0);

        const targetRate = exchangeRates[currency] || 1;
        const totalInTargetCurrency = currency === 'USD' ? totalInUSD : totalInUSD * targetRate;

        return totalInTargetCurrency;
    };


    const totalCurrentBalance = calculateTotalBalance();
    const formattedTotalBalance = totalCurrentBalance.toLocaleString('en-US', { style: 'currency', currency: currency });

    if (userLoading || accountsLoading || ratesLoading) {
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

    if (accountsError || ratesError) {
        return <Box>Error: {getErrorMessage(accountsError) || getErrorMessage(ratesError)}</Box>;
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
