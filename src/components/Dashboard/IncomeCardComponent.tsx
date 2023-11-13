//..src/components/Dashboard/IncomeCardComponent.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';

interface IncomeCardComponentProps {
    totalIncomes: number;
}
const IncomeCardComponent: React.FC<IncomeCardComponentProps> = ({ totalIncomes }) => {
    return (
        <Card
            sx={{
                perspective: "1000px",
                width: { xs: '45%', sm: '150px' },
                height: '150px',
                cursor: "pointer",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
            }}>
            <CardContent sx={{ textAlign: 'center' }}>
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
                        IDR {totalIncomes.toLocaleString()} {/* Use totalExpenses here */}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default IncomeCardComponent;
