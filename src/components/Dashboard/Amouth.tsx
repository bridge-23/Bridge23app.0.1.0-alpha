import React, {useEffect, useState} from 'react';
import { Card } from "@mui/material";
import IncomeCardComponent from "../../components/Dashboard/IncomeCardComponent";
import ExpenseCardComponent from "../../components/Dashboard/ExpenseCardComponent";
import {listDocs} from "@junobuild/core-peer";

interface ExpenseItem {
    amount: number;
}
interface IncomeItem {
    amount: number;
}
const Amount: React.FC = () => {
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalIncomes, setTotalIncomes] = useState<number>(0);

    useEffect(() => {
        const calculateTotals = async () => {
            const totalExpenses = await fetchTotalExpenses();
            const totalIncome = await fetchTotalIncome();

            setTotalExpenses(totalExpenses);
            setTotalIncomes(totalIncome);
        };

        calculateTotals();
    }, []);
    const fetchTotalExpenses = async () => {
        try {
            const expensesData = await listDocs({ collection: "Expenses" });

            if (expensesData && expensesData.items) {
                const total = expensesData.items.reduce((acc, item) => {
                    // Assert that item.data is of type ExpenseItem
                    const expense = item.data as ExpenseItem;
                    return acc + expense.amount;
                }, 0);

                return total;
            } else {
                console.error("No expense records found.");
                return 0;
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
            return 0;
        }
    };
    const fetchTotalIncome = async () => {
        try {
            const incomesData = await listDocs({ collection: "Incomes" });

            if (incomesData && incomesData.items) {
                const total = incomesData.items.reduce((acc, item) => {
                    const income = item.data as IncomeItem;
                    return acc + income.amount;
                }, 0);

                return total;
            } else {
                console.error("No income records found.");
                return 0;
            }
        } catch (error) {
            console.error("Error fetching incomes:", error);
            return 0;
        }
    };



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
            <IncomeCardComponent totalIncomes={totalIncomes}/>
            <ExpenseCardComponent totalExpenses={totalExpenses} />
        </Card>
    );
}
export default Amount;