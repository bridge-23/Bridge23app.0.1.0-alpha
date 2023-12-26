//..src/pages/profile/index.tsx
import React from 'react';
import { Typography, Container, Card, CardContent, Avatar, Button, Grid, Fab,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import { setDoc, listDocs,deleteDoc,getDoc} from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import AddIcon from '@mui/icons-material/Add';

const ProfilePage: React.FC = () => {
    return (
        <>
            <Container maxWidth="sm" style={{ marginTop: '20px' }}>
                <Card>
                    <CardContent>
                        <Avatar />
                        <Typography variant="h5">Nickname</Typography>
                        <Typography variant="subtitle1">Curent balance</Typography>
                        <Typography variant="subtitle1">johndoe@example.com</Typography>
                        <Typography variant="subtitle1">Primary currency</Typography>
                        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>

                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    {/* Add your summary cards here */}
                </Grid>

                <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                    <AddIcon />
                </Fab>
            </Container>
        </>
    );
};

export default ProfilePage;
