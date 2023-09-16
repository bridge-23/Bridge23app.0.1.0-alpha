import React from 'react';
import { NextPage } from "next";
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import UserProfileComponent from "../../components/UserProfile";
import { Container, Grid, Typography, Skeleton, Box, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from '@mui/material';
import LoadingComponent from '../../components/shared/LoadingComponent';
import ErrorComponent from '../../components/shared/ErrorComponent';


const Profile: NextPage = () => {
    const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);

    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading,error: nftError } = useOwnedNFTs(contract, address);

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
            return accumulator + (nft.quantityOwned ? Number(nft.quantityOwned) : 0);
        }
        return accumulator;
    }, 0) || 0;

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <Container style={{ padding: '24px'}}>
            {address ? (
                <div>
                    <Box marginBottom={4}>
                        <UserProfileComponent
                            address={address}
                            totalNFTs={totalNFTs}
                            truncateAddress={truncateAddress}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Value</TableCell>
                                    {/* ... Add more headers as needed ... */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isOwnedNFTsLoading ? (
                                    ownedNFTs?.length! > 0 ? (
                                        ownedNFTs?.map((nft) => (
                                            <TableRow key={nft.metadata.id}>
                                                <TableCell>
                                                    <Avatar
                                                        src={nft.metadata.image || ''}
                                                        variant="square"
                                                        sx={{ width: 50, height: 50 }}
                                                    />
                                                </TableCell>
                                                <TableCell>{nft.metadata.name}</TableCell>
                                                <TableCell>{nft.quantityOwned}</TableCell>
                                                {/* ... Add more cells for other metadata ... */}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                No NFTs owned.
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            <Skeleton variant="rectangular" width="100%" height={50} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </Grid>
                </div>
            ) : (
                <div>
                    <Typography variant="h6">Connect your wallet to view your profile.</Typography>
                </div>
            )}
        </Container>
    );
};

export default Profile;


