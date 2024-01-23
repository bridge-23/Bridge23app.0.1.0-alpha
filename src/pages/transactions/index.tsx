import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Container, Card, CardContent, List, ListItem, ListItemText, Grid, Select, MenuItem } from '@mui/material';
import { incomeState, expenseState } from '../../state/atoms';
import { useFetchIncomes } from '../../components/Transactions/useFetchIncomes';
import { useFetchExpenses } from '../../components/Transactions/useFetchExpenses';
import { fetchIncomesFromAPI, fetchExpensesFromAPI } from '../../components/Transactions/fetchTransactionData';

const TransactionType = {
    All: "All",
    Incomes: "Incomes",
    Expenses: "Expenses",
};

const convertTimestamp = (timestamp: bigint | undefined): string => {
    if (timestamp === undefined) {
        return 'Unknown Date';
    }
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
};

const IncomesExpensesComponent: React.FC = () => {
    const [incomes, setIncomes] = useRecoilState(incomeState);
    const [expenses, setExpenses] = useRecoilState(expenseState);
    const [selectedType, setSelectedType] = React.useState<string>(TransactionType.All);

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        const fetchIncomes = async () => {
            const fetchedIncomes = await fetchIncomesFromAPI();
            setIncomes(fetchedIncomes);
        };

        const fetchExpenses = async () => {
            const fetchedExpenses = await fetchExpensesFromAPI();
            setExpenses(fetchedExpenses);
        };

        fetchIncomes();
        fetchExpenses();
    }, [setIncomes, setExpenses]);

    const sortedTransactions = [...incomes, ...expenses].sort((a, b) => {
        if (a.created_at === undefined) return 1;
        if (b.created_at === undefined) return -1;
    
        const dateA = Number(a.created_at);
        const dateB = Number(b.created_at);
    
        return dateB - dateA;
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
                    <MenuItem value={TransactionType.All}>All</MenuItem>
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
                                    <ListItem key={transaction.id}>
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
