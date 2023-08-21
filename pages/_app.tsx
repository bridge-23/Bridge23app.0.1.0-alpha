import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
//import Footer from "../components/Footer";
import {useEffect, useState} from 'react';
import {BigNumber} from "ethers";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
    const [page, setPage] = useState(1);
    const nftsPerPage = 50; // Example value
    const totalCount = BigNumber.from(100); // Example value, replace with your logic
    const loading = false; // Example value, replace with your logic

  useEffect(() => {
    //const clientId = process.env.CLIENT_ID;
    //const secretKey = process.env.SECRET_KEY;
    // Use the clientId and secretKey as needed in your application logic.
    // For example, you can pass them as props to other components or use them in API calls.
  }, []);

  return (
    <ThirdwebProvider activeChain={activeChain} clientId="2867a6c88b51123785769fee002655e9">
      <Navbar />

        <Component {...pageProps} />

    </ThirdwebProvider>
  );
}
export default MyApp;
