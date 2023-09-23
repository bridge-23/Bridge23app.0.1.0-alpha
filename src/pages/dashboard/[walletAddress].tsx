//..src/pages/dashboard/[walletAddress].tsx
import React from "react";
import {NextPage} from "next";
import {Container, Grid, useMediaQuery, Card, Typography, CardContent, Box } from "@mui/material";
import {useAddress, useContract, useOwnedNFTs} from "@thirdweb-dev/react";
import { Theme } from '@mui/material/styles';
import {REWARD_CONTRACT} from "../../consts/parameters";
import UserProfileComponent from "../../components/UserProfile";
import BridgeIdCardComponent from "../../components/BridgeIdCardComponent";
import LoadingComponent from "../../components/shared/LoadingComponent";
import ErrorComponent from "../../components/shared/ErrorComponent";
//import { PieChart } from '@mui/x-charts';
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import dynamic from 'next/dynamic';

const PieChartDynamic = dynamic(() => import('@mui/x-charts').then(mod => mod.PieChart), {
    ssr: false,
});


const Dashboard: NextPage = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
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

// TODO: make component for balances and category expenses

    return (
        <Container style={{padding: '24px', marginBottom: '62px'}}>
            <Grid container spacing={isMobile ? 2 : 4} direction={isMobile ? "column" : "row"} alignItems="stretch">
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            perspective: '1000px',
                            width: '300px',
                            height: '200px',
                            cursor: 'pointer',
                            borderRadius: '18px'
                        }}
                    >
                        <CardContent>
                            <Typography variant="subtitle1" align="center">Accounts balance</Typography>
                            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}> $111,000.00 </Typography>

                            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <ArrowCircleUpOutlinedIcon style={{ color: 'green', marginRight: '8px' }} fontSize="large" />
                                    <div>
                                        <Typography variant="subtitle1" color="textSecondary">Income</Typography>
                                        <Typography variant="h6" style={{ color: 'green' }}>$97,000.00</Typography>
                                    </div>
                                </Box>

                                <Box display="flex" alignItems="center">
                                    <ArrowCircleDownOutlinedIcon style={{ color: 'red', marginRight: '8px' }} fontSize="large" />
                                    <div>
                                        <Typography variant="subtitle1" color="textSecondary">Expenses</Typography>
                                        <Typography variant="h6" style={{ color: 'red' }}>$100</Typography>
                                    </div>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
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

                {address && (
                    <Grid item xs={12} md={6}>
                        <UserProfileComponent
                            address={address}
                            totalNFTs={totalNFTs}
                        />
                    </Grid>
                )}

                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            perspective: '1000px',
                            width: '300px',
                            height: '200px',
                            cursor: 'pointer',
                            borderRadius: '18px'
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            align="center"
                            gutterBottom // adds a margin-bottom for space
                        >
                            Expenses by category
                        </Typography>
                        <PieChartDynamic
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'Pets' },
                                        { id: 1, value: 15, label: 'Base' },
                                        { id: 2, value: 20, label: 'Travel' },
                                    ],
                                },
                            ]}
                            width={280} // Reduced width to account for card padding
                            height={130} // Reduced height for same reason
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Dashboard;
