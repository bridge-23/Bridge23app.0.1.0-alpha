//..src/components/UserProfile.tsx
import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, Box } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

type UserProfileProps = {
    address: string | null;
    totalNFTs: number;
};

const UserProfile: React.FC<UserProfileProps> = ({ address, totalNFTs}) => {
    const REWARDS_MULTIPLIER = 5;
    const BASE_NFT_COUNT = 100;
    const rewards = (totalNFTs / BASE_NFT_COUNT) * REWARDS_MULTIPLIER;

    return (
        <Card>
            <CardContent>

                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    <div >
                        <Typography variant="subtitle1" color="textSecondary" align="center">
                            Total Items Tokenized
                        </Typography>
                        <Typography variant="h4" align="center"> {/* h4 for a larger font size. Adjust as needed. */}
                            {totalNFTs}
                        </Typography>
                    </div>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">

                    <Box display="flex" alignItems="center">
                        <TrendingUpIcon color="primary" fontSize="large" />
                        <div>
                            <Typography variant="subtitle1" color="textSecondary">
                                Rewards
                            </Typography>
                            <Typography variant="h5" style={{ color: 'green' }}>
                                {rewards} $
                            </Typography>
                        </div>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <TrendingDownIcon color="error" fontSize="large" />
                        <div>
                            <Typography variant="subtitle1" color="textSecondary">
                                Expenses
                            </Typography>
                            <Typography variant="h5" style={{ color: 'red' }}>
                                100$ {/* Replace with your variable */}
                            </Typography>
                        </div>
                    </Box>
                </Box>
                {/* You can add more transactions features here */}
            </CardContent>
        </Card>
    );
};

export default UserProfile;
