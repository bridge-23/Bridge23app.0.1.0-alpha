//..src/components/Dashboard/IncomeCardComponent.tsx
import React from 'react';
import {Box, Card, CardContent, Typography, Avatar, useMediaQuery} from "@mui/material";
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import {useTheme} from "@mui/material/styles";

interface IncomeCardComponentProps {
    totalIncomes: number;
}
const IncomeCardComponent: React.FC<IncomeCardComponentProps> = ({ totalIncomes }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const cardStyle = isMobile
        ? {
            perspective: "1000px",
            width: '45%',
            height: '150px',
            cursor: "pointer",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 0, // No shadow for mobile
            border: 'none',
            elevation: 0,
        }
        : {
            perspective: "1000px",
            width: '150px', // Fixed width for desktop
            height: '150px',
            cursor: "pointer",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 3, // Shadow for desktop
            border: 'none',
            elevation: 0,
        };
    return (
        <Card sx={cardStyle}>
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
                        USD {totalIncomes.toLocaleString()} {/* Use totalExpenses here */}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default IncomeCardComponent;
