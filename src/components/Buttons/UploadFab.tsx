import React, { useRef, useState } from 'react';
import { auth, storage, db} from "../../lib/initFirebase";
import { ref, uploadBytes } from 'firebase/storage';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ReceiptIcon from '@mui/icons-material/Receipt';
import styled from "styled-components";
import {Fab} from "@mui/material";
import {doc, setDoc} from 'firebase/firestore';
import {serverTimestamp} from "firebase/firestore"
import axios from 'axios';
import { sendNotificationToSlack } from '../../lib/sendToSlackFunction';

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
    const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
    const sendSlackNotification = async (userUID: string, fileName: string) => {
        const payload = {
            text: `New file uploaded! \nUser UID: ${userUID} \nFile Name: ${fileName} \nDate: ${new Date().toUTCString()}`,
        };
        try {
            await sendNotificationToSlack({ userUID, fileName }); // Use the passed parameters
        } catch (error) {
            console.error('Error sending Slack notification', error);
        }
    };

    console.log(SLACK_WEBHOOK_URL);
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
                const timestamp = Date.now();
                // Constructing the file name using UID and timestamp
                const uidFirst3 = user.uid.substring(0, 3);
                const uidLast4 = user.uid.substring(user.uid.length - 4);
                const parts = file.name.split('.');
                const extension = parts.pop();  // Getting the file extension
                const newFileName = `${uidFirst3}..${uidLast4}_${timestamp}_${i}.${extension}`;
                // Upload the file with the new unique name
                await uploadBytes(ref(storage, `bills/${user.uid}/${newFileName}`), file);
                // Add file details to Firestore (if needed)
                const fileDocRef = doc(db, 'uploaded_files', user.uid);
                await setDoc(fileDocRef, {
                    [newFileName]: {
                        originalName: file.name,
                        timestamp: serverTimestamp(),
                        // add any other file details you need
                    }
                }, { merge: true });
                // Send Slack notification
                await sendSlackNotification(user.uid, file.name);
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
