//..src/components/Dashboard/AddExpense
import React, {useState, useEffect, useContext} from 'react';
import {Button, TextField, Dialog, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {AuthContext} from "../../contexts/AuthContext";
import { setDoc, listDocs, getDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
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
    const [transactionName, setTransactionName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionType, setTransactionType] = useState(initialTransactionType || ''); // Set initial value
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedAccountKey, setSelectedAccountKey] = useState('');

    //const [selectedAccountId, setSelectedAccountId] = useState('');

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

    const handleAddTransaction = async () => {
        if (!transactionName || !transactionAmount) {
            alert('Please provide valid expense details.');
            return;
        }
        try {
            if (!user) {
            console.error('Please sign in to create an account.');
            return;
        }
            const transactionId = nanoid();
            const collectionName = getCollectionName();
            const selectedAccountDoc = accounts.find(account => account.data.accountName === selectedAccount)?.key;

            if (!selectedAccountDoc) {
                console.error('Selected account not found.');
                alert('Failed to find the selected account. Please try again.');
                return;
            }

            await updateAccountBalance(selectedAccountKey, parseFloat(transactionAmount), transactionType);

            await setDoc({
                collection: collectionName,
                doc: {
                    key: transactionId,
                    //description:,
                    //updated_at
                    data: {
                        transactionId:transactionId,
                        userId: user.key,
                        accountId: selectedAccountKey,
                        accountName:selectedAccount,
                        name: transactionName,
                        transactionType: transactionType,
                        amount: parseFloat(transactionAmount),
                        category: transactionCategory
                        //from
                        //to
                    }
                }
            });

            alert(`${transactionType} added successfully!`);
            // Clear the fields after successful addition
            setTransactionName('');
            setTransactionAmount('');
            setTransactionCategory('');
            setTransactionType('');
            setSelectedAccount('');
            // Close the dialog after adding
            onClose();
        } catch (error) {
            console.error(`Error adding ${transactionType}:`, error);
            alert(`Failed to add ${transactionType}. Please try again.`);
        }
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
                        value={transactionAmount}
                        onChange={(e) => setTransactionAmount(e.target.value)}
                        fullWidth
                        margin="normal"
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
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Health">Health</MenuItem>
                            <MenuItem value="Home">Home</MenuItem>
                            <MenuItem value="Recreation">Recreation</MenuItem>
                            <MenuItem value="Restaurant">Restaurant</MenuItem>
                            <MenuItem value="Services">Services</MenuItem>
                            <MenuItem value="Transport">Transport</MenuItem>
                            <MenuItem value="Travel">Travel</MenuItem>
                            <MenuItem value="Supermarket">Supermarket</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                            <MenuItem value="Gift">Gift</MenuItem>
                            <MenuItem value="Internet Retail">Internet Retail</MenuItem>
                            <MenuItem value="Pets">Pets</MenuItem>
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
                                        <span>{`${account.data.currentBalance.toFixed(2)} ${account.data.currency}`}</span>
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

