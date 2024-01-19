//..src/pages/index.tsx
import React, { useContext } from 'react';
import { NextPage } from "next";
import {Box, CircularProgress, Container, Grid, useMediaQuery} from "@mui/material";
import { useFetchAccounts } from '../lib/Juno/fetchAccounts';
import {AuthContext} from "../contexts/AuthContext";
import { Theme } from '@mui/material/styles';
import LoginComponentJuno from "../components/LoginComponentJuno";
import MobileDashboardComponent from "../components/Dashboard/MobileDashboardComponent";
import DesktopDashboardComponent from "../components/Dashboard/DesktopDashboardComponent";
const Home: NextPage = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { loading: accountsLoading, error: accountsError } = useFetchAccounts();
    const { user, loading } = useContext(AuthContext);

    if (!user) {
        return <LoginComponentJuno />;
    }
    // If the accounts are still loading, show a loading indicator
    if (accountsLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }
    // If there was an error fetching accounts, you can handle it here
    if (accountsError) {
        console.error('Error fetching accounts:', accountsError);
        // Optionally, show an error message to the user
    }

    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px',}}>
            {!user && (
                    <LoginComponentJuno />
            )}
            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} alignItems="stretch">

                <Grid item xs={12}>
                    {isMobile ? <MobileDashboardComponent /> : <DesktopDashboardComponent />}
                </Grid>

            </Grid>
        </Container>
    );
};
export default Home;




