//..src/components/Dashboard/AddExpense
import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Dialog, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from "../../contexts/AuthContext";
import { setDoc, listDocs, getDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { incomeState, expenseState } from '../../state/atoms';
import { IncomeItem, ExpenseItem } from '../../types';
import { fetchIncomesFromAPI, fetchExpensesFromAPI } from '../../components/Transactions/fetchTransactionData';
import { useExchangeRates } from '../../hooks/useExchangeRates';


interface AddTransactionProps {
    open: boolean;
    onClose: () => void;
    initialTransactionType?: string;
}
interface AccountData {
    key: string;
    data: {
        accountName: string;
        financialInstitution: string;
        currentBalance: number;
        currency: string;
        owner?: string;
        userId: string;
    };
}
function AddTransaction({ open, onClose, initialTransactionType }: AddTransactionProps) {
    const { user } = useContext(AuthContext);
    const { exchangeRates, loading: ratesLoading, error: ratesError } = useExchangeRates();
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [amountInput, setAmountInput] = useState('');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionType, setTransactionType] = useState(initialTransactionType || ''); // Set initial value
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedAccountKey, setSelectedAccountKey] = useState('');
    const incomeCategories = ['Salary', 'Pension', 'Interest Yield', 'Gig', 'Bonus', 'Present', 'Other', 'Add category'];
    const expenseCategories = ['Clothing', 'Education', 'Electronics', 'Health', 'Home', 'Recreation', 'Restaurant', 'Services', 'Transport', 'Travel', 'Supermarket', 'Other', 'Add category'];
    //const [selectedAccountId, setSelectedAccountId] = useState('');
    const setIncomes = useSetRecoilState(incomeState);
    const setExpenses = useSetRecoilState(expenseState);

    const renderCategoryOptions = (): JSX.Element[] => {
        let categories: string[] = []; // Explicitly type as string[]
        switch (transactionType) {
            case 'Income':
                categories = incomeCategories;
                break;
            case 'Expense':
                categories = expenseCategories;
                break;
            // Add more cases for other transaction types if needed
            default:
                categories = [];
        }

        return categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
        ));
    };

    useEffect(() => {
        if (initialTransactionType !== undefined) {
            setTransactionType(initialTransactionType);
        }
    }, [initialTransactionType]);

    useEffect(() => {
        const fetchAccounts = async () => {
            if (user) {
                try {
                    const accountsData = await listDocs({
                        collection: "Accounts",
                        filter: {
                            owner: user.key,
                        },
                    });

                    if (accountsData && accountsData.items) {
                        // Map the fetched data to the AccountData structure
                        const fetchedAccounts = accountsData.items.map(doc => {

                            const data = doc.data as AccountData['data'];

                            console.log("Account Name:", data.accountName, "| Current Balance:", data.currentBalance);

                            return {
                                key: doc.key,
                                data: {
                                    accountName: data.accountName,
                                    financialInstitution: data.financialInstitution,
                                    currentBalance: data.currentBalance,
                                    currency: data.currency,
                                    owner: data.owner,
                                    userId: user.key,
                                },
                            };

                        });

                        setAccounts(fetchedAccounts); // Update state with the fetched accounts
                    } else {
                        console.error("No accounts found for the current user.");
                        alert('No accounts found. Please try again.');
                    }
                } catch (error) {
                    console.error("Error fetching accounts:", error);
                    alert('Failed to fetch accounts. Please try again.');
                }
            }
        };
        fetchAccounts()
            .then(() => {
                // Handle success if needed
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }, []);

    const getCollectionName = (): string => {
        switch (transactionType) {
            case 'Expense':
                return 'Expenses';
            case 'Income':
                return 'Incomes';
            case 'Transfer':
                return 'Transfers';
            default:
                // Handle other cases or throw an error
                throw new Error(`Invalid transaction type: ${transactionType}`);
        }
    };

    async function reloadTransactions() {
        try {
            const updatedIncomes = await fetchIncomesFromAPI();
            setIncomes(updatedIncomes);

            const updatedExpenses = await fetchExpensesFromAPI();
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error("Error reloading transactions:", error);
        }
    }

    const handleAddTransaction = async () => {
        if (!transactionName || !amountInput) {
            alert('Please provide valid transaction details.');
            return;
        }
        
        if (!user) {
            console.error('Please sign in to create an account.');
            return;
        }
    
        const transactionId = nanoid();
        const collectionName = getCollectionName(); // Получаем название коллекции на основе типа транзакции
    
        const account = accounts.find(account => account.data.accountName === selectedAccount);
        if (!account) {
            console.error('Selected account not found.');
            alert('Failed to find the selected account. Please try again.');
            return;
        }
    
        const amountCents = Math.round(parseFloat(amountInput) * 100);
        const accountCurrency = accounts.find(account => account.data.accountName === selectedAccount)?.data.currency;

        let amountCentsUSD = amountCents;

        if (accountCurrency && accountCurrency !== 'USD' && exchangeRates[accountCurrency]) {
            amountCentsUSD = Math.round(amountCents / exchangeRates[accountCurrency]);
        }
        
        try {
            await updateAccountBalance(account.key, amountCents, transactionType);
    
            const newTransaction = {
                id: transactionId,
                userId: user.key,
                accountId: account.key,
                accountName: selectedAccount,
                name: transactionName,
                transactionType: transactionType,
                amount_cents: amountCents,
                category: transactionCategory,
                amount_currency: account.data.currency,
                amount_cents_usd: amountCentsUSD,
            };
    
            await setDoc({
                collection: collectionName,
                doc: {
                    key: transactionId,
                    data: newTransaction,
                },
            });
    
            await reloadTransactions();
    
            alert(`${transactionType} added successfully!`);
            
            resetForm();
        } catch (error) {
            console.error(`Error adding ${transactionType}:`, error);
            alert(`Failed to add ${transactionType}. Please try again.`);
        }
    };
    
    const resetForm = () => {
        setTransactionName('');
        setAmountInput(''); 
        setTransactionCategory('');
        setTransactionType(initialTransactionType || '');
        setSelectedAccount('');
        setSelectedAccountKey('');
        onClose();
    };
    

    async function updateAccountBalance(accountKey: string, transactionAmount: number, transactionType: string): Promise<void> {
        try {
            // Fetch the current account document
            const accountDocResponse = await getDoc({ collection: "Accounts", key: accountKey });

            if (!accountDocResponse) {
                console.error('Account not found.');
                return;
            }

            // Extracting data from the account document response
            const accountData = accountDocResponse.data as AccountData['data'];

            const currentBalance = accountData.currentBalance;
            let updatedBalance;

            // Calculate the updated balance
            switch (transactionType) {
                case 'Income':
                    updatedBalance = currentBalance + transactionAmount;
                    break;
                case 'Expense':
                    updatedBalance = currentBalance - transactionAmount;
                    break;
                case 'Transfer':
                    updatedBalance = currentBalance - transactionAmount;
                    break;
                default:
                    throw new Error(`Unsupported transaction type: ${transactionType}`);
            }

            // Update the account with the new balance
            await setDoc({
                collection: 'Accounts',
                doc: {
                    key: accountKey,
                    updated_at: accountDocResponse.updated_at,
                    data: {
                        ...accountData,
                        currentBalance: updatedBalance,
                    },
                },
            });
        } catch (error) {
            console.error("Error updating account balance:", error);
            throw error;
        }
    }


    const handleChange = (event: SelectChangeEvent) => {
        const accountName = event.target.value;
        const account = accounts.find(acc => acc.data.accountName === accountName);

        console.log("Selected account name: ", accountName);

        if (account) {
            console.log("Selected account key: ", account.key);
            setSelectedAccount(accountName); // Set the selected account name
            setSelectedAccountKey(account.key); // Set the selected account key
        } else {
            // Handle the case where the account is not found
            setSelectedAccount('');
            setSelectedAccountKey('');
        }
    };


    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Add Transaction
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        label="Transaction Name"
                        variant="outlined"
                        value={transactionName}
                        onChange={(e) => setTransactionName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                        <Select
                            labelId="transaction-type-label"
                            id="transaction-type-select"
                            value={transactionType}
                            label="Transaction Type"
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem>
                            <MenuItem value="Transfer">Transfer</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Amount"
                        variant="outlined"
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        fullWidth
                        margin="normal"
                        type="number"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="transaction-category-label">Category</InputLabel>
                        <Select
                            labelId="transaction-category-label"
                            id="transaction-category-select"
                            value={transactionCategory}
                            label="Category"
                            onChange={(e) => setTransactionCategory(e.target.value)}
                        >
                            {renderCategoryOptions()}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="account-select-label">Account</InputLabel>
                        <Select
                            labelId="account-select-label"
                            id="account-select"
                            value={selectedAccount}
                            label="Account"
                            onChange={handleChange}
                        >
                            {
                                accounts.map((account) => (
                                    <MenuItem key={account.key} value={account.data.accountName}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <span>{account.data.accountName}</span>
                                            <span>{`${(account.data.currentBalance / 100).toFixed(2)} ${account.data.currency}`}</span>
                                        </div>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddTransaction}
                    >
                        Add Transaction
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default AddTransaction;
