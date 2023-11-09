//..src/pages/index.tsx
import { NextPage } from "next";
import Head from 'next/head';
import React, { useContext } from 'react';
import { Container, Typography, Grid, Box, CircularProgress } from "@mui/material";
import Image from 'next/image';
import LoginComponentJuno from "../components/LoginComponentJuno";
import { AuthContext } from "../contexts/AuthContext";
const Home: NextPage = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title>Bridge 23 - Home</title>
                <meta name="description" content="Welcome to Bridge 23" />
            </Head>
            <Container style={{ padding: '24px', marginBottom: '82px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Image src="/icon-512x512.png" alt="Bridge 23 Logo" width={40} height={40} />
                            <Typography variant="h4" sx={{ mt: 1 }}>
                                Bridge 23
                            </Typography>
                            {/* Conditional rendering based on the user's authentication status */}
                            {!user && (
                                <Box mt={2}>
                                    <LoginComponentJuno />
                                </Box>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                                {/* Juno Badge */}
                                <div>
                                    <Image src="/logo-icp.png" alt="ICP Logo" width={263.625} height={16.125}/>
                                </div>

                                {/* ICP Logo */}
                                <div>
                                    <Image src="/badge-juno.svg" alt="Juno Badge" width={152} height={32.66}/>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default Home;




