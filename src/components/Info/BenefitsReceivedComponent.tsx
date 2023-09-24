//..src/components/Info/BenefitsReceivedComponent.tsx
import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

const BenefitsReceivedComponent: React.FC = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Benefits received
                </Typography>
                <Typography variant="h5">
                    120$
                </Typography>
                <Typography variant="body2">
                    Your tokenized items generate rewards based on our unique algorithm.
                </Typography>
            </CardContent>
        </Card>
    );
}

export default BenefitsReceivedComponent;