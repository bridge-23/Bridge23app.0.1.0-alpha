import React from 'react';
import {
    MediaRenderer,
    Web3Button,
} from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from "../../consts/parameters";
import styles from "../../styles/ClaimCard.module.css";
import router from 'next/router';

type ClaimCardProps = {
    contractMetadata: {
        name?: string;
        description?: string;
        image?: string;
    };
    activeClaimPhase: {
        metadata?: { name?: string };
        price?: string;
    };
    totalSupply?: number;
    totalClaimSupply?: number;
    claimIneligibilityReasons?: string[];
    address?: string;
};

const ClaimCard: React.FC<ClaimCardProps> = ({
                                                 contractMetadata,
                                                 activeClaimPhase,
                                                 totalSupply,
                                                 totalClaimSupply,
                                                 claimIneligibilityReasons,
                                                 address,
                                             }) => {
    const maxClaimQuantity = 2;
    const [claimQuantity, setClaimQuantity] = React.useState(1);

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
        <div className={styles.heroSection}>
            <div className={styles.collectionImage}>
                <MediaRenderer src={contractMetadata?.image} />
            </div>
            <div>
                <h1>{contractMetadata?.name}</h1>
                <p>{contractMetadata?.description}</p>
                <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                <p>Price: {activeClaimPhase?.price ? ethers.utils.formatUnits(activeClaimPhase.price) : 'Loading...'}</p>
                <p>Claimed: {totalClaimSupply} / {totalSupply}</p>
                {address ? (
                    !claimIneligibilityReasons?.length ? (
                        <div>
                            <p>Eligible to claim</p>
                            <div className={styles.claimContainer}>
                                <div className={styles.claimValue}>
                                    <button className={styles.claimBtn} onClick={decrement}>-</button>
                                    <input className={styles.claimInput} type="number" value={claimQuantity} readOnly />
                                    <button className={styles.claimBtn} onClick={increment}>+</button>
                                </div>
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => contract.erc721.claim(claimQuantity)}
                                    onSuccess={() => router.push(`/profile/${address}`)}
                                >
                                    Claim NFT
                                </Web3Button>
                            </div>
                        </div>
                    ) : (
                        claimIneligibilityReasons.map((reason, index) => <p key={index}>{reason}</p>)
                    )
                ) : (
                    <p>Connect Wallet to claim</p>
                )}
            </div>
        </div>
    );
};

export default ClaimCard;
