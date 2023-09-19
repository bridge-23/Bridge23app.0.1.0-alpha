//..src/pages/dashboard/[walletAddress].tsx
import {Box, Container} from "@mui/material";
import UserProfileComponent from "../../components/UserProfile";
import React from "react";
import {NextPage} from "next";
import {useAddress, useContract, useOwnedNFTs} from "@thirdweb-dev/react";
import {REWARD_CONTRACT} from "../../consts/parameters";
import LoadingComponent from "../../components/shared/LoadingComponent";
import ErrorComponent from "../../components/shared/ErrorComponent";

const Dashboard: NextPage = () => {
    const address = useAddress();
    const {contract} = useContract(REWARD_CONTRACT);
    const {data: ownedNFTs, isLoading: isOwnedNFTsLoading, error: nftError} = useOwnedNFTs(contract, address);

    if (isOwnedNFTsLoading) {
        return <LoadingComponent/>;
    }
    if (nftError) {
        return <ErrorComponent message="Failed to fetch your NFTs!"/>;
    }

    const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
        if (nft.type === "ERC721") {
            return accumulator + 1;
        } else if (nft.type === "ERC1155" && nft.quantityOwned) {
            return accumulator + (nft.quantityOwned ? Number(nft.quantityOwned) : 0);
        }
        return accumulator;
    }, 0) || 0;

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <Container style={{padding: '24px'}}>
            {address && (

                        <UserProfileComponent
                            address={address}
                            totalNFTs={totalNFTs}
                            truncateAddress={truncateAddress}
                        />

            )}
        </Container>
    );
};
export default Dashboard;
