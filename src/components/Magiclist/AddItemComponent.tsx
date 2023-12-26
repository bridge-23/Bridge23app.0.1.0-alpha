//..src/components/Magiclist/AddItemComponent.tsx
import React, {ChangeEvent, useState, useContext, useEffect} from 'react';
import { Box, Button, TextField, Backdrop, CircularProgress, Dialog, DialogContent, DialogTitle, DialogActions, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Snackbar, Alert, AlertColor } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from "../../contexts/AuthContext";
import {listDocs, setDoc} from "@junobuild/core-peer";
import {nanoid} from "nanoid";
import {Item} from "../../types";
import {MagicList} from "../../types";
interface AddItemComponentProps {
    onAddItem: (newItem: Item) => void;
}
//TODO: Display currecncy from library currency
const AddItemComponent: React.FC<AddItemComponentProps> = ({}) => {
    const { user } = useContext(AuthContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [magicLists, setMagicLists] = useState<MagicList[]>([]);
    const [newItem, setNewItem] = useState({
        itemName: '',
        itemLink: '',
        description: '',
        price: '',
        currency: '',
        listId: '',
    });
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewItem({
            ...newItem, [event.target.name]: event.target.value });
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        // Find the selected list by its ID
        //const selectedList = magicLists.find(list => list.id === event.target.value);
        // Update the state with the new list's ID and name
        setNewItem({
            ...newItem,
            listId: event.target.value,
        });
    };
    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setNewItem({ ...newItem, currency: event.target.value });
    };
    const isValidUrl = (url: string): boolean => {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        return urlRegex.test(url);
    };
    const isValidPrice = (price: string): boolean => {
        const parsedPrice = parseFloat(price);
        return !isNaN(parsedPrice) && isFinite(parsedPrice) && parsedPrice > 0;
    };

    useEffect(() => {
        // Self-invoking async function inside useEffect
        (async () => {
            try {
                await fetchMagicLists();
            } catch (error) {
                console.error("Error in useEffect when fetching magic lists:", error);
                // Handle the error appropriately, e.g., show an error message to the user
            }
        })();
    }, []);
    const fetchMagicLists = async () => {
        let fetchedLists: MagicList[] = [];
        try {
            const magicListData = await listDocs({
                collection: "MagicLists"
            });

            if (magicListData && magicListData.items) {
                fetchedLists = magicListData.items.map(doc => {
                    const data = doc.data as MagicList;
                    return {
                        id: doc.key,
                        name: data.name,
                        owner: data.owner
                    };
                });
            } else {
                console.error("Magic list data is undefined or items are missing");
                alert('Failed to fetch magic lists. Please try again.');
            }
        } catch (error) {
            console.error("Error fetching magic lists:", error);
            alert('Failed to fetch magic lists. Please try again.');
        }

        setMagicLists(fetchedLists);
    };
    const handleAddNote = async () => {
        if (!newItem.itemName.trim()) {
            setSnackbarMessage('Please enter an item name.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        if (!user) {
            alert('You must be logged in to add an item.');
            return;
        }
        if (newItem.itemLink && !isValidUrl(newItem.itemLink)) {
            alert('Please enter a valid URL for the item link.');
            return;
        }
        if (!isValidPrice(newItem.price)) {
            alert('Please enter a valid price. Price should be a positive number.');
            return;
        }
        const selectedListName = magicLists.find(list => list.id === newItem.listId)?.name || '';
        const noteId = nanoid();
        setBackdropOpen(true);
        try {
            await setDoc({
                collection: "ShoppingList",
                doc: {
                    key: noteId,
                    data: {
                        ...newItem,
                        checked: false,
                        listId: newItem.listId,
                        listName: selectedListName,
                        owner: { userId: user.key }
                    }
                }
            });
            setSnackbarMessage('Item added successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setNewItem({
                itemName: '',
                itemLink: '',
                description: '',
                price: '',
                currency: '',
                listId: '',
            });
        } catch (error) {
            console.error("Error adding note:", error);
            setSnackbarMessage('Failed to add note. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setBackdropOpen(false);
            setAddDialogOpen(false);
        }
    };

    return (
        <Box>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>Add New Item</Button>
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemName"
                        name="itemName" // Changed from 'name' to 'itemName'
                        label="Item Name"
                        type="text"
                        fullWidth
                        value={newItem.itemName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="itemLink"
                        name="itemLink" // Changed from 'link' to 'itemLink'
                        label="Link to Item"
                        type="url"
                        fullWidth
                        value={newItem.itemLink}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Item Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={newItem.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        name="price"
                        label="Item Price"
                        type="number"
                        fullWidth
                        value={newItem.price}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="list-select-label">List</InputLabel>
                        <Select
                            labelId="list-select-label"
                            id="list-select"
                            name="list"
                            value={newItem.listId} // Use listId here
                            onChange={handleSelectChange}
                        >
                            {magicLists.map((list) => (
                                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                            ))}
                        </Select>

                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel id="currency-select-label">Currency</InputLabel>
                        <Select
                            labelId="currency-select-label"
                            id="currency-select"
                            name="currency"
                            value={newItem.currency}
                            onChange={handleCurrencyChange}
                        >
                            <MenuItem value="IDR">IDR</MenuItem>
                            <MenuItem value="UZS">UZS</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            {/* Add other currencies as needed */}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={handleAddNote} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity as AlertColor} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Backdrop open={backdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default AddItemComponent;
