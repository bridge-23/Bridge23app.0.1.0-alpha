//../src/pages/_app.tsx
import { AppProps } from 'next/app';
import '../lib/Juno/initJuno';
import '../styles/globals.css'
import React, { useEffect } from 'react';
import Navbar from "../components/Navigation/Navbar";
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { initJuno } from "@junobuild/core-peer";
import {useRouter} from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                await initJuno({
                    satelliteId: "kuyff-qaaaa-aaaal-ac5uq-cai",
                });
            } catch (error) {
                console.error('Failed to initialize Juno:', error);
                // Handle the error appropriately
            }
        })();
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage && router.pathname === '/') {
            router.push(lastPage);
        }
    }, [router]);

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



