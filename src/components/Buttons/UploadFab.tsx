import React, { useRef, useState } from 'react';
import { auth, storage } from "../../lib/initFirebase";
import { ref, uploadBytes } from 'firebase/storage';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ReceiptIcon from '@mui/icons-material/Receipt';
import styled from "styled-components";
import {Fab} from "@mui/material";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

});

export const UploadFab = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleUpload = async () => {
        const user = auth.currentUser;
        if (!user) {
            setMessage('Please sign in to upload.');
            setOpen(true);
            return;
        }

        const files = fileRef.current?.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const storageFileRef = ref(storage, `bills/${user.uid}/${file.name}`);
                await uploadBytes(storageFileRef, file);
            }
            setMessage(`${files.length} files uploaded successfully!`);
            setOpen(true);
        } else {
            setMessage('Please select files to upload.');
            setOpen(true);
        }
    };

    const triggerFileSelect = () => {
        fileRef.current?.click();
    }

    const handleClose = (
        event: React.SyntheticEvent<any, Event> | Event,
        reason: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
        setOpen(false);
    };

    return (
        <>
            <StyledFab color="secondary" aria-label="add" onClick={triggerFileSelect}>
                <ReceiptIcon fontSize="large"/>
                <input
                    type="file"
                    multiple
                    ref={fileRef}
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />
            </StyledFab>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
