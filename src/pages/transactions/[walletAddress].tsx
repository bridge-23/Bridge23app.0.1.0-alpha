//..src/pages/transactions
import React, { useState } from 'react';
import { NextPage } from "next";
import { useAddress, useContract, useOwnedNFTs, useNFTs } from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import { Container, Grid, Typography, Skeleton, Box, Table, TableBody, TableCell, TableHead, TableRow, Avatar,Collapse, IconButton  } from '@mui/material';
import LoadingComponent from '../../components/shared/LoadingComponent';
import ErrorComponent from '../../components/shared/ErrorComponent';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NFTDetailsRow: React.FC<{ nft: any }> = ({ nft }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
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
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Attributes
                            </Typography>
                            <Table size="small" aria-label="attributes">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Trait Type</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {nft.metadata.attributes.map((attribute: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{attribute.trait_type}</TableCell>
                                            <TableCell>{attribute.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const Transactions: NextPage = () => {
    const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);
    const { data, isLoading, error } = useNFTs(contract);

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
        <Container style={{ padding: '24px' }}>

            <Typography variant="h3" align="center" style={{ marginBottom: '24px' }}>Transaction</Typography>

            {address ? (
                <div>
                    <Grid container spacing={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
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
                                            <NFTDetailsRow key={nft.metadata.id} nft={nft} />
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No NFTs owned.
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
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

export default Transactions;


