import { ThirdwebNftMedia } from '@thirdweb-dev/react';
//import { NFTBalance } from '@/hooks/useNFTBalance';
import styles from '../../styles/Home.module.css';
import React from "react";

type NFTCardProps = {
    metadata: {
        id: string;
        name?: string | number | null;
        uri: string;
        // Add other properties as needed
    };
};

const NFTCard: React.FC<NFTCardProps> = ({ metadata }) => {
    return (
        <div className={styles.NFTCard}>
            <ThirdwebNftMedia metadata={metadata} />
            <h3>{metadata.name}</h3>
            <h2>{metadata.id}</h2>
        </div>
    );
};

export default NFTCard;
