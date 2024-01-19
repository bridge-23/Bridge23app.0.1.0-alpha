//..src/components/Dashboard/ExpenseCardComponent.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, useMediaQuery } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useTheme} from "@mui/material/styles";

interface ExpenseCardComponentProps {
    totalExpenses: number;
}
const ExpenseCardComponent: React.FC<ExpenseCardComponentProps> = ({ totalExpenses }) => {
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
            <CardContent sx={{ textAlign: 'center' }}> {/* Add textAlign to center content */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar sx={{ backgroundColor: 'red', mb: 2 }}>
                        <ArrowDownwardIcon style={{ color: 'white', fontSize: 'large' }} />
                    </Avatar>
                    <Typography variant="caption" color="textSecondary">
                        Expense
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'red' }}>
                        IDR {totalExpenses.toLocaleString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExpenseCardComponent;


