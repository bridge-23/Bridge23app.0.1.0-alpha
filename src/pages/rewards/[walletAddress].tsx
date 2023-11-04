//..src/pages/rewards/[userKey].tsx
import React from "react";
import {useAddress, useContract, useNFT} from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import { useMediaQuery,ImageList, ImageListItem, ImageListItemBar,Avatar, IconButton, Typography, ListSubheader, Container, LinearProgress, Box} from '@mui/material';
import { Theme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/lab/Alert';
import { useRouter } from 'next/router';

const RewardsPage: React.FC = () => {
    const router = useRouter();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const address = useAddress();
    const {contract: rewardContract} = useContract(REWARD_CONTRACT);

    const {data: nft1, isLoading: isLoading1, error: error1} = useNFT(rewardContract, 1);
    const {data: nft2, isLoading: isLoading2, error: error2} = useNFT(rewardContract, 2);
    const {data: nft3, isLoading: isLoading3, error: error3} = useNFT(rewardContract, 3);
    const {data: nft4, isLoading: isLoading4, error: error4} = useNFT(rewardContract, 4);

    if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
        return <LinearProgress />;
    }

    if (error1 || error2 || error3 || error4) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">
                    Error fetching the rewards: {JSON.stringify(error1 || error2 || error3 || error4)}
                </Alert>
            </Box>
        );
    }

    const nfts = [nft1, nft2, nft3, nft4].filter(Boolean);

    return (
        <Container >
            <Typography variant="h3" align="center"> Rewards </Typography>

            <ImageList sx={isMobile ? { width: '100%', height: 'auto', margin: '0 auto' } : { width: 500, height: 450, margin: '0 auto' }}>
                <ImageListItem key="Subheader" cols={isMobile ? 2 : 2}>

                <ListSubheader component="div">Cash back</ListSubheader>
                </ImageListItem>

                {nfts.map((nft: any) => (
                    <ImageListItem
                        key={nft.metadata.id}
                        sx={isMobile ? { width: '100%', height: 'auto' } : { width: 200, height: 200 }}
                        onClick={() => {
                            router.push(`/claim/${address}`);
                        }}
                    >
                        <Avatar
                            src={`${nft.metadata.image}?w=248&fit=crop&auto=format`}
                            srcSet={`${nft.metadata.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={nft.metadata.name}
                            variant="square"
                            sx={isMobile ? { width: '100%', height: 'auto' } : { width: 200, height: 200 }}
                        />

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

