// components/ProfilePage/Profile.tsx
import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';

interface ProfilePageProps {
    userData: {
        avatarUrl: string;
        nickname: string;
        dmail: string;
        currency: string;
    };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userData }) => {
    if (!userData) {
        // Render some loading state or return null
        return null;
    }
    const { avatarUrl, nickname, dmail, currency } = userData;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Your Profile
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar src={avatarUrl} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                <Typography variant="subtitle1">{nickname}</Typography>
                <Typography variant="body1">{dmail}</Typography>
                <Typography variant="body1">{currency}</Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={() => window.location.href='/'}>
                Back
            </Button>
        </Box>
    );
};

export default ProfilePage;