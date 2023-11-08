//..src/components/Dashboard/IncomeCardComponent.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';

const IncomeCardComponent: React.FC = () => {
    return (
        <Card
            sx={{
                perspective: '1000px',
                width: { xs: '100%', sm: '300px' },
                height: '200px',
                cursor: 'pointer',
                borderRadius: '24px',
                display: 'flex', // Use flex to center children
                alignItems: 'center', // Center children vertically
                justifyContent: 'center' // Center children horizontally
            }}>
            <CardContent sx={{ textAlign: 'center' }}> {/* Add textAlign to center content */}
                <Box
                    display="flex"
                    flexDirection="column" // Stack items vertically
                    alignItems="center" // Center items horizontally
                    justifyContent="center" // Center items vertically
                >
                    <Avatar sx={{ backgroundColor: 'green', mb: 2 }}>
                        <ArrowUpwardSharpIcon style={{ color: 'white', fontSize: 'large' }} />
                    </Avatar>
                    <Typography variant="caption" color="textSecondary">
                        Income
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'green' }}>
                        $4,000.00
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default IncomeCardComponent;
