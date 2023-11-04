//..src/components/Dashboard/AddExpense
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { setDoc } from "@junobuild/core";
import { initializeJuno, isJunoInitialized } from '../../lib/Juno/initJuno';
import { nanoid } from "nanoid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface AddExpenseProps {
    open: boolean;
    onClose: () => void;
}

function AddExpense({ open, onClose }: AddExpenseProps) {
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [junoReady, setJunoReady] = useState(false);

    useEffect(() => {
        async function init() {
            await initializeJuno();
            setJunoReady(true);
        }

        if (!isJunoInitialized()) {
            init();
        } else {
            setJunoReady(true);
        }
    }, []);

    const handleAddExpense = async () => {
        if (!expenseName || !expenseAmount) {
            alert('Please provide valid expense details.');
            return;
        }

        if (!junoReady) {
            alert('Application is initializing, please try again in a moment.');
            return;
        }

        try {
            const expenseId = nanoid();
            await setDoc({
                collection: "expenses",
                doc: {
                    key: expenseId,
                    data: {
                        name: expenseName,
                        amount: parseFloat(expenseAmount)
                    }
                }
            });

            alert('Expense added successfully!');
            // Clear the fields after successful addition
            setExpenseName('');
            setExpenseAmount('');

            // Close the dialog after adding
            onClose();
        } catch (error) {
            console.error("Error adding expense:", error);
            alert('Failed to add expense. Please try again.');
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Add Expense
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
                        label="Expense Name"
                        variant="outlined"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Amount"
                        variant="outlined"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddExpense}
                        disabled={!junoReady} // Disable button if SDK isn't ready
                    >
                        Add Expense
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddExpense;

