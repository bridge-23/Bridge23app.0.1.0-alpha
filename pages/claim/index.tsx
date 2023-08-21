import { useContract } from "@thirdweb-dev/react";
//import { BaseContract } from "ethers";
import type { NextPage } from "next";
import { REWARD_CONTRACT } from "../../consts/parameters";
import styles from "../../styles/Home.module.css";

const Claim: NextPage = () => {
   // const address = useAddress();
    const { contract: rewardContract } = useContract(REWARD_CONTRACT);
    const exchangeTokensHandler = async () => {
        // Replace these with actual values or inputs
        const ruleId = 0;
        const tokenIds = [1];
        const tokenAmounts = [100];

        try {
            const tx = await rewardContract?.call("exchangeTokens", [ruleId, tokenIds, tokenAmounts]);
            // Wait for the transaction to be confirmed, if necessary

            if (tx && tx.wait) {
                await tx.wait();
            }
            alert("Tokens exchanged successfully!");

        } catch (error) {
            console.error("Error exchanging tokens:", error);
            alert("Failed to exchange tokens. Please try again.");
        }
    };

/*    const mintRewardNft = async (reward_Contract: SmartContract<BaseContract>) => {
        // 1. Check the approval of the RewardNft contract to burn the user's serum tokens
        const hasApproval = await rewardContract?.call("isApprovedForAll", [
            address,
            rewardContract?.getAddress(),
        ]);
        const balance = await rewardContract?.call("balanceOf", [address, 0]);

        if (!hasApproval) {
            // Set approval
            await rewardContract?.call("setApprovalForAll", [
                rewardContract?.getAddress(),
                true,
            ]);
        }

        if (balance < 1) {
            return alert("Not enough burn tokens");
        }

        await rewardContract?.call("claim", [address, 1]);
    };*/
/*    function addExchangeRule(
        uint _anyTokenAmounts,
        uint _rewardTokenId,
        uint _rewardTokenAmount
) external
    let onlyOwner;
    onlyOwner*/

    return (
        <div className={styles.container} style={{ marginTop: "3rem" }}>
            {/* ...existing content... */}
            <button onClick={exchangeTokensHandler}>
                Exchange Tokens
            </button>
        </div>
    );
};

export default Claim;


/*import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
    MediaRenderer,
    Web3Button,
    useActiveClaimConditionForWallet,
    useAddress,
    useClaimIneligibilityReasons,
    useContract,
    useContractMetadata,
    useTotalCirculatingSupply,
    useTotalCount
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../consts/parameters";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
    const address = useAddress();
    const router = useRouter();
    const maxClaimQuantity = 2;

    const {
        contract
    } = useContract(CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: activeClaimPhase,
        isLoading: isActiveClaimPhaseLoading,
    } = useActiveClaimConditionForWallet(contract, address);

    const {
        data: claimIneligibilityReasons,
        isLoading: isClaimIneligibilityReasonsLoading,
    } = useClaimIneligibilityReasons(
        contract,
        {
            walletAddress: address || "",
            quantity: 1,
        }
    );

    const {
        data: totalSupply,
        isLoading: isTotalSupplyLoading,
    } = useTotalCount(contract);

    const {
        data: totalClaimSupply,
        isLoading: isTotalClaimSupplyLoading,
    } = useTotalCirculatingSupply(contract);

    const [claimQuantity, setClaimQuantity] = useState(1);
    const increment = () => {
        if (claimQuantity < maxClaimQuantity) {
            setClaimQuantity(claimQuantity + 1);
        }
    };
    const decrement = () => {
        if (claimQuantity > 1) {
            setClaimQuantity(claimQuantity - 1);
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {!isContractMetadataLoading && (
                    <div className={styles.heroSection}>
                        <div className={styles.collectionImage}>
                            <MediaRenderer
                                src={contractMetadata?.image}
                            />
                        </div>
                        <div>
                            <h1>{contractMetadata?.name}</h1>
                            <p>{contractMetadata?.description}</p>
                            {!isActiveClaimPhaseLoading ? (
                                <div>
                                    <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                                    <p>Price: {ethers.utils.formatUnits(activeClaimPhase?.price!)}</p>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                            {!isTotalSupplyLoading && !isTotalClaimSupplyLoading ? (
                                <p>Claimed: {totalClaimSupply?.toNumber()} / {totalSupply?.toNumber()}</p>
                            ) : (
                                <p>Loading...</p>
                            )}
                            {address ? (
                                !isClaimIneligibilityReasonsLoading ? (
                                    claimIneligibilityReasons?.length! > 0 ? (
                                        claimIneligibilityReasons?.map((reason, index) => (
                                            <p key={index}>{reason}</p>
                                        ))
                                    ) : (
                                        <div>
                                            <p>Eligible to claim</p>
                                            <div className={styles.claimContainer}>
                                                <div className={styles.claimValue}>
                                                    <button
                                                        className={styles.claimBtn}
                                                        onClick={decrement}
                                                    >-</button>
                                                    <input
                                                        className={styles.claimInput}
                                                        type="number"
                                                        value={claimQuantity}
                                                    />
                                                    <button
                                                        className={styles.claimBtn}
                                                        onClick={increment}
                                                    >+</button>
                                                </div>
                                                <Web3Button
                                                    contractAddress={CONTRACT_ADDRESS}
                                                    action={(contract) =>  contract.erc721.claim(claimQuantity)}
                                                    onSuccess={() => router.push(`/profile/${address}`)}
                                                >Claim NFT</Web3Button>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <p>Checking Eligibility...</p>
                                )
                            ) : (
                                <p>Connect Wallet to claim</p>
                            )}
                            <div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;*/

/*import React from "react";
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

export default Home;*/