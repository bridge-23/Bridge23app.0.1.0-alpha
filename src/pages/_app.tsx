//../src/pages/_app.tsx
import { AppProps } from 'next/app';
import '../lib/Juno/initJuno';
import '../styles/globals.css'
import React, { useEffect } from 'react';
import Navbar from "../components/Navigation/Navbar";
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { initializeJuno } from '../lib/Juno/initJuno';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        initializeJuno().catch(error => {
            console.error('Failed to initialize Juno:', error);
        });
    }, []);

    return (
        <AuthProvider> {/* Wrap your app with AuthProvider */}
            <ColorModeProvider>
                <Navbar />
                <Component {...pageProps} />
            </ColorModeProvider>
        </AuthProvider>
    );
}
export default MyApp;



