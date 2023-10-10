//..src/pages/accounts/index.tsx
import React from 'react';
import NewAccountComponent from "../../components/Accounts/NewAccountComponent";
import AccountsList from "../../components/Dashboard/AccountsList";
import { Container, Grid, Typography } from "@mui/material";

const Accounts: React.FC = () => {
    const [currentMonth, setCurrentMonth] = React.useState('');

    React.useEffect(() => {
        setCurrentMonth(new Date().toLocaleString('default', { month: 'long' }));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {currentMonth ? ` ${currentMonth}` : 'Loading...'}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <NewAccountComponent />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <AccountsList />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Accounts;

