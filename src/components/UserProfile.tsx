//..src/components/UserProfile.tsx
import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, Box } from '@mui/material';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';

type UserProfileProps = {
    address: string | null;
    totalNFTs: number;
};

const UserProfile: React.FC<UserProfileProps> = ({ address, totalNFTs}) => {
    const REWARDS_MULTIPLIER = 0.05;
    const rawRewards = totalNFTs * REWARDS_MULTIPLIER;
    const rewards = rawRewards.toFixed(2);

    return (
        <Card
            sx={{
            perspective: '1000px',
            width: '300px',
            height: '200px',
            cursor: 'pointer',
            borderRadius: '18px'
        }}
        >
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
                        <ArrowCircleUpOutlinedIcon style={{ color: 'green' }} fontSize="large" />
                        <div>
                            <Typography variant="subtitle1" color="textSecondary">
                                Claimable
                            </Typography>
                            <Typography variant="h5" style={{ color: 'green' }}>
                                {rewards} $
                            </Typography>
                        </div>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <ArrowCircleDownOutlinedIcon color="error" fontSize="large" />
                        <div>
                            <Typography variant="subtitle1" color="textSecondary">
                                Burn
                            </Typography>
                            <Typography variant="h5" style={{ color: 'red' }}>
                                2 {/* Replace with your variable */}
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
