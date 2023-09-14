import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { FC, useState } from "react";
import Link from 'next/link';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface INFTCardProps {
    nft: NFT;
}

export const NFTCard: FC<INFTCardProps> = ({ nft }) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <Card
            sx={{ maxWidth: 345, transition: '0.3s', '&:hover': { transform: 'scale(1.05)' }}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Link href={`/nft/${nft.metadata.id}`} passHref>
                <CardActionArea>
                    <ThirdwebNftMedia
                        metadata={nft.metadata}
                        className="!md:h-60 !md:w-60 h-36 w-36 rounded-lg"
                    />
                    <CardContent>
                        {hover && (
                            <>
                                <Typography variant="h5" component="div">
                                    {String(nft.metadata.name).split(" ")[0]}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {String(nft.metadata.name).split(" ")[1]}
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};
