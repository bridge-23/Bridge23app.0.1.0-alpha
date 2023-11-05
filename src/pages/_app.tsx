//../src/pages/_app.tsx
import '../lib/Juno/initJuno';
import '../styles/globals.css'
import type { AppProps } from "next/app";
import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navigation/Navbar";
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { initializeJuno } from '../lib/Juno/initJuno';
import Auth  from '../contexts/AuthContext';
import {authSubscribe, User} from "@junobuild/core";
function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Loading state
    useEffect(() => {

        initializeJuno().catch(error => {
            console.error('Failed to initialize Juno:', error);
        });

        const unsubscribe = authSubscribe((newUser: User | null) => {
            setUser(newUser);
            setLoading(false);
            if (!newUser) {
                console.log("User is signed out or session has expired");
                // Redirect logic or additional logic if user is not authenticated
            }
        });

        // The cleanup function
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
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
