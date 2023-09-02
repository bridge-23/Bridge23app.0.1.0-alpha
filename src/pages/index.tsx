import { NextPage } from "next";
import { Container, Typography, Grid, Card, Button } from "@mui/material";
import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";

const Home: NextPage = () => {
    return (
        <Container style={{ padding: '24px' }}>
            <Typography variant="h3" align="center">
                JOIN TODAY - MAKE YOUR SPEND COUNT!
            </Typography>

            <Typography variant="body1">
                Bridge 23 is a next-gen POS system for an upgraded customer experience. It is a blockchain-based POS system that allows merchants to accept crypto payments and rewards customers with crypto.
            </Typography>

            <Grid container justifyContent="center" style={{ marginTop: '24px' }}>
                <Card style={{ padding: '24px' }}>
                    <Grid container direction="column" alignItems="center">
                        <Typography variant="h5" align="center">
                            Connect Your Wallet
                        </Typography>
                        <Typography variant="body2" align="center" style={{ marginBottom: '16px' }}>
                            Sign in to start using Bridge 23 and manage your crypto assets.
                        </Typography>
                        <ConnectWallet theme="light" />
                    </Grid>
                </Card>
            </Grid>

            {/* Optional: Add more content or sections here */}
        </Container>
    );
};

export default Home;



