//..src/components/Dashboard/ExpenseCardComponent.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Importing downward arrow

const ExpenseCardComponent: React.FC = () => {
    return (
        <Card
            sx={{
                perspective: '1000px',
                width: { xs: '100%', sm: '300px' },
                height: '200px',
                cursor: 'pointer',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 3
            }}>
            <CardContent sx={{ textAlign: 'center' }}> {/* Add textAlign to center content */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar sx={{ backgroundColor: 'red', mb: 2 }}>
                        <KeyboardArrowDownIcon style={{ color: 'white', fontSize: 'large' }} />
                    </Avatar>
                    <Typography variant="caption" color="textSecondary">
                        Expense
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'red' }}> {/* Red color for expense */}
                        $4,000.00
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExpenseCardComponent;


