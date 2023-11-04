//../src/pages/_app.tsx
import '../lib/Juno/initJuno';
import '../styles/globals.css'
import type { AppProps } from "next/app";
import React, { useEffect } from 'react';
import Navbar from "../components/Navigation/Navbar";
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { auth } from "../lib/FireBase/initFirebase";
import { initializeJuno } from '../lib/Juno/initJuno'; // Importing the initializeJuno function
import { Auth } from '../contexts/AuthContext';
//import { ThirdwebProvider, magicLink, metamaskWallet, coinbaseWallet, smartWallet, walletConnect } from "@thirdweb-dev/react";
//import { BaseGoerli } from "@thirdweb-dev/chains";
function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {

        initializeJuno().catch(error => {
            console.error('Failed to initialize Juno:', error);
        });
        const unsubscribe = auth.onAuthStateChanged(async user => {
        });

        return () => unsubscribe();
    }, []);

    return (
        <Auth>
        <ColorModeProvider>
{/*            <ThirdwebProvider
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
                        apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
                        type: "connect",
                    }),
                ]}
                authConfig={{
                    authUrl: '/api/auth',
                    domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
                }} >*/}
                <Navbar />
                <Component {...pageProps} />
           {/* </ThirdwebProvider>*/}
        </ColorModeProvider>
        </Auth>
    );
}
export default MyApp;
