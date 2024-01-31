
import React, { useContext, useState, useRef } from 'react';
import { setDoc, uploadFile } from '@junobuild/core-peer';
import { nanoid } from 'nanoid';
import { AuthContext } from '../../contexts/AuthContext';
import { AvatarContext } from './AvatarContext';
import { useLoading } from '../../contexts/LoadingContext';
import { CircularProgress, Backdrop, Alert } from '@mui/material';

import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { avatarUrlState } from '../../state/atoms';

interface FirstSetupProps {
    nickname: string;
    setNickname: React.Dispatch<React.SetStateAction<string>>;
    avatar: File | null;
    setAvatar: React.Dispatch<React.SetStateAction<File | null>>;
    open: boolean;
    onClose: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FirstSetup: React.FC<FirstSetupProps> = ({ nickname, setNickname, avatar, setAvatar, open, onClose, fileInputRef }) => {
    const { user } = useContext(AuthContext);
    const [dmail, setDmail] = useState('');
    const [currency, setCurrency] = useState('USD');
    // const { setAvatarUrl } = useContext(AvatarContext);
    const router = useRouter();
    //set up recoil for avatar
    const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlState);
    const { setLoading } = useLoading();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAvatar(event.target.files[0]);
        }
    };

    const handleDoneClick = async () => {
        if (!user?.key || !avatar) {
            console.error('User key or avatar file is not available.');
            return;
        }

        //show loading indicator
        setLoading(true);

        try {
            const setupId = `${user.key}_${nanoid()}`;
            // Upload the avatar
            const uploadAvatarResponse = await uploadFile({
                data: avatar,
                collection: 'avatars',
            });

            //save the URL avatar of the uploaded avatar
            const avatarUrl = URL.createObjectURL(avatar);
            setAvatarUrl(avatarUrl);
            console.log('Avatar URL', avatarUrl);

            await setDoc({
                collection: 'Users',
                doc: {
                    key: setupId,
                    data: {
                        userId: user.key,
                        nickname,
                        dmail,
                        currency,
                        created: new Date().toISOString(),
                    },
                },
            });

            // Redirect to the main page
            router.push('/');
        } catch (error) {
            // Error handling
            console.error('Error posting data', error);
        } finally {
            //hide loading indicator
            setLoading(false);
        }
    };

    return (
        <Box sx={{ margin: 4 }}>
            <Grid container justifyContent="center" alignItems="center" direction="column">
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom align="center">
                        Set Up Your Profile
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant="contained" component="label">
                    Upload Avatar
                    <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} />
                </Button>
                {avatar && (
                    <img
                        src={URL.createObjectURL(avatar)}
                        alt="Avatar Preview"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '20px' }}
                    />
                )}
            </Box>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 4 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            label="Nickname"
                            variant="outlined"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            fullWidth
                            label="Dmail"
                            variant="outlined"
                            value={dmail}
                            onChange={(e) => setDmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ m: 0 }} fullWidth>
                            <InputLabel id="currency-label">Primary Currency</InputLabel>
                            <Select
                                labelId="currency-label"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value as string)}
                            >
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'EUR'}>EUR</MenuItem>
                                <MenuItem value={'JPY'}>JPY</MenuItem>
                                <MenuItem value={'GBP'}>GBP</MenuItem> {/* Fixed currency code here from IDR to GBP */}
                                <MenuItem value={'AUD'}>AUD</MenuItem>
                                <MenuItem value={'CAD'}>CAD</MenuItem>
                                {/* Add more currencies if needed */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDoneClick}
                    disabled={!currency}
                    sx={{ mt: 2 }}
                >
                    Done
                </Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdropOpen}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {successMessage && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {successMessage}
                    </Alert>
                )}
                {errorMessage && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default FirstSetup;