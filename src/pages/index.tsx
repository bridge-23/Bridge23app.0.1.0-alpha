//..src/pages/index.tsx
import { NextPage,  } from "next";
import React, { useEffect, useState } from 'react';
import {Container, Typography, Grid, LinearProgress,Card, CardContent, Box } from "@mui/material";
import {useContract, useTotalCount, useTotalCirculatingSupply} from "@thirdweb-dev/react";
import { REWARD_CONTRACT } from '../consts/parameters';
import useFirebaseUser from "../lib/useFirebaseUser";
import LoginComponent from "../components/LoginComponent";
import BenefitsReceivedComponent from "../components/Info/BenefitsReceivedComponent";
import Image from 'next/image';

//TODO: Make components for tracking total claim rewards and total items tokenized

const Home: NextPage = () => {
    const { user } = useFirebaseUser();
    const { contract } = useContract(REWARD_CONTRACT);
    const { data:totalCount, isLoading, error } = useTotalCount(contract);
    const { data: data1, isLoading: isLoading1, error: error1 } = useTotalCirculatingSupply(contract, "1");
    const { data: data2, isLoading: isLoading2, error: error2 } = useTotalCirculatingSupply(contract, "2");
    const { data: data3, isLoading: isLoading3, error: error3 } = useTotalCirculatingSupply(contract, "3");
    const { data: data4, isLoading: isLoading4, error: error4 } = useTotalCirculatingSupply(contract, "4");
    const [totalRewards, setTotalRewards] = useState<number | null>(null);

    useEffect(() => {
        let sum = 0;
        if (data1) {
            sum += parseFloat(data1.toString())* 5;
        }
        if (data2) {
            sum += parseFloat(data2.toString()) * 10;
        }
        if (data3) {
            sum += parseFloat(data3.toString()) * 50;
        }
        if (data4) {
            sum += parseFloat(data4.toString()) * 100;
        }
        setTotalRewards(sum);
/*        console.log("Data1:", data1?.toString());
        console.log("Data2:", data2?.toString());
        console.log("Data3:", data3?.toString());
        console.log("Data4:", data4?.toString());*/
    }, [data1, data2, data3, data4]);


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
                                <LoginComponent />
                            </Box>
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <BenefitsReceivedComponent/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Items Tokenized
                            </Typography>
                            <Typography variant="h5">
                                {totalCount ? totalCount.toString() : 'Loading...'}
                            </Typography>
                            <Typography variant="body2">
                                The total number of items tokenized.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;




