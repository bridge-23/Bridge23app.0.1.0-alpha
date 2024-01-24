import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem } from '@mui/material';
import { nanoid } from 'nanoid';

interface Transaction {
  id: string;
  name: string;
  amount: string;
  category: string;
  transactionType: string;
  accountName: string;
}

interface Account {
    data: any;
  // Define the Account type structure
}

interface User {
  key: string;
  // Other user properties
}

interface EditAddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
  user: User;
  accounts: Account[];
  onSave: () => void;
}

const EditAddTransactionModal: React.FC<EditAddTransactionModalProps> = ({
  isOpen,
  onClose,
  transactionToEdit,
  user,
  accounts,
  onSave
}) => {
    const [transaction, setTransaction] = useState<Transaction>({
        id: '',
        name: '',
        amount: '',
        category: '',
        transactionType: 'Expense',
        accountName: accounts[0]?.data.accountName || '',
    });

    useEffect(() => {
        if (transactionToEdit) {
            setTransaction(transactionToEdit);
        } else {
            // Reset the transaction to default values when adding new
            setTransaction({
              id: '',
              name: '',
              amount: '',
              category: '',
              transactionType: 'Expense',
              accountName: accounts[0]?.data.accountName || '',
            });
        }
    }, [transactionToEdit, accounts]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            if (!transaction.name || !transaction.amount) {
                alert('Please provide valid transaction details.');
                return;
            }

            if (!user) {
                console.error('Please sign in to continue.');
                return;
            }

            const transactionId = transactionToEdit ? transaction.id : nanoid();
            const collectionName = getCollectionName();
            const selectedAccountDoc = accounts.find(account => account.data.accountName === transaction.accountName)?.key;

            if (!selectedAccountDoc) {
                console.error('Selected account not found.');
                alert('Failed to find the selected account. Please try again.');
                return;
            }

            const newTransaction = {
                ...transaction,
                id: transactionId,
                userId: user.key,
                accountId: selectedAccountDoc,
            };

            await setDoc({
                collection: collectionName,
                doc: {
                    key: transactionId,
                    data: newTransaction,
                },
            });

            onSave();
            onClose();
        } catch (error) {
            console.error(`Error saving transaction:`, error);
            alert(`Failed to save transaction. Please try again.`);
        }
    };


    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ /* Style your modal */ }}>
                {/* Form fields */}
                <Button onClick={handleSave}>{transactionToEdit ? 'Update' : 'Add'}</Button>
                <Button onClick={onClose}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default EditAddTransactionModal;
