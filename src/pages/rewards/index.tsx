//..src/pages/rewards/index.tsx
import {ThirdwebNftMedia, useAddress, useContract, useNFT} from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Typography, ListSubheader, Container, LinearProgress, Box} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/lab/Alert';
import { useRouter } from 'next/router';
import React from "react";

const RewardsPage: React.FC = () => {
    const router = useRouter();
    const address = useAddress();
    const {contract: rewardContract} = useContract(REWARD_CONTRACT);

    const {data: nft0, isLoading: isLoading0, error: error0} = useNFT(rewardContract, 0);
    const {data: nft1, isLoading: isLoading1, error: error1} = useNFT(rewardContract, 1);

    if (isLoading0 || isLoading1) {
        return <LinearProgress />;
    }

    if (error0 || error1) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">
                    Error fetching the rewards: {JSON.stringify(error0 || error1)}
                </Alert>
            </Box>
        );
    }

    const nfts = [nft0, nft1].filter(Boolean);

    return (
        <Container style={{ padding: '24px' }}>
            <Typography variant="h3" align="center"> Rewards </Typography>

            <ImageList sx={{ width: 'auto', height: 'auto' }}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">Cash back</ListSubheader>
                </ImageListItem>
                {nfts.map((nft: any) => (
                    <ImageListItem
                        key={nft.metadata.id}
                        sx={{ width: '100%', height: 450}}
                        onClick={() => {
                            router.push(`/claim/${address}`);
                        }}
                    >
                        <ThirdwebNftMedia metadata={nft.metadata} />
                        <ImageListItemBar
                            title={nft.metadata.name}
                            subtitle={`Token id: ${nft.metadata.id}`}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${nft.metadata.name}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
};

export default RewardsPage;

