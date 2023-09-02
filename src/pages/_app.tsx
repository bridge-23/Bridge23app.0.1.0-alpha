import type {AppProps} from "next/app";
import React from 'react';
import {ThirdwebProvider} from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import {useEffect, useState} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from '@mui/material/styles';
import theme from "../theme";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../dev";
//import Footer from "../components/Footer";
//import {BigNumber} from "ethers";

const activeChain = "mumbai";

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        //const clientId = process.env.CLIENT_ID;
        //const secretKey = process.env.SECRET_KEY;
        // Use the clientId and secretKey as needed in your application logic.
        // For example, you can pass them as props to other components or use them in API calls.
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <ThirdwebProvider activeChain={activeChain} clientId="a438ed0706431cf7f53ae4cdbee427a7">
                <Navbar/>

                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <Component {...pageProps} />
                </DevSupport>

            </ThirdwebProvider>
        </ThemeProvider>
    );
}

export default MyApp;
