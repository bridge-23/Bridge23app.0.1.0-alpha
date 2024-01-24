import React, { useEffect } from 'react';
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
                // Показать сообщение об ошибке пользователю
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
    
            // Обновление локального состояния после успешного удаления в бэкенде
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
    

    const getListItemTextStyles = (transactionType: string) => {
        return {
            color: transactionType === "Income" ? 'green' : 'red',
        };
    };

    return (
        <Container
            sx={{
                marginBottom: isMobile ? '118px' : '62px',
                padding: isMobile ? 'initial' : '24px',
                marginLeft: isMobile ? '0' : '50px',
                backgroundColor: 'white',
                // Other sx properties
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
                    paddingTop: 'env(safe-area-inset-top)', // Ensures top padding includes safe area
                    zIndex: 500, // Sets z-index
                    boxShadow: 1, // Adds shadow
                    top: isMobile ? 0 : 'env(safe-area-inset-top)', // Ensures AppBar is at the top, including safe area
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
                                {transactionList.map((transaction, index) => (
                                    <ListItem key={transaction.id}>
                                        <ListItemText 
                                            primary={transaction.name}
                                            secondary={`Amount: ${transaction.amount} - Created: ${convertTimestamp(transaction.created_at)}`} 
                                            primaryTypographyProps={{ style: getListItemTextStyles(transaction.transactionType) }}
                                            secondaryTypographyProps={{ style: getListItemTextStyles(transaction.transactionType) }}
                                        />
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(transaction.id, transaction.transactionType)}>
                                            <DeleteIcon/>
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
