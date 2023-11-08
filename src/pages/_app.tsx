//../src/pages/_app.tsx
import { AppProps } from 'next/app';
import '../styles/globals.css'
import React, { useEffect } from 'react';
import Navbar from "../components/Navigation/Navbar";
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        (async () => {
            try {
                const {initJuno} = await import("@junobuild/core");

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



