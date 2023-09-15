//..src/components/Reward/RewardCardComponent.tsx

import * as React from 'react';
import { ImageList } from '@mui/material';
import RewardItem from './RewardItem'; // Make sure to adjust the path accordingly

type NFTMetadata = {
    id: string;
    name?: string | number | null;
    uri: string;
};

type RewardCardComponentProps = {
    data: NFTMetadata[];
};

const RewardCardComponent: React.FC<RewardCardComponentProps> = ({ data }) => {
    return (
        <ImageList sx={{ width: 500, height: 450 }}>
            {data.map((metadata) => (
                <RewardItem key={metadata.id} metadata={metadata} />
            ))}
        </ImageList>
    );
};

export default RewardCardComponent;