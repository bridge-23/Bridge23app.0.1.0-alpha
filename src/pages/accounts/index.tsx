//..src/pages/accounts/index.tsx
import React, { useState, useEffect, useContext } from "react";
import NewAccountComponent from "../../components/Accounts/NewAccountComponent";
import AccountsList from "../../components/Dashboard/AccountsList";
import { Container, Grid, Typography } from "@mui/material";
import { useFetchAccounts } from '../../lib/Juno/fetchAccounts';
import { useRecoilValue } from 'recoil';
import { accountDataState } from '../../state/atoms';

const Accounts: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState("");
    const { loading, error } = useFetchAccounts();
    const accounts = useRecoilValue(accountDataState);

    useEffect(() => {
        setCurrentMonth(new Date().toLocaleString("default", { month: "long" }));
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container>
            <Typography
                variant="h3"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "primary.main",
                }}
            >
                {currentMonth ? `Accounts  ${currentMonth}` : "Loading..."}
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
