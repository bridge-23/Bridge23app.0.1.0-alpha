import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Card, CardContent, List, ListItem, ListItemText, Grid, Select, MenuItem } from '@mui/material';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { incomeState, expenseState } from '../../state/atoms';
import { IncomeItem, ExpenseItem } from '../../types';
import { listDocs } from "@junobuild/core-peer";
import { useFetchExpenses } from '../../components/Transactions/useFetchExpenses';
import { useFetchIncomes } from '../../components/Transactions/useFetchIncomes';

function convertTimestamp(timestamp: bigint | undefined): string {
    if (timestamp === undefined) {
        return 'Unknown Date';
    }
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

const TransactionType = {
    All: "All",
    Incomes: "Incomes",
    Expenses: "Expenses",
};

const IncomesExpensesComponent: React.FC = () => {
    const setIncomes = useSetRecoilState(incomeState);
    const setExpenses = useSetRecoilState(expenseState);
    const [selectedType, setSelectedType] = useState<string>(TransactionType.All);

    const incomes = useFetchIncomes();
    const expenses = useFetchExpenses();

    useEffect(() => {
        setIncomes(incomes);
        setExpenses(expenses);
    }, [incomes, expenses, setIncomes, setExpenses]);

    const sortedTransactions = [...incomes, ...expenses].sort((a, b) => {
        // Обработка undefined значений
        if (a.created_at === undefined) return 1; // Помещаем 'a' в конец, если его дата не определена
        if (b.created_at === undefined) return -1; // Помещаем 'b' в конец, если его дата не определена
    
        // Преобразование bigint в number для сравнения
        const dateA = Number(a.created_at);
        const dateB = Number(b.created_at);
    
        return dateB - dateA; // Сортировка по убыванию
    });

    const transactionList = sortedTransactions.filter(transaction => {
        if (selectedType === TransactionType.All) return true;
        if (selectedType === TransactionType.Incomes && transaction.transactionType === "Income") return true;
        if (selectedType === TransactionType.Expenses && transaction.transactionType === "Expense") return true;
        return false;
    });

    return (
        <Container>
            <Box sx={{ marginBottom: 2 }}>
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    fullWidth
                >
                    <MenuItem value={TransactionType.All}>Incomes and Expenses</MenuItem>
                    <MenuItem value={TransactionType.Incomes}>Incomes</MenuItem>
                    <MenuItem value={TransactionType.Expenses}>Expenses</MenuItem>
                </Select>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <List>
                                {transactionList.map((transaction, index) => (
                                    <ListItem key={transaction.id} sx={{ color: transaction.transactionType === "Income" ? "green" : "red" }}>
                                    <ListItemText 
                                            primary={transaction.name}
                                            secondary={`Amount: ${transaction.amount} - Created: ${convertTimestamp(transaction.created_at)}`} 
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default IncomesExpensesComponent;
