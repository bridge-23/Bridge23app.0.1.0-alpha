import { useEffect, useState } from "react";
import {
    useAddress,
    useClaimIneligibilityReasons,
    useContract,
    useContractMetadata,
    useTotalCirculatingSupply,
    useTotalCount,
    Web3Button
} from "@thirdweb-dev/react";
import styles from "../styles/ClaimCard.module.css";
import { useRouter } from "next/router";
import {ethers} from "ethers";
import { CONTRACT_ADDRESS } from "../const/addresses";

interface ClaimCardProps {
    contractMetadata: {
        name: string;
        description: string;
        image: string;
    };
    activeClaimPhase?: {
        metadata: {
            name: string;
        };
        price: string; // Use the appropriate Thirdweb SDK hook to fetch the price as a string
    };
    totalClaimSupply?: number; // Use the appropriate Thirdweb SDK hook to fetch the totalClaimSupply
    totalSupply?: number; // Use the appropriate Thirdweb SDK hook to fetch the totalSupply
    claimIneligibilityReasons?: string[];
    contractAddress: string;
}

const ClaimCards: React.FC<ClaimCardProps> = ({
                                                 contractMetadata,
                                                 activeClaimPhase,
                                                 totalClaimSupply,
                                                 totalSupply,
                                                 claimIneligibilityReasons,
                                                 contractAddress,
                                             }) => {
    const address = useAddress();
    const router = useRouter();
    const maxClaimQuantity = 2;

/*    const { contract} = useContract(CONTRACT_ADDRESS);
    const { data: contractMetadata, isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);*/

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
        <div className={styles.NFTCard}>
            <div className={styles.collectionImage}>
                <img src={contractMetadata.image} alt={contractMetadata.name} />
            </div>
            <div className={styles.cardContent}>
                <h1>{contractMetadata.name}</h1>
                <p>{contractMetadata.description}</p>
                {!activeClaimPhase ? (
                    <div>
                        <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                        <p>Price: {ethers.utils.formatUnits(activeClaimPhase?.price!)}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                {!totalSupply || !totalClaimSupply ? (
                    <p>Loading...</p>
                ) : (
                    <p>
                        Claimed: {totalClaimSupply.toNumber()} / {totalSupply.toNumber()}
                    </p>
                )}
                {address ? (
                    claimIneligibilityReasons ? (
                        claimIneligibilityReasons.length > 0 ? (
                            claimIneligibilityReasons.map((reason, index) => (
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
                                        >
                                            -
                                        </button>
                                        <input
                                            className={styles.claimInput}
                                            type="number"
                                            value={claimQuantity}
                                        />
                                        <button
                                            className={styles.claimBtn}
                                            onClick={increment}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <Web3Button
                                        contractAddress={contractAddress}
                                        action={(contract) => contract.erc721.claim(claimQuantity)}
                                        onSuccess={() => router.push(`/profile/${address}`)}
                                    >
                                        Claim NFT
                                    </Web3Button>
                                </div>
                            </div>
                        )
                    ) : (
                        <p>Checking Eligibility...</p>
                    )
                ) : (
                    <p>Connect Wallet to claim</p>
                )}
            </div>
        </div>
    );
};

export default ClaimCards;
