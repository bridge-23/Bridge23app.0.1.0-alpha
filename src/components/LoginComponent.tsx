//..src/components/LoginComponent.tsx
import {Button, Typography, Card, Grid} from "@mui/material";
import {ConnectWallet, useAddress, useAuth} from "@thirdweb-dev/react";
import React from "react";
import {signInWithCustomToken, signOut} from "firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import useFirebaseUser from "../lib/useFirebaseUser";
import initializeFirebaseClient from "../lib/initFirebase";
import { useRouter } from 'next/router';


export default function LoginComponent() {
    const address = useAddress();
    const thirdwebAuth = useAuth();
    const {user} = useFirebaseUser();
    const {auth, db} = initializeFirebaseClient();
    const router = useRouter();

    const signIn = async () => {
        // Use the same address as the one specified in _app.tsx.
        const payload = await thirdwebAuth?.login();

        try {
            // Make a request to the API with the payload.
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ payload }),
            });
            // Get the returned JWT token to use it to sign in with
            const { token } = await res.json();
            // Sign in with the token.
            const userCredential = await signInWithCustomToken(auth, token);

            // On success, we have access to the user object.
            const user = userCredential.user;

            // If this is a new user, we create a new document in the database.
            const usersRef = doc(db, "users", user.uid!);
            const userDoc = await getDoc(usersRef);

            if (!userDoc.exists()) {
                // User now has permission to update their own document outlined in the Firestore rules.
                await setDoc(usersRef, { createdAt: serverTimestamp() }, { merge: true });
            }

            if (user && user.uid) {
                await logUserAction('login', user.uid);
                console.log(`User with ID: ${user.uid} has logged in at ${new Date().toISOString()}`);
                // Redirect to transactions page after successful login
                console.log("Redirecting to transactions...");
                await router.push(`/dashboard/${address}`);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const logUserAction = async (action: 'login' | 'logout', uid: string) => {
        try {
            const logRef = doc(db, 'logins', uid);
            await setDoc(logRef, {
                action: action,
                timestamp: serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error("Error logging user action:", error);
        }
    };

    // const handleSignOut = async () => {
    //     try {
    //         await signOut(auth);
    //         if (user && user.uid) {
    //             await logUserAction('logout', user.uid);
    //             console.log(`User with ID: ${user.uid} has logged out at ${new Date().toISOString()}`);
    //         }
    //     } catch (error) {
    //         console.error("Error during sign out:", error);
    //     }
    // };

    return (
        <Card style={{ padding: '24px' }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Typography variant="h5" align="center">
                    Connect Your Wallet
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                >
                    Sign in to start using Bridge 23 and manage your crypto assets.
                </Typography>

                <div>
                    {address ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => signIn()}>Sign in with Wallet
                        </Button>
                    ) : (
                        <ConnectWallet
                            theme={"dark"}
                            auth={{ loginOptional: false }}
                        />
                    )}
                </div>

            </Grid>
        </Card>
    );
}