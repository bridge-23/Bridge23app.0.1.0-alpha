// File: IncomesExpensesComponent.tsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useFetchIncomes } from '../../components/Transactions/useFetchIncomes';
import { useFetchExpenses } from '../../components/Transactions/useFetchExpenses';

const IncomesExpensesComponent: React.FC = () => {
    const incomes = useFetchIncomes();
    const expenses = useFetchExpenses();

    // ... Ваш код AppBar, Toolbar, и т.д.

    return (
        <Container>
            <Box>
                <Typography variant="h6">Incomes</Typography>
                <ul>
                    {incomes.map(income => (
                        <li key={income.id}>{income.name} {income.amount}</li>
                    ))}
                </ul>
            </Box>

            <Box>
                <Typography variant="h6">Expenses</Typography>
                <ul>
                    {expenses.map(expense => (
                        <li key={expense.id}>{expense.name} {expense.amount}</li>
                    ))}
                </ul>
            </Box>
        </Container>
    );
};

export default IncomesExpensesComponent;
