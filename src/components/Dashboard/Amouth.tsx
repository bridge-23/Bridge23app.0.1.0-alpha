import React from 'react';
import { Card } from "@mui/material";
import IncomeCardComponent from "../../components/Dashboard/IncomeCardComponent";
import ExpenseCardComponent from "../../components/Dashboard/ExpenseCardComponent";

const Amount: React.FC = () => {
    return (
        <Card
            sx={{
                perspective: "1000px",
                mx: "auto",
                my: 2,
                height: '160px',
                paddingX: '24px',
                borderRadius: 0,
                boxShadow: 'none',
                display:"flex",
                justifyContent:"space-between"
            }}
        >
            {/* Add padding to each component */}
            <IncomeCardComponent />
            <ExpenseCardComponent />
        </Card>
    );
}
export default Amount;