import React, { useState, useRef } from 'react';
import FirstSetup from '../../components/FirstSetup/FirstSetup';
import { AvatarContext } from '../../components/FirstSetup/AvatarContext';
import { Container, Grid, useMediaQuery, Avatar, IconButton, Box, Typography, Button, Chip, Badge } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { Theme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const FirstSetupPage: React.FC = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFirstSetupOpen, setIsFirstSetupOpen] = useState(false);
    const { avatarUrl } = React.useContext(AvatarContext);

    const router = useRouter();

    const handleSettingsClick = () => {
        setIsFirstSetupOpen(!isFirstSetupOpen);
    }

    const handleCancelClick = () => {
        router.push('/');
    }

    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px', height: '100vh', width: '100vw' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'space-between' : 'space-around', padding: '8px 16px', backgroundColor: '', color: 'black' }}>
                <Button color="inherit" onClick={handleCancelClick} sx={{ marginLeft: isMobile ? '0%' : '10%' }}>Cancel</Button>
                <IconButton color="inherit" onClick={handleSettingsClick} sx={{ marginRight: isMobile ? '0%' : '15%' }}>
                    <SettingsIcon />
                </IconButton>
            </Box>
            {/* <Box sx={{ position: 'relative', width: 120, height: 120, borderRadius: '80%', overflow: 'hidden', margin: '50px auto' }}>
                <Avatar src={avatarUrl} sx={{ width: 120, height: 120 }} />
            </Box> */}
            <Box
                sx={{
                    color: "#000",
                    whiteSpace: "nowrap",
                    fontFamily: "Inter, sans-serif",
                }}
            >
            </Box>
            <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} alignItems="stretch">
                <Grid item xs={12} md={4}>
                    <FirstSetup
                        nickname={nickname}
                        setNickname={setNickname}
                        avatar={avatar}
                        setAvatar={setAvatar}
                        open={isFirstSetupOpen}
                        onClose={() => setIsFirstSetupOpen(false)}
                        fileInputRef={fileInputRef} handleFileChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                            throw new Error('Function not implemented.');
                        }} />
                </Grid>
            </Grid>
            <input
                ref={fileInputRef}
                type="file"
                hidden
            />
        </Container>
    );
};

export default FirstSetupPage;