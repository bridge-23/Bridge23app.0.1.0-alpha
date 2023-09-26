//../src/pages/terms-of-service.tsx
import React from 'react';
import { Container, Typography } from "@mui/material";
import {NextPage} from "next";

const TermsOfService: NextPage = () => {
    return (
        <Container>
            <Typography variant="h3">Terms of Service</Typography>

            <Typography variant="h4">Acceptance of Terms</Typography>
            <Typography variant="body1">
                Explain that by using the application, users agree to abide by these terms and conditions.
            </Typography>

            <Typography variant="h4">User Responsibilities</Typography>
            <Typography variant="body1">
                Outline the responsibilities of users, such as following community guidelines, respecting copyrights, etc.
            </Typography>

            <Typography variant="h4">Content and Copyright</Typography>
            <Typography variant="body1">
                Describe how user-generated content is handled, copyright policies, and any content removal procedures.
            </Typography>

            <Typography variant="h4">Privacy Policy</Typography>
            <Typography variant="body1">
                Mention that users should review the privacy policy for information on data handling and privacy practices.
            </Typography>

            {/* Add more sections as needed */}
        </Container>
    );
};

export default TermsOfService;
