//..src/components/Dashboard/ExpensesbyCategoryComponent.tsx
import React from "react";
import { Card, Typography, CardHeader, CardContent } from "@mui/material";
import dynamic from 'next/dynamic';

const PieChartDynamic = dynamic(() => import('@mui/x-charts').then(mod => mod.PieChart), {
    ssr: false,
});
const ExpensesbyCategoryComponent: React.FC = () => {
    return (
        <Card
            sx={{
                perspective: '1000px',
                width: { xs: '100%', sm: '300px' },
                height: '200px',
                cursor: 'pointer',
                p: 0,
                borderRadius: "24px",
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column', // Stack children vertically
            }}
        >
            <CardHeader
                title={
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        Category
                    </Typography>
                }
                sx={{ textAlign: 'center', paddingBottom: 0 }} // Override padding if necessary
            />
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1, // Take up available space
                    paddingTop: 0, // Override padding if necessary
                }}
            >
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
                    width={280} // Adjust width as needed
                    height={130} // Adjust height as needed
                />
            </CardContent>
        </Card>

    );
}
export default ExpensesbyCategoryComponent;
