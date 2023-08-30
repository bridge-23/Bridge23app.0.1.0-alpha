import React, { useState, useEffect } from 'react';
import {
    useAddress,
    useContract,
    useOwnedNFTs,
    MediaRenderer,
    useNFT,
} from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import type { NextPage } from "next";


type ContractMetadata = {
    name?: string| number | null;
    description?: string;
    image?: any;
};

const Claim: NextPage<{ contractMetadata: ContractMetadata }> = ({}) => {

    interface INftOption {
        value: number;
        label: string;
        maxQuantity: number;
    }

    interface IQuantityOption {
        value: number;
        label: string;
    }

    interface ICart {
        id: number;
        quantity: number;
    }

    const address = useAddress();
    const { contract: rewardContract } = useContract(REWARD_CONTRACT);
    const { data: ownedNFTs } = useOwnedNFTs(rewardContract, address);
    const [selectedNft, setSelectedNft] = useState<INftOption | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<IQuantityOption | null>(null);
    const [quantityOptions, setQuantityOptions] = useState<IQuantityOption[]>([]);
    const [cart, setCart] = useState<ICart[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    //const tokenId = '0';
    const { data: nft, isLoading, error } = useNFT(rewardContract, 0);
    const [contractMetadata, setContractMetadata] = useState<ContractMetadata>({});

    useEffect(() => {
        if (nft) {
            setContractMetadata({
                name: nft.metadata.name,
                description: nft.metadata.description || '',
                image: nft.metadata.image,
            });
        }
    }, [nft]);

    const nftOptions = (ownedNFTs?.map(nft => {
        if (nft.metadata && nft.metadata.id && nft.quantityOwned) {
            return {
                value: parseInt(nft.metadata.id),
                label: `ID: ${nft.metadata.id}, Quantity: ${nft.quantityOwned}`,
                maxQuantity: parseInt(nft.quantityOwned),
            };
        }
        return null;
    }).filter((option): option is INftOption => option !== null) || []) as INftOption[];


    const handleNftChange = (event: SelectChangeEvent<number>) => {
        const selectedOptionIndex = event.target.value as number;
        const selectedOption = nftOptions[selectedOptionIndex];
        if (selectedOption) {
            setSelectedNft(selectedOption);
            const maxQuantity = selectedOption.maxQuantity;
            const options = Array.from({ length: maxQuantity }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }));
            setQuantityOptions(options);
            setSelectedQuantity(options[0]);
        }
    };

    const handleQuantityChange = (event: SelectChangeEvent<number>) => {
        const selectedOptionIndex = event.target.value as number;
        const selectedOption = quantityOptions[selectedOptionIndex];
        setSelectedQuantity(selectedOption);
    };



    const addToCartHandler = () => {
        if (!selectedNft || !selectedQuantity) {
            return alert('Please select an NFT and quantity.');
        }

        const currentCartTotal = cart.reduce((total, item) => total + item.quantity, 0);
        const newTotal = currentCartTotal + selectedQuantity.value;

        if (newTotal > 100) {
            return alert('Total quantity in cart cannot exceed 100.');
        }

        setCart([
            ...cart,
            { id: selectedNft.value, quantity: selectedQuantity.value }
        ]);
        setCartTotal(newTotal);
    };
    const exchangeTokensHandler = async () => {
        if (cart.length === 0) {
            return alert('Your cart is empty.');
        }

        if (cartTotal < 100) {
            return alert('Total quantity in cart must be 100.');
        }

        const ids = cart.map(item => item.id);
        const quantities = cart.map(item => item.quantity);

        try {
            const tx = await rewardContract?.call("exchangeTokens", [0, ids, quantities]);
            if (tx && tx.wait) {
                await tx.wait();
            }
            alert("Tokens exchanged successfully!");
        } catch (error) {
            console.error("Error exchanging tokens:", error);
            alert("Failed to exchange tokens. Please try again.");
        }
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{contractMetadata?.name}</Typography>
                            <Typography variant="body2">{contractMetadata?.description}</Typography>
                        </CardContent>
                        <CardMedia>
                            {!isLoading && !error && nft ? (
                                <MediaRenderer src={contractMetadata?.image} />
                            ) : (
                                <div>Loading...</div>
                            )}
                        </CardMedia>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="nftSelect-label">Select NFT</InputLabel>
                            <Select
                                labelId="nftSelect-label"
                                id="nftSelect"
                                value={selectedNft ? nftOptions.indexOf(selectedNft) : ""}
                                onChange={handleNftChange}
                            >
                                {nftOptions.map((option, index) => (
                                    <MenuItem key={option.value} value={index}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="quantitySelect-label">Quantity</InputLabel>
                            <Select
                                labelId="quantitySelect-label"
                                id="quantitySelect"
                                value={selectedQuantity ? quantityOptions.indexOf(selectedQuantity) : ""}
                                onChange={handleQuantityChange}
                            >
                                {quantityOptions.map((option, index) => (
                                    <MenuItem key={option.value} value={index}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={addToCartHandler}>
                            Add to Cart
                        </Button>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Cart" />
                        <CardContent>
                            {cart.map((item, index) => (
                                <div key={index}>
                                    <Typography variant="body2">ID: {item.id}</Typography>
                                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                </div>
                            ))}
                            <Typography variant="body2">Total: {cartTotal}</Typography>
                            <Typography variant="body2">
                                Add 100 tokens for the claim rewards in your cart.
                            </Typography>
                            <Button variant="contained" color="primary" onClick={exchangeTokensHandler}>
                                Claim Rewards
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Claim;


