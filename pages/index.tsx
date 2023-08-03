import React from "react";
import {
  useAddress,
  useActiveClaimConditionForWallet,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  useTotalCount,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESS } from "../consts/parameters";
import ClaimCard from "../components/ClaimCard/index";
import { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);

  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract);

  const { data: activeClaimPhase, } = useActiveClaimConditionForWallet(contract, address);

  const {
    data: claimIneligibilityReasons,} = useClaimIneligibilityReasons(contract, {
    walletAddress: address || "",
    quantity: 1,
  });

  const { data: totalSupply, } = useTotalCount(contract);
  const { data: totalClaimSupply, } = useTotalCirculatingSupply(contract);

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          {!isContractMetadataLoading && (
              <ClaimCard
                  contractMetadata={contractMetadata}
                  activeClaimPhase={activeClaimPhase}
                  totalSupply={totalSupply?.toNumber()}
                  totalClaimSupply={totalClaimSupply?.toNumber()}
                  claimIneligibilityReasons={claimIneligibilityReasons}
                  address={address}
              />
          )}
        </main>
      </div>
  );
};

export default Home;
