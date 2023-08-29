import React, { useState, useEffect } from 'react';
import {useAddress, useContract, useOwnedNFTs, MediaRenderer,useNFT} from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import styles from '../../styles/ClaimPage.module.css';
import Select from 'react-select';
import type { NextPage } from "next";

type ContractMetadata = {
    name?: string| number | null;
    description?: string;
    image?: string;
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
    const tokenId = '0';
    const { data: nft, isLoading, error } = useNFT(rewardContract, 0);
    const [contractMetadata, setContractMetadata] = useState<ContractMetadata>({});


    useEffect(() => {
        if (nft) {
            setContractMetadata({
                name: nft.metadata.name,
                description: nft.metadata.description,
                image: nft.metadata.image
            });
        }
    }, [nft]);


    const nftOptions = ownedNFTs?.map(nft => ({
        value: parseInt(nft.metadata.id),
        label: `ID: ${nft.metadata.id}, Quantity: ${nft.quantityOwned}`,
        maxQuantity: parseInt(nft.quantityOwned)
    })) || [];


    const handleNftChange = (selectedOption: { value: number, label: string, maxQuantity: number }) => {
        setSelectedNft(selectedOption);
        const maxQuantity = selectedOption.maxQuantity;
        const options = Array.from({ length: maxQuantity }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }));
        setQuantityOptions(options);
        setSelectedQuantity(options[0]);
    };

    const handleQuantityChange = (selectedOption: { value: number, label: string }) => {
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
        <div className={styles.container} >
            <div className={styles.heroSection}>
                <div className={styles.collectionImage}>
                    {!isLoading && !error && nft ? (
                        <MediaRenderer src={nft.metadata.image} />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={styles.infocontainer}>

                <div className={styles.metadata}>
                    <h1>{contractMetadata?.name}</h1>
                    <p>{contractMetadata?.description}</p>
                </div>

                <div className={styles.claimContainer}>
                    <div className={styles.Btn}>
                <label htmlFor="nftSelect">Select NFT:</label>
                <Select
                    id="nftSelect"
                    value={selectedNft}
                    onChange={handleNftChange}
                    options={nftOptions}
                />
            </div>


            <div className={styles.Btn}>
                <label htmlFor="quantitySelect">Quantity:</label>
                <Select
                    id="quantitySelect"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    options={quantityOptions}
                />
            </div>
                </div>
                <div className={styles.container}>
                    <button onClick={addToCartHandler} className={styles.button}>
                        Add to Cart
                    </button>
                </div>
            </div>
                </div>

            <div className={styles.cartContainer}>
                <h2>Cart</h2>
                {cart.map((item, index) => (
                    <div key={index} className={styles.cartItem}>
                        <p>ID: {item.id}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
            <div className={styles.container}>
                <button onClick={exchangeTokensHandler} className={styles.button}>
                    Exchange Tokens
                </button>
            </div>
            </div>


        </div>
    );
};

export default Claim;


