//..src/pages/index.tsx
import { NextPage } from "next";
import React, { useState } from "react";
import {Container, Typography, Grid, Card, Button, CardContent, CircularProgress, Modal} from "@mui/material";
import {useContract, useTotalCirculatingSupply} from "@thirdweb-dev/react";
import { REWARD_CONTRACT } from '../consts/parameters';
import LoginComponent from "../components/LoginComponent";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    modalContent: {
        position: 'relative',
        width: '80vw',
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: 'white',
    },
    closeButton: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
    },
});

const Home: NextPage = () => {
    const { contract } = useContract(REWARD_CONTRACT);
    const { data, isLoading, error } = useTotalCirculatingSupply(contract, 0);
    const classes = useStyles();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleOpen = () => {
        setLoginModalOpen(true);
    };

    const handleClose = () => {
        setLoginModalOpen(false);
    };

    return (
        <Container style={{ padding: '24px' }}>

            <Typography variant="h3" align="center">
                JOIN TODAY + MAKE YOUR SPEND COUNT
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
                Total Claim rewards
            </Typography>

            {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            )}

            {/*                            {error && (
                                <p style={{ color: 'red' }}>
                                    Error: {error.message}
                                </p>
                            )}*/}

            {data && !isLoading && (
                <Typography variant="h4" align="center">
                    {data.toString()}
                </Typography>
            )}

            <Grid container justifyContent="center" style={{ marginTop: '24px' }}>
                <Card style={{ padding: '24px' }}>

                    <Grid container direction="column" alignItems="center">
                        <Typography variant="h5" align="center">
                            Connect Your Wallet for get your Bridge id!
                        </Typography>

                        <CardContent>

                                <Button variant="outlined" color="primary" onClick={handleOpen}>
                                    Join
                                </Button>

                            <Modal
                                open={isLoginModalOpen}
                                onClose={handleClose}
                                aria-labelledby="login-modal-title"
                                aria-describedby="login-modal-description"
                            >
                                <div className={classes.modalContent}>
                                        <LoginComponent />
                                </div>
                            </Modal>

                        </CardContent>
                    </Grid>
                </Card>

            </Grid>
        </Container>
    );
};

export default Home;


