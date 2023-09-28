//..src/components/Buttons/UploadFab.tsx
import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import ReceiptIcon from '@mui/icons-material/Receipt';
import styled from "styled-components";
import { Fab, Typography,Button,Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle,LinearProgress } from "@mui/material";
import 'firebase/storage';
import { auth, storage, db } from "../../lib/initFirebase";
import { ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";
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
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

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
                const uidFirst3 = user.uid.substring(0, 3);
                const uidLast4 = user.uid.substring(user.uid.length - 4);
                const parts = file.name.split('.');
                const extension = parts.pop();
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });
                const newFileName = `${uidFirst3}..${uidLast4}_${timestamp}_${i}.${extension}`;

                if (compressedFile) {
                    await uploadBytes(ref(storage, `bills/${user.uid}/${newFileName}`), compressedFile);
                    const storageRef = ref(storage, `bills/${user.uid}/${newFileName}`);
                    const uploadTask = uploadBytesResumable(storageRef, compressedFile);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(progress);
                        },
                        (error) => {
                            console.error("Upload failed:", error);
                            setMessage("Upload failed.");
                            setOpen(true);
                        },
                        () => {
                            setUploadProgress(null);  // Reset progress
                            setMessage(`${files.length} files uploaded successfully!`);
                            setOpen(true);
                        }
                    );

                    const fileDocRef = doc(db, 'uploaded_files', user.uid);
                    await setDoc(fileDocRef, {
                        [newFileName]: {
                            originalName: file.name,
                            timestamp: serverTimestamp(),
                        }
                    }, { merge: true });
                }
                // Send Slack notification
                try {
                    await sendNotificationToSlack({
                        userUID: user.uid,
                        fileName: file.name
                    });
                } catch (error) {
                    console.error('Error sending Slack notification', error);
                }
            }
            setMessage(`${files.length} files uploaded successfully!`);
            setOpen(true);
        } else {
            setMessage('Please select files to upload.');
            setOpen(true);
        }
    };

    const triggerFileSelect = () => fileRef.current?.click();

    const handleClose = () => {
        setOpen(false);
    };

    //const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => setOpen(false);

    return (
        <>
            <StyledFab color="secondary" aria-label="add" onClick={triggerFileSelect}>
                <ReceiptIcon fontSize="large" />
                <input
                    type="file"
                    multiple
                    ref={fileRef}
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />
            </StyledFab>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
                <DialogContent>
                    {uploadProgress !== null && (
                        <>
                            <Typography variant="body2">Uploading: {Math.round(uploadProgress)}%</Typography>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                        </>
                    )}
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent> {/* <-- This was missing */}
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

