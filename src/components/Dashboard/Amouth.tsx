//../src/components/Dashboard/Amounth/Amounth.tsx
import React, {useEffect, useState} from 'react';
import { Card } from "@mui/material";
import IncomeCardComponent from "./Amounth/IncomeCardComponent";
import ExpenseCardComponent from "./Amounth/ExpenseCardComponent";
import { fetchTotalIncomes } from '../../lib/Juno/fetchTotalIncomes';
import { fetchTotalExpenses } from '../../lib/Juno/fetchTotalExpenses';


const Amount: React.FC = () => {
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalIncomes, setTotalIncomes] = useState<number>(0);

    useEffect(() => {
        (async () => {
            try {
                const totalExpenses = await fetchTotalExpenses();
                const totalIncome = await fetchTotalIncomes();
                console.log('totalExpenses', totalExpenses)
                console.log('totalIncome', totalIncome)
                setTotalExpenses(totalExpenses);
                setTotalIncomes(totalIncome);
            } catch (error) {
                console.error('Error in calculateTotals:', error);
            }
        })();
    }, []);

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
            <IncomeCardComponent totalIncomes={totalIncomes}/>
            <ExpenseCardComponent totalExpenses={totalExpenses} />
        </Card>
    );
}
export default Amount;