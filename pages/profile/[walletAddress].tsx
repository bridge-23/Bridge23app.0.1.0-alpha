import {useAddress, useContract, useOwnedNFTs} from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css'
import { REWARD_CONTRACT } from '../../consts/parameters';
import NFTCard from "../../components/NFT/NFTCard";
import {NextPage} from "next";
import React from "react";

const Profile: NextPage = () =>  {
    const address = useAddress();

    const { contract} = useContract(REWARD_CONTRACT);

    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading,} = useOwnedNFTs(contract, address);

    const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
        if (nft.type === "ERC721") {
            return accumulator + 1;  // For each ERC721 token, count as 1
        } else if (nft.type === "ERC1155" && nft.quantityOwned) {
            return accumulator + Number(nft.quantityOwned); // Convert to Number and add
        }
        return accumulator; // Continue the accumulation
    }, 0) || 0;


    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className={styles.container}>
            {address ? (
                <div>
                    <div>
                        <h1>Profile</h1>
                        <p>Bridge id: {truncateAddress(address || "")}</p>
                    </div>
                    <hr />
                    <div>
                        <h3>Total NFTs Owned: {totalNFTs}</h3>
                        <hr />
                        <div className={styles.grid}>
                            {!isOwnedNFTsLoading ? (
                                ownedNFTs?.length! > 0 ? (
                                    ownedNFTs?.map((nft) => (
                                        <NFTCard
                                            key={nft.metadata.id}
                                            metadata={{
                                                ...nft.metadata,
                                                quantityOwned: nft.quantityOwned
                                            }}
                                        />
                                    ))
                                ) : (
                                    <p>No NFTs owned.</p>
                                )
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.main}>
                    <p>Connect your wallet to view your profile.</p>
                </div>
            )}
            <hr />
        </div>
    )
}

export default Profile;