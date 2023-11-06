//../src/pages/_app.tsx
import { AppProps } from 'next/app';
import '../lib/Juno/initJuno';
import '../styles/globals.css'
import React, { useEffect } from 'react';
import Navbar from "../components/Navigation/Navbar";
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { initJuno } from "@junobuild/core";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        (async () => {
            try {
                await initJuno({
                    satelliteId: process.env.NEXT_PUBLIC_JUNO_ID as string,
                });
            } catch (error) {
                console.error('Failed to initialize Juno:', error);
                // Handle the error appropriately
            }
        })();
    }, []);

    return (
        <AuthProvider>
            <ColorModeProvider>
                <Navbar />
                <Component {...pageProps} />
            </ColorModeProvider>
        </AuthProvider>
    );
}
export default MyApp;



