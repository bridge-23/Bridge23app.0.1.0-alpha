//..src/components/Buttons/UploadButton.tsx
import React, {useRef, useState} from 'react';
import { ref, uploadBytes} from 'firebase/storage';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { auth, storage } from "../../lib/initFirebase";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ReceiptIcon from '@mui/icons-material/Receipt'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UploadButton() {
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
    };

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
        <div>
            <VisuallyHiddenInput
                type="file"
                multiple
                ref={fileRef}
                onChange={handleUpload}
                style={{ display: 'none' }}
            />
            <Button
                component="label"
                variant="contained"
                startIcon={<ReceiptIcon />}
                onClick={triggerFileSelect}
            >
                Upload Bill
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
export default UploadButton;


