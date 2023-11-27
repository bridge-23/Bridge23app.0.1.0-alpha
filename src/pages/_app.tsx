//../src/pages/_app.tsx
// Bridge 23 App
// Copyright (C) 2023 Bridge23 Inc. All Rights Reserved.
//
// This file is part of the Bridge 23 App.
//
// The Bridge 23 App is private software; you cannot use, modify, copy,
// or distribute it without the express permission of the author.
// For further details, see the LICENSE file or contact info@bridge23.app.

import { AppProps } from 'next/app';
import '../lib/Juno/initJuno';
import '../styles/globals.css'
import React, { useEffect } from 'react';
import Navbar from "../components/Navigation/Navbar";
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { initJuno } from "@junobuild/core-peer";
import {useRouter} from "next/router";
import { LoadingProvider } from '../contexts/LoadingContext';
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
        if (lastPage && router.pathname === '/dashboard') {
            router.push(lastPage);
        }
    }, [router]);

    return (
        <LoadingProvider>
            <AuthProvider>
                <ColorModeProvider>
                    <Navbar />
                    <Component {...pageProps} />
                </ColorModeProvider>
            </AuthProvider>
        </LoadingProvider>
    );
}
export default MyApp;



