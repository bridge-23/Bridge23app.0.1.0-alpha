// src/components/LoginComponent.tsx
import React from 'react';
import { Card, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import dynamic from "next/dynamic";
// Define the component as React.FC if there are no props

const DynamicICPSignInButton = dynamic(() => import("./Buttons/ICPSignInButton"), {ssr: false});

const LoginComponentJuno: React.FC = () => {
    return (
        <Container style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card style={{ padding: '24px' }}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Typography variant="h5" align="center"  >
                        JOIN TODAY + SECOND LIVE YOUR EXPENSES
                    </Typography>
                    <DynamicICPSignInButton />
                    <Grid item xs={12} style={{ marginTop: '12px' }}>
                        <Typography variant="body2" align="center">
                            By signing in, you agree to our{' '}
                            <Link href="/terms-of-service" legacyBehavior>
                                <a style={{ color: 'primary' }}>Terms of Service</a>
                            </Link>
                            {' '}and{' '}
                            <Link href="/privacy-policy" legacyBehavior>
                                <a style={{ color: 'primary' }}>Privacy Policy</a>
                            </Link>.
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};
export default LoginComponentJuno;

