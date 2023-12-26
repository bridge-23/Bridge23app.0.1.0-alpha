//..src/components/Magiclist/EditItemComponent.tsx
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Snackbar} from "@mui/material";
import {getDoc, listDocs, setDoc} from "@junobuild/core-peer";
import {MagicList} from "../../types";
import {Item} from "../../types";
interface EditItemProps {
    isOpen: boolean;
    item: Item;
    setItem: React.Dispatch<React.SetStateAction<Item | null>>;
    onClose: () => void;
    onSave: (updatedItem: Item) => void; // Using Item directly if it matches the structure
}
const EditItem: React.FC<EditItemProps> = ({ isOpen, item, setItem, onClose, onSave }) => {
    const [magicLists, setMagicLists] = useState<MagicList[]>([]);
    const [currentEditItem, setcurrentEditItem] = useState<Item | null>(null);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleCurrencyChange = (event: SelectChangeEvent) => {
        const newCurrency = event.target.value as string;

        setcurrentEditItem(prevItem => {
            return prevItem ? { ...prevItem, currency: newCurrency } : null; // Fallback to null if prevItem is null
        });
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        // Find the selected list by its ID
        const selectedList = magicLists.find(list => list.id === event.target.value);
        // Update the state with the new list's ID and name
        setItem({
            ...item,
            listName: event.target.value,
        });
    };
    useEffect(() => {
        fetchMagicLists().then(r => console.log("Magic lists fetched:", r));
        setcurrentEditItem(item);
        }, [item]);
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
                console.log("Fetched magic lists:", fetchedLists);
            } else {
                console.error("Magic list data is undefined or items are missing");
                setSnackbarMessage('Failed to fetch magic lists. Please try again.');
                setIsSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error fetching magic lists:", error);
            setSnackbarMessage('Failed to fetch magic lists. Please try again.');
            setIsSnackbarOpen(true);
        }
        setMagicLists(fetchedLists);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Define a default item with all properties
        const defaultItem: Item = {
            id: '', // default value
            itemName: '', // default value
            itemLink: '', // default value
            description: '', // default value
            price: '', // default value
            currency: '',
            listId: '', // default value
            listName: '', // default value
            checked: false, // default value
            index: 0, // default value or appropriate value for index
        };

        setcurrentEditItem(prevItem => {
            // If prevItem is null, return a new Item with default values, else update the existing item
            return prevItem ? { ...prevItem, [name]: value } : { ...defaultItem, [name]: value };
        });
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="currency-select-label">Currency</InputLabel>
                    <Select
                        labelId="currency-select-label"
                        id="currency-select"
                        name="currency"
                        value={item ? item.currency : ''}
                        onChange={handleCurrencyChange}
                    >
                        <MenuItem value="IDR">IDR</MenuItem>
                        <MenuItem value="UZS">UZS</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        {/* Add other currencies as needed */}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="price" // Corresponds to the price property
                    label="Item Price"
                    type="number"
                    fullWidth
                    value={item ? item.price : ''}
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="itemName"
                    label="Item Name"
                    type="text"
                    fullWidth
                    value={item ? item.itemName : ''}
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="itemLink"
                    label="Item Link"
                    type="text"
                    fullWidth
                    value={item ? item.itemLink : ''}
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="itemDescription"
                    label="Item Description"
                    type="text"
                    fullWidth
                    value={item ? item.description : ''}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="list-select-label">List</InputLabel>
                    <Select
                        labelId="list-select-label"
                        id="list-select"
                        name="list"
                        value={
                            magicLists.find(list => list.name === item.listName)?.id || ''
                        }
                        onChange={handleSelectChange}
                    >
                        {magicLists.map((list) => (
                            <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Add more TextFields for itemLink, description, price, etc. */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    if (currentEditItem) {
                        onSave(currentEditItem);
                    } else {
                        // Handle the case where currentEditItem is null, if necessary
                        console.error("No item to save");
                    }
                }} color="primary">
                    Update
                </Button>

            </DialogActions>
        </Dialog>
    );
};
export default EditItem;