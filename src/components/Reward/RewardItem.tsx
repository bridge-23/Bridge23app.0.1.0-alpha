//..src/components/NFT/RewardItem.tsx
import { ThirdwebNftMedia, useNFTBalance, useAddress, useContract } from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

type RewardItemProps = {
    metadata: {
        id: string;
        name?: string | number | null;
        uri: string;
    };
};

const RewardItem: React.FC<RewardItemProps> = ({ metadata }) => {
    const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);

    return (
        <ImageListItem key={metadata.id}>
            <ThirdwebNftMedia metadata={metadata} />
            <ImageListItemBar
                title={metadata.name}
                subtitle={`Token id: ${metadata.id} `}
                actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${metadata.name}`}
                    >
                        <InfoIcon />
                    </IconButton>
                }
            />
        </ImageListItem>
    );
};

export default RewardItem;