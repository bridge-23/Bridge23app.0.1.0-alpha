//..src/dashboard/[walletAddress].tsx
import React, { useState, useEffect } from 'react';
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
import { auth } from "../../lib/initFirebase";
import NewAccountComponent from "../../components/Accounts/NewAccountComponent";
import AccountsList from "../../components/Dashboard/AccountsList";
import AddExpense from "../../components/Dashboard/AddExpense";

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
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
        if (nft.type === "ERC721") {
            return accumulator + 1;
        } else if (nft.type === "ERC1155" && nft.quantityOwned) {
            return accumulator + Number(nft.quantityOwned);
        }
        return accumulator;
    }, 0) || 0;

    const truncateUid = (uid: string) => {
        return `${uid.slice(0, 6)}...${uid.slice(-4)}`;
    };

    const user = auth.currentUser;
    const uid = user ? user.uid : null;

//TODO: make all to db dont use base

    return (
        <Container
            sx={{
                marginBottom: isMobile ? '118px' : '62px',
                padding: isMobile ? 'initial' : '24px',
            }}
        >
            <Box
                sx={{
                    perspective: '1000px',
                    width: '100%',
                    height: '200px',
                    marginBottom: isMobile ? '16px' : '24px',
                    cursor: 'pointer',
                }}
            >
                <AccountBalanceCardComponent />
            </Box>

            <Box px={isMobile ? 2 : 0}>
                <Grid container spacing={isMobile ? 2 : 4} direction="row" alignItems="stretch">
                    {address && (
                        <Grid item xs={12} md={4} lg={3}>
                            <UserProfileComponent address={address} totalNFTs={totalNFTs} />
                        </Grid>
                    )}

                    <Grid item xs={12} md={4} lg={3}>
                        <ExpensesbyCategoryComponent />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <NewAccountComponent />
                    </Grid>

                    {address && (
                        <Grid item xs={12} md={4} lg={3}>
                            <BridgeIdCardComponent
                                uid={uid}
                                address={address}
                                totalNFTs={totalNFTs}
                                truncateUid={truncateUid}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>

            <Box px={isMobile ? 2 : 0}>
                <Grid container spacing={isMobile ? 2 : 4} direction="row" alignItems="stretch">
                    <Grid item xs={12} md={4} lg={3}>
                        <AddExpense
                            open={open}
                            onClose={handleClose}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AccountsList />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
export default Dashboard;
