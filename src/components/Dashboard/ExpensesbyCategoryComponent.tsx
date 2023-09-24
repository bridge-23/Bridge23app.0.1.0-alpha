//..src/components/Dashboard/ExpensesbyCategoryComponent.tsx
import React from "react";
import { Card, Typography, Box } from "@mui/material";
import dynamic from 'next/dynamic';

const PieChartDynamic = dynamic(() => import('@mui/x-charts').then(mod => mod.PieChart), {
    ssr: false,
});

const ExpensesbyCategoryComponent: React.FC = () => {
    return (
        <Card
            sx={{
                perspective: '1000px',
                width: '300px',
                height: '200px',
                cursor: 'pointer',
                borderRadius: '18px'
            }}
        >
            <Typography
                variant="subtitle1"
                align="center"
                gutterBottom // adds a margin-bottom for space
            >
                Expenses by category
            </Typography>
            <Box>
                <PieChartDynamic
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'Pets' },
                                { id: 1, value: 15, label: 'Base' },
                                { id: 2, value: 20, label: 'Travel' },
                            ],
                        },
                    ]}
                    width={280} // Reduced width to account for card padding
                    height={130} // Reduced height for same reason
                />
            </Box>
        </Card>
    );
}

export default ExpensesbyCategoryComponent;
