// src/components/LoginComponent.tsx
import React from "react";
import {Card, Container, Grid, Typography} from "@mui/material";
import ICPSignInButton from './Buttons/ICPSignInButton';
import Link from "next/link";
import Image from "next/image";

export default function LoginComponentJuno() {
    return (
        <Container style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
        <Card style={{ padding: '24px' }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Image src="/icon-512x512.png" alt="Bridge 23 Logo" width={80} height={80} />
                <Typography variant="h5" align="center">
                    JOIN TODAY + SECOND LIVE YOUR EXPENSES
                </Typography>
                <ICPSignInButton />
                <Grid item xs={12} style={{ marginTop: '16px' }}>
                    <Typography variant="body2" align="center">
                        By signing in, you agree to our{' '}
                        <Link href="/terms-of-service">Terms of Service</Link>
                        and{' '}
                        <Link href="/privacy-policy">Privacy Policy</Link>.
                    </Typography>
                </Grid>
            </Grid>
        </Card>
        </Container>
    );
}