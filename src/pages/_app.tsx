//../src/pages/_app.tsx
import '../styles/globals.css'
import type {AppProps} from "next/app";
import React from 'react';
import { ThirdwebProvider, magicLink,metamaskWallet, coinbaseWallet, smartWallet, walletConnect } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";
import {useEffect} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import theme from "../utils/theme";
import "@sendbird/uikit-react/dist/index.css";
import initializeFirebaseClient from '../lib/initFirebase';
import { BaseGoerli } from "@thirdweb-dev/chains";
import SendbirdApp from "@sendbird/uikit-react"; //need for chat page to do fix

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {

        const clientId = process.env.CLIENT_ID;
        const secretKey = process.env.SECRET_KEY;
        //Use the clientId and secretKey as needed in your application logic.
        // For example, you can pass them as props to other components or use them in API calls.
        const { auth } = initializeFirebaseClient(); // Use the initialized Firebase auth
        const unsubscribe = auth.onAuthStateChanged(async user => {
        });
        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <ThemeProvider theme={theme}>

            <ThirdwebProvider
                supportedChains={[BaseGoerli]}
                activeChain="base-goerli"
                clientId="a438ed0706431cf7f53ae4cdbee427a7"
                supportedWallets={[
                    metamaskWallet(),
                    coinbaseWallet(),
                    walletConnect(),
                    smartWallet({
                        factoryAddress: "0x0A116c4c47837Fc079839257C62f40b6891A71EB",
                        gasless: true,
                        personalWallets: [
                            metamaskWallet(),
                            coinbaseWallet(),
                            walletConnect(),
                        ],
                    }),
                    magicLink({
                        apiKey:  process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
                        type: 'connect',
                    }),
                ]}
                authConfig={{
                authUrl: '/api/auth',
                domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
            }} >
                <Navbar/>

                    <Component {...pageProps} />

            </ThirdwebProvider>

        </ThemeProvider>
    );
}

export default MyApp;