import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getDoc, deleteDoc } from "@junobuild/core-peer";
import { Box, Container, Card, CardContent, List, ListItem, ListItemText, Grid, Select, MenuItem, IconButton, AppBar, Toolbar, Typography, } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from '@mui/material';
import { incomeState, expenseState } from '../../state/atoms';
import { fetchIncomesFromAPI, fetchExpensesFromAPI } from '../../components/Transactions/fetchTransactionData';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [incomes, setIncomes] = useRecoilState(incomeState);
    const [expenses, setExpenses] = useRecoilState(expenseState);
    const [selectedType, setSelectedType] = React.useState<string>(TransactionType.All);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>([]);
    const getListItemTextStyles = (transactionType: string) => {
        return {
            color: transactionType === "Income" ? 'green' : 'red',
        };
    };

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

    useEffect(() => {
        const allCategories = [...incomes, ...expenses].map(t => t.category).filter((v, i, a) => a.indexOf(v) === i);
        setCategories(['All', ...allCategories]);
    }, [incomes, expenses]);

    const sortedTransactions = [...incomes, ...expenses].sort((a, b) => {
        if (a.created_at === undefined) return 1;
        if (b.created_at === undefined) return -1;

        const dateA = Number(a.created_at);
        const dateB = Number(b.created_at);

        return dateB - dateA;
    });

    const transactionList = sortedTransactions.filter(transaction => {
        // Фильтрация по типу транзакции
        let typeFilter = false;
        if (selectedType === TransactionType.All) {
            typeFilter = true;
        } else if (selectedType === TransactionType.Incomes && transaction.transactionType === "Income") {
            typeFilter = true;
        } else if (selectedType === TransactionType.Expenses && transaction.transactionType === "Expense") {
            typeFilter = true;
        }

        const categoryFilter = selectedCategory === 'All' || transaction.category === selectedCategory;

        return typeFilter && categoryFilter;
    });



    const handleDelete = async (transactionId: string, transactionType: string) => {
        setIsLoading(true);
        try {
            let collectionName = '';

            if (transactionType === "Income") {
                collectionName = "Incomes";
            } else if (transactionType === "Expense") {
                collectionName = "Expenses";
            }

            const currentDoc = await getDoc({ collection: collectionName, key: transactionId });
            if (!currentDoc) {
                console.error(`Document with ID ${transactionId} not found.`);
                return;
            }

            await deleteDoc({
                collection: collectionName,
                doc: {
                    key: transactionId,
                    updated_at: currentDoc.updated_at,
                    data: {}
                }
            });

            if (transactionType === "Income") {
                setIncomes(oldIncomes => oldIncomes.filter(item => item.id !== transactionId));
            } else if (transactionType === "Expense") {
                setExpenses(oldExpenses => oldExpenses.filter(item => item.id !== transactionId));
            }
        } catch (error) {
            console.error("Transaction delete failed:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Container
            sx={{
                marginBottom: isMobile ? '118px' : '62px',
                padding: isMobile ? 'initial' : '24px',
                marginLeft: isMobile ? '0' : '50px',
                backgroundColor: 'white',
            }}
            style={{
                paddingTop: isMobile ? 'env(safe-area-inset-top)' : '0px',
            }}
        >
            <AppBar
                position="static"
                color="default"
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    left: 0,
                    paddingTop: 'env(safe-area-inset-top)',
                    zIndex: 500,
                    boxShadow: 1,
                    top: isMobile ? 0 : 'env(safe-area-inset-top)',
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'primary.main'
                        }}
                    >
                        Transactions
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    fullWidth
                >
                    <MenuItem value={TransactionType.All}>All</MenuItem>
                    <MenuItem value={TransactionType.Incomes}>Incomes</MenuItem>
                    <MenuItem value={TransactionType.Expenses}>Expenses</MenuItem>
                </Select>

                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    fullWidth
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="fixed"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    bgcolor="rgba(255,255,255,0.7)"
                    zIndex={1000}
                >
                    <CircularProgress />
                </Box>
            )}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <List>
                                {transactionList.map((transaction) => (
                                    <ListItem key={transaction.id} divider>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" color="textPrimary" style={getListItemTextStyles(transaction.transactionType)}>
                                                    {transaction.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="textSecondary" style={getListItemTextStyles(transaction.transactionType)}>
                                                        Amount:  {transaction.amount} {transaction.amount_currency}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="textSecondary">
                                                        Created: {convertTimestamp(transaction.created_at)}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="textSecondary">
                                                        Category: {transaction.category}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(transaction.id, transaction.transactionType)}>
                                            <DeleteIcon />
                                        </IconButton>
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


