//..src/components/UserProfile.tsx
import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material';

type UserProfileProps = {
    address: string | null;
    totalNFTs: number;
    truncateAddress: (address: string) => string;
};

const UserProfile: React.FC<UserProfileProps> = ({ address, totalNFTs, truncateAddress }) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="profile" style={{ backgroundColor: '#1976d2' }}>
                        P
                    </Avatar>
                }
                title="Profile"
                titleTypographyProps={{ variant: 'h3' }}
            />
            <CardContent>
                <Typography variant="h6">
                    Bridge id: {truncateAddress(address || '')}
                </Typography>
                <Typography variant="h6">
                    Total NFTs Owned: {totalNFTs}
                </Typography>
                {/* You can add more profile features here */}
            </CardContent>
        </Card>
    );
};

export default UserProfile;
