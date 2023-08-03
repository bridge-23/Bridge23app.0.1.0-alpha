import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css'
import { BURN_ADDRESS } from '../../consts/parameters';
import NFTCard from "../../components/NFT/NftCard";

export default function Profile() {
    const address = useAddress();

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const {
        contract
    } = useContract(BURN_ADDRESS);

    const {
        data: ownedNFTs,
        isLoading: isOwnedNFTsLoading,
    } = useOwnedNFTs(contract, address);

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
                        <h3>My Items:</h3>
                        <div className={styles.grid}>
                            {!isOwnedNFTsLoading ? (
                                ownedNFTs?.length! > 0 ? (
                                    ownedNFTs?.map((nft) => (
                                        <NFTCard key={nft.metadata.id} metadata={nft.metadata} />
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

        </div>
    )
}