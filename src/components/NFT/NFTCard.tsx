import { ThirdwebNftMedia,useNFTBalance,useAddress,useContract } from '@thirdweb-dev/react';
//import { NFTBalance } from '@/hooks/useNFTBalance';
import styles from '../../styles/NFTCard.module.css';
import React from "react";
import { REWARD_CONTRACT } from '../../consts/parameters';

type NFTCardProps = {
    metadata: {
        id: string;
        name?: string | number | null;
        uri: string;
        quantityOwned: number;
    };
};

const NFTCard: React.FC<NFTCardProps> = ({ metadata }) => {
    const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);
    const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, address, metadata.id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    const truncateName = (name: string | number | null | undefined): string => {
        if (typeof name === 'string') {
            return name.length > 10 ? `${name.slice(0, 8)}...${name.slice(-2)}` : name;
        } else if (typeof name === 'number') {
            const strName = name.toString();
            return strName.length > 10 ? `${strName.slice(0, 8)}...${strName.slice(-2)}` : strName;
        } else {
            return "Unknown";
        }
    };

    return (
        <div className={styles.NFTCard}>

            <div className={styles.mediaContainer}>
                <div className={styles.nftCountBadge}>
                    <h3>X{ownerBalance?.toString()}</h3>
                </div>
                <ThirdwebNftMedia metadata={metadata} />
            </div>
            <h3> {truncateName(metadata.name)} </h3>
            <h3>Token id: {metadata.id}</h3>
        </div>
    );
};

export default NFTCard;


// <h3>Total owned: {ownerBalance?.toString()} </h3> {/* Convert BigNumber to string */}
