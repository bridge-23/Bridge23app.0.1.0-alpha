// src/components/ICPSignInButton.tsx
import React, { useEffect, useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup, Grid, Box } from '@mui/material';
import { signIn, InternetIdentityProvider, NFIDProvider, signOut, authSubscribe } from '@junobuild/core';
import { useRouter } from 'next/router';

type ProviderType = 'internetIdentity' | 'nftId';
const ICPSignInButton = () => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [providerType, setProviderType] = useState<ProviderType>('internetIdentity');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = authSubscribe((user) => {
            setIsUserSignedIn(!!user);
            if (user) {
                console.log("User is signed in:", user);
            } else {
                console.log("User is signed out");
            }
        });
        const handleSessionExpiration = () => {
            console.log("Session has expired");
            // Handle session expiration if needed
        };

        document.addEventListener("junoSignOutAuthTimer", handleSessionExpiration, { passive: true });

        return () => {
            unsubscribe();
            document.removeEventListener("junoSignOutAuthTimer", handleSessionExpiration);
        };
    }, []);

    const handleSignIn = async () => {
        try {
            const provider = providerType === 'internetIdentity'
                ? new InternetIdentityProvider({ domain: "internetcomputer.org" })
                : new NFIDProvider({
                    appName: "ReFinityapp",
                    logoUrl: "https://somewhere.com/your_logo.png",
                });
            await signIn({ provider });
            console.log("Sign-in successful!");
            router.push('/shoppinglist');
        } catch (error) {
            console.error("Sign-in failed:", error);
        }
    };
    const handleSignOut = async () => {
        try {
            await signOut();
            console.log("Sign-out successful!");
        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    };

    const handleProviderChange = (event: React.MouseEvent<HTMLElement>, newProvider: ProviderType) => {
        if (newProvider !== null) {
            setProviderType(newProvider);
        }
    };

    return (
        <Box>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item>
                    <ToggleButtonGroup
                        color="primary"
                        value={providerType}
                        exclusive
                        onChange={handleProviderChange}
                        style={{ marginBottom: '10px' }}
                    >
                        <ToggleButton value="internetIdentity">Internet Identity</ToggleButton>
                        <ToggleButton value="nftId">NFID</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item style={{ marginTop: '2px' }}>
                    {isUserSignedIn ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
export default ICPSignInButton;

