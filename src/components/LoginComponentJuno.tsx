// src/components/LoginComponent.tsx
import React from 'react';
import { Card, Container, Grid, Typography } from '@mui/material';
import ICPSignInButton from './Buttons/ICPSignInButton';
import Link from 'next/link';
import Image from 'next/image';
// Define the component as React.FC if there are no props
const LoginComponentJuno: React.FC = () => {
    return (
        <Container style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card style={{ padding: '24px' }}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Typography variant="h5" align="center"  >
                        JOIN TODAY + SECOND LIVE YOUR EXPENSES
                    </Typography>
                    <div style={{ marginTop:'10px'}}>
                    <ICPSignInButton />
                    </div>
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
                        {}
                    </Grid>
                    {}
                    <div style={{ marginTop:'20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        {/* ICP Logo */}
                        <div>
                            <Image src="/logo-icp.png" alt="ICP Logo" width={263.625} height={16.125}/>
                        </div>
                        {/* Juno Badge */}
                        <div>
                            <Image src="/badge-juno.svg" alt="Juno Badge" width={152} height={32.66}/>
                        </div>
                    </div>
                </Grid>
            </Card>
        </Container>
    );
};
export default LoginComponentJuno;

