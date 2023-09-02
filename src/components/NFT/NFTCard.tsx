import React from 'react';
import { ThirdwebNftMedia, useNFTBalance, useAddress, useContract } from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import { makeStyles } from '@mui/styles';
import { Badge, Card, CardContent, Typography, CircularProgress, Skeleton } from '@mui/material';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 16, // Increase the font size for the title
        fontWeight: 'bold', // Make the title bold
    },
    subtitle: {
        fontSize: 14, // Decrease the font size for the subtitle
        color: 'gray', // Add a gray color to the subtitle
    },
    pos: {
        marginBottom: 12,
    },
});

type NFTCardProps = {
    metadata: {
        id: string;
        name?: string | number | null;
        uri: string;
        quantityOwned: number;
    };
};

const NFTCard: React.FC<NFTCardProps> = ({ metadata }) => {
    const classes = useStyles();
    const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);
    const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, address, metadata.id);

    const truncateName = (name: string | number | null | undefined): string => {
        if (typeof name === 'string') {
            return name.length > 10 ? `${name.slice(0, 8)}...${name.slice(-2)}` : name;
        } else if (typeof name === 'number') {
            const strName = name.toString();
            return strName.length > 10 ? `${strName.slice(0, 8)}...${strName.slice(-2)}` : strName;
        } else {
            return "Unknown";
        }
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Badge
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'top',
                    }}
                    badgeContent={
                        isLoading ? (
                            <Skeleton variant="text" width={40} height={24} />
                        ) : (
                            <Typography variant="h5">{ownerBalance?.toString()}</Typography>
                        )
                    }
                    color="secondary"
                    sx={{
                        '.MuiBadge-badge': {
                            backgroundColor: 'grey',
                            color: 'white',
                            fontSize: '1.5em',
                            top: '10px',
                            left: '10px',
                        },
                    }}
                >
                    {isLoading ? (
                        <Skeleton variant="rectangular" width={200} height={200} />
                    ) : (
                        <ThirdwebNftMedia metadata={metadata} />
                    )}
                </Badge>
            </CardContent>
        <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {isLoading ? (
                        <Skeleton variant="text" width={100} />
                    ) : (
                        truncateName(metadata.name)
                    )}
                </Typography>
        </CardContent>
        <CardContent>
                <Typography className={classes.subtitle} color="textSecondary">
                    Token id: {metadata.id}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NFTCard;



// <h3>Total owned: {ownerBalance?.toString()} </h3> {/* Convert BigNumber to string */}
