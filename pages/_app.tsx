import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../Components/navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThirdwebProvider activeChain={activeChain} clientId="43fb0cedb2a9e9359d2103814a1be01b">
        <Navbar />
        <Component {...pageProps} />
      </ThirdwebProvider>
  );
}

export default MyApp;