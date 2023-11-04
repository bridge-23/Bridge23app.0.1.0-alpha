//..src/dashboard/[userKey].tsx
import React, {useState, useEffect, useContext} from 'react';
import { NextPage } from "next";
import { Container, Grid, useMediaQuery, Box } from "@mui/material";
import { Theme } from '@mui/material/styles';
import UserProfileComponent from "../../components/Dashboard/UserProfileComponent";
import AccountBalanceCardComponent from "../../components/Dashboard/AccountBalanceCardComponent";
import ExpensesbyCategoryComponent from "../../components/Dashboard/ExpensesbyCategoryComponent";
import NewAccountComponent from "../../components/Accounts/NewAccountComponent";
import AccountsList from "../../components/Dashboard/AccountsList";
import AddExpense from "../../components/Dashboard/AddExpense";
import {AuthContext} from "../../contexts/AuthContext";
import {useRouter} from "next/router";
/*import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import LoadingComponent from "../../components/shared/LoadingComponent";
import ErrorComponent from "../../components/shared/ErrorComponent";
import { auth } from "../../lib/initFirebase";
import BridgeIdCardComponent from "../../components/Dashboard/BridgeIdCardComponent";
import { REWARD_CONTRACT } from "../../consts/parameters";*/
const Dashboard: NextPage = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    /*const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);
    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading, error: nftError } = useOwnedNFTs(contract, address);

    if (isOwnedNFTsLoading) {
        return <LoadingComponent />;
    }
    if (nftError) {
        return <ErrorComponent message="Failed to fetch your NFTs!" />;
    }*/
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    /*const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
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
    const uid = user ? user.uid : null;*/

//TODO: make all to db dont use base

    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px',}}>
            <Box px={isMobile ? 2 : 0}>
                <Grid container spacing={isMobile ? 2 : 4} direction="row" alignItems="stretch">

                    {/* First row of cards */}
                    <Grid item xs={12} md={4}>
                        <AccountBalanceCardComponent />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <UserProfileComponent/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ExpensesbyCategoryComponent />
                    </Grid>

                    {/* Second row of cards */}
                    <Grid item xs={12} md={4}>
                        <NewAccountComponent />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <AddExpense open={open} onClose={handleClose}/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <AccountsList />
                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
};
export default Dashboard;


{/*{address && (
                        <Grid item xs={12} md={4} lg={3}>
                            <BridgeIdCardComponent
                                uid={uid}
                                address={address}
                                totalNFTs={totalNFTs}
                                truncateUid={truncateUid}
                            />
                        </Grid>
                    )}*/}