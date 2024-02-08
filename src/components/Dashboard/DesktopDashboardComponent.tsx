import React, {useState, useContext, useEffect} from 'react';
import { Box, CircularProgress, Container, Grid, Select, MenuItem, useMediaQuery, Theme } from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import AccountBalanceCardComponent from "../Dashboard/AccountBalanceCardComponent";
import ExpenseCategoryComponent from "./ExpenseCategoryComponent";
import AccountsList from "../Dashboard/AccountsList";
import AddExpense from "../Dashboard/AddTransaction";
import Amount from "../Dashboard/Amouth";
import { AuthContext } from "../../contexts/AuthContext";
import { useRecoilValue } from 'recoil';
import { accountDataState } from '../../state/atoms';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import { calculateTotalBalance } from '../../utils/calculateTotalBalance';
import { useFetchAccounts } from '../../lib/Juno/fetchAccounts';

const DesktopDashboardComponent: React.FC = () => {
    const accounts = useRecoilValue(accountDataState);
    const { user, loading: userLoading } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const { loading: accountsLoading, error: accountsError } = useFetchAccounts();
    const [currency, setCurrency] = useState<string>('USD');
    const { exchangeRates, loading: ratesLoading, error: ratesError } = useExchangeRates();

    const handleClose = () => setOpen(false);

    const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
        setCurrency(event.target.value as string);
    };

    const totalCurrentBalanceInCents = calculateTotalBalance(accounts, exchangeRates, currency);
    const formattedTotalBalance = (totalCurrentBalanceInCents / 100).toLocaleString('en-US', { style: 'currency', currency });

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
        return <Box>Error: {getErrorMessage(accountsError || ratesError)}</Box>;
    }

    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px'}}>
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12}>
                    <Select
                        value={currency}
                        onChange={handleCurrencyChange}
                        displayEmpty
                    >
                        {Object.keys(exchangeRates).map((cur) => (
                            <MenuItem key={cur} value={cur}>{cur}</MenuItem>
                        ))}
                    </Select>
                </Grid>

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

                {/* Uncomment if needed
                <Grid item xs={12} md={4}>
                    <NewAccountComponent />
                </Grid>
                */}

                <Grid item xs={12} md={4}>
                    <AddExpense open={open} onClose={handleClose}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DesktopDashboardComponent;
