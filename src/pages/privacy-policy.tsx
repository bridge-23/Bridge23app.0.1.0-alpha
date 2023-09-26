//../src/pages/terms-of-service.tsx
import React from 'react';
import { Container, Typography, Grid, Card, Button } from "@mui/material";
import {NextPage} from "next";

const PrivacyPolicy: NextPage = () => {
    return (
        <Container>
            <Typography variant="h3">Privacy Policy</Typography>

            <Typography variant="h4">Information We Collect</Typography>
            <Typography variant="body1">
                Describe the types of information you collect from users, such as personal data, usage data, etc.
            </Typography>

            <Typography variant="h4">How We Use Information</Typography>
            <Typography variant="body1">
                Explain how collected information is used, e.g., for improving the service, personalized experiences, analytics, etc.
            </Typography>

            <Typography variant="h4">Data Security</Typography>
            <Typography variant="body1">
                Describe how you protect user data, including encryption, access controls, and security measures.
            </Typography>

            <Typography variant="h4">Third-Party Services</Typography>
            <Typography variant="body1">
                If you use third-party services or analytics tools, mention them and link to their privacy policies.
            </Typography>

            {/* Add more sections as needed */}
        </Container>
    );
};

export default PrivacyPolicy;
