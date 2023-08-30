import { NextPage } from "next";
import { Container, Typography } from "@mui/material";

const Home: NextPage = () => {
    return (
        <Container>
            <Typography variant="h1" align="center">
                JOIN TODAY - DO YOUR PURCHASES COUNT!
            </Typography>
            <Typography variant="body1">
                Bridge 23 is a nextGen POS system for upgraded customer experience. It is a blockchain based POS system that allows merchants to accept crypto payments and rewards customers with crypto.
            </Typography>
        </Container>
    );
};

export default Home;


