// src/components/LoginComponent.tsx
import React from "react";
import {Card, Container, Grid, Typography} from "@mui/material";
import ICPSignInButton from './Buttons/ICPSignInButton';
import Link from "next/link";

export default function LoginComponentJuno() {
    return (
        <Container style={{ padding: '24px', marginBottom: '82px' }}>
        <Card style={{ padding: '24px' }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Typography variant="h5" align="center">
                    JOIN TODAY + SECOND LIVE YOUR EXPENSES
                </Typography>
                <ICPSignInButton />
                <Grid item xs={12} style={{ marginTop: '16px' }}>
                    <Typography variant="body2" align="center">
                        By signing in, you agree to our
                        <Link href="/terms-of-service"> Terms of Service</Link>
                        and
                        <Link href="/privacy-policy">Privacy Policy</Link>.
                    </Typography>
                </Grid>
            </Grid>
        </Card>
        </Container>
    );
}