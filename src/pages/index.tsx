//..src/pages/[userKey].tsx
import { NextPage,  } from "next";
import React, {useContext} from 'react';
import {Container, Typography, Grid,Box } from "@mui/material";
import Image from 'next/image';
import LoginComponentJuno from "../components/LoginComponentJuno";
import {AuthContext} from "../contexts/AuthContext";
//import {useContract} from "@thirdweb-dev/react";
//import { REWARD_CONTRACT } from '../consts/parameters';
//import useFirebaseUser from "../lib/useFirebaseUser";

//TODO:

const Home: NextPage = () => {
    //const { user } = useFirebaseUser();
    //const { contract } = useContract(REWARD_CONTRACT);
    const { user } = useContext(AuthContext);
    return (
        <Container style={{ padding: '24px', marginBottom: '82px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Image src="/icon-512x512.png" alt="Bridge 23 Logo" width={40} height={40} />
                        <Typography variant="h4" sx={{ mt: 1 }}>
                            Bridge 23
                        </Typography>
                        {!user && (
                            <Box mt={2}>
                                <LoginComponentJuno/>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;




