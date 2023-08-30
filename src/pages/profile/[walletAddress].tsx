import React from 'react';
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import NFTCard from '../../components/NFT/NFTCard';
import { Container, Grid, Typography, CircularProgress, Divider } from '@mui/material';
import {NextPage} from "next";


const Profile: NextPage = () =>  {
    const address = useAddress();
    const { contract} = useContract(REWARD_CONTRACT);
    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading,} = useOwnedNFTs(contract, address);

    const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
        if (nft.type === "ERC721") {
            return accumulator + 1;  // For each ERC721 token, count as 1
        } else if (nft.type === "ERC1155" && nft.quantityOwned) {
            return accumulator + (nft.quantityOwned ? Number(nft.quantityOwned) : 0);
        }
        return accumulator; // Continue the accumulation
    }, 0) || 0;


    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <Container>
            {address ? (
                <div>
                    <Typography variant="h3" gutterBottom>
                        Profile
                    </Typography>
                    <Divider />
                    <Typography variant="h6">
                        Bridge id: {truncateAddress(address || '')}
                    </Typography>
                    <Divider />
                    <Typography variant="h6">Total NFTs Owned: {totalNFTs}</Typography>
                    <Divider />
                    <Grid container spacing={3}>
                        {!isOwnedNFTsLoading ? (
                            ownedNFTs?.length! > 0 ? (
                                ownedNFTs?.map((nft) => (
                                    <Grid item xs={12} sm={6} md={4} key={nft.metadata.id}>
                                        <NFTCard
                                            metadata={{
                                                ...nft.metadata,
                                                quantityOwned: nft.quantityOwned ? Number(nft.quantityOwned) : 0,
                                            }}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Typography>No NFTs owned.</Typography>
                            )
                        ) : (
                            <CircularProgress />
                        )}
                    </Grid>
                </div>
            ) : (
                <div>
                    <Typography variant="h6">Connect your wallet to view your profile.</Typography>
                </div>
            )}
            <Divider />
        </Container>
    );
};

export default Profile;

/*
export const getServerSideProps = async (context) => {
    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading,} = useOwnedNFTs(contract, address);

    const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
        if (nft.type === "ERC721") {
            return accumulator + 1;  // For each ERC721 token, count as 1
        } else if (nft.type === "ERC1155" && nft.quantityOwned) {
            return accumulator + (nft.quantityOwned ? Number(nft.quantityOwned) : 0);
        }
        return accumulator; // Continue the accumulation
    }, 0) || 0;

    return {
        props: {
            totalNFTs,
            ownedNFTs // if you want to pass this as well
        }
    };
};*/
