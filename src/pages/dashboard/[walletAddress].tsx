import React from "react";
import { NextPage } from "next";
import { Container, Grid, useMediaQuery, Box } from "@mui/material";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { Theme } from '@mui/material/styles';
import { REWARD_CONTRACT } from "../../consts/parameters";
import UserProfileComponent from "../../components/Dashboard/UserProfileComponent";
import BridgeIdCardComponent from "../../components/Dashboard/BridgeIdCardComponent";
import AccountBalanceCardComponent from "../../components/Dashboard/AccountBalanceCardComponent";
import ExpensesbyCategoryComponent from "../../components/Dashboard/ExpensesbyCategoryComponent";
import LoadingComponent from "../../components/shared/LoadingComponent";
import ErrorComponent from "../../components/shared/ErrorComponent";

const Dashboard: NextPage = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);
    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading, error: nftError } = useOwnedNFTs(contract, address);

    if (isOwnedNFTsLoading) {
        return <LoadingComponent />;
    }
    if (nftError) {
        return <ErrorComponent message="Failed to fetch your NFTs!" />;
    }

    const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
        if (nft.type === "ERC721") {
            return accumulator + 1;
        } else if (nft.type === "ERC1155" && nft.quantityOwned) {
            return accumulator + Number(nft.quantityOwned);
        }
        return accumulator;
    }, 0) || 0;

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <Container style={{
            marginBottom: isMobile ? '118px' : '62px',
            padding: isMobile ? 'initial' : '24px'
        }}>
            <Box
                sx={{
                    perspective: '1000px',
                    width: '100%', // always full width
                    height: '200px',
                    marginBottom: isMobile ? '16px' : '24px', // add some margin for spacing
                    cursor: 'pointer',
                }}
            >
                <AccountBalanceCardComponent />
            </Box>

            <Box px={isMobile ? 2 : 0}>  {/* Conditional padding based on isMobile */}
                <Grid container spacing={isMobile ? 2 : 4} direction="row" alignItems="stretch">
                    {address && (
                        <Grid item xs={12} md={6}>
                            <UserProfileComponent
                                address={address}
                                totalNFTs={totalNFTs}
                            />
                        </Grid>
                    )}

                    <Grid item xs={12} md={6}>
                        <ExpensesbyCategoryComponent />
                    </Grid>

                    {address && (
                        <Grid item xs={12} md={6}>
                            <BridgeIdCardComponent
                                address={address}
                                totalNFTs={totalNFTs}
                                truncateAddress={truncateAddress}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
};
export default Dashboard;

