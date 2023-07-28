import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../Components/navbar";
import { useEffect } from 'react';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const clientId = process.env.CLIENT_ID;
    const secretKey = process.env.SECRET_KEY;

    // Use the clientId and secretKey as needed in your application logic.
    // For example, you can pass them as props to other components or use them in API calls.

  }, []);

  return (
    <ThirdwebProvider activeChain={activeChain} clientId="0f7b5a725f342d3d2ffe12e6303b0f4b">
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
