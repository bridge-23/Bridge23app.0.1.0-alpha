// src/components/ICPSignInButton.tsx
import React, { useEffect, useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup, Grid, Box } from '@mui/material';
import { signIn, InternetIdentityProvider, NFIDProvider, signOut, authSubscribe } from '@junobuild/core-peer';
import LoadingComponent from '../shared/LoadingComponent';
import { useRouter } from 'next/router';

//TODO: make post to juno to user collection
type ProviderType = 'internetIdentity' | 'nftId';
const ICPSignInButton = () => {
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            const twentyDaysInNanoseconds = BigInt(480 * 3600 * 1000000000);
            const provider = providerType === 'internetIdentity'
                ? new InternetIdentityProvider({ domain: "internetcomputer.org" })
                : new NFIDProvider({
                    appName: "ReFinityapp",
                    logoUrl: "https://somewhere.com/your_logo.png",
                });
            await signIn({
                provider,
                maxTimeToLive: twentyDaysInNanoseconds
            });
            console.log("Sign-in successful!");
            await router.push('/magiclist');
        } catch (error) {
            console.error("Sign-in failed:", error);
        } finally {
            setIsLoading(false); // Stop loading regardless of success or failure
        }
    };
    const handleSignOut = async () => {
        try {
            setIsLoading(true);
            await signOut();
            console.log("Sign-out successful!");
        } catch (error) {
            console.error("Sign-out failed:", error);
        } finally {
            setIsLoading(false);
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
                        style={{ marginBottom: '1px' }}
                    >
                        <ToggleButton value="internetIdentity">Internet Identity</ToggleButton>
                        <ToggleButton value="nftId">NFID</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item style={{ marginTop: '1px' }}>
                    <Button
                        variant="contained"
                        color={isUserSignedIn ? "secondary" : "primary"}
                        onClick={isUserSignedIn ? handleSignOut : handleSignIn}
                        disabled={isLoading}
                        style={{ marginBottom: '1px' }}
                    >
                        {isUserSignedIn ? "Sign Out" : "Sign In"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
export default ICPSignInButton;

