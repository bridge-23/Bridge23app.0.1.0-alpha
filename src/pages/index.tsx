//..src/pages/index.tsx
import { NextPage } from "next";
import {Container, Typography, Grid, Card, Button, CardContent, CircularProgress, Modal} from "@mui/material";
import {useContract, useTotalCirculatingSupply} from "@thirdweb-dev/react";
import { REWARD_CONTRACT } from '../consts/parameters';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();

    const goToLoginPage = () => {
        router.push('/login');  // assuming your login page route is '/login'
    }
    const { contract } = useContract(REWARD_CONTRACT);
    const { data, isLoading, error } = useTotalCirculatingSupply(contract, 0);

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
                            <Button variant="outlined" color="primary" onClick={goToLoginPage}>
                                Join
                            </Button>
                            {/* ... rest of your component */}
                        </CardContent>
                    </Grid>
                </Card>

            </Grid>
        </Container>
    );
};

export default Home;


