//..src/components/UserProfileComponent.tsx
import React from 'react';
import {Card, CardContent, Typography, Box, Avatar} from '@mui/material';
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";


type UserProfileProps = {
    address: string | null;
    totalNFTs: number;
};

const UserProfileComponent: React.FC<UserProfileProps> = ({ address, totalNFTs}) => {
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
                        <Typography variant="subtitle2" color="textSecondary" align="center">
                            Total Items Tokenized
                        </Typography>
                        <Typography variant="h5" align="center"> {/* h4 for a larger font size. Adjust as needed. */}
                            {totalNFTs}
                        </Typography>
                    </div>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">

                    <Box display="flex" alignItems="center">
                        <Avatar style={{ backgroundColor: 'green' }} sx={{ mr: 2 }}>
                            <ArrowUpwardSharpIcon style={{ color: 'white' }} />
                        </Avatar>
                        <div>
                            <Typography variant="caption" color="textSecondary">
                                Claimable
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} style={{ color: 'green' }}>
                                ${rewards}
                            </Typography>
                        </div>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Avatar style={{ backgroundColor: 'red' }} sx={{ mr: 2 }}>
                            <ArrowDownwardSharpIcon style={{ color: 'white' }} />
                        </Avatar>
                        <div>
                            <Typography variant="caption" color="textSecondary">
                                Burn
                            </Typography>
                            <Typography variant="subtitle2" style={{ color: 'red' }}>
                                2
                            </Typography>
                        </div>
                    </Box>
                </Box>
                {/* You can add more transactions features here */}
            </CardContent>
        </Card>
    );
};

export default UserProfileComponent;
