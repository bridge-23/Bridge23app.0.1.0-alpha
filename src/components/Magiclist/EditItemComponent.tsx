//..src/components/Magiclist/EditItemComponent.tsx
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Snackbar} from "@mui/material";
import {getDoc, listDocs, setDoc} from "@junobuild/core-peer";
import {MagicListItem, MagicList} from "../../types";
import { useRecoilState } from 'recoil';

interface EditItemProps {
    isOpen: boolean;
    item: Partial<MagicListItem>;
    setItem: React.Dispatch<React.SetStateAction<MagicListItem | null>>;
    onClose: () => void;
    onSave: (updatedItem: Partial<MagicListItem>) => void;
}
const EditItem: React.FC<EditItemProps> = ({ isOpen, item, setItem, onClose, onSave }) => {
    const [magicLists, setMagicLists] = useState<MagicList[]>([]);
    const [currentEditItem, setCurrentEditItem] = useState<Partial<MagicListItem> | null>(null);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleCurrencyChange = (event: SelectChangeEvent) => {
        const newCurrency = event.target.value as string;

        setCurrentEditItem(prevItem => {
            return prevItem ? { ...prevItem, currency: newCurrency } : null; // Fallback to null if prevItem is null
        });
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        const selectedListId = event.target.value;
        const selectedList = magicLists.find(list => list.id === selectedListId);

        setCurrentEditItem(prevItem => {
            if (!prevItem) return null;
            return {
                ...prevItem,
                listId: selectedListId,
                listName: selectedList ? selectedList.name : '', // Update both ID and Name
            };
        });
    };

    useEffect(() => {

        fetchMagicLists().then(r => console.log("Magic lists fetched:", r));

        setCurrentEditItem(item as MagicListItem);
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
        setCurrentEditItem((prevItem) => {
            const updatedItem = { ...prevItem, [name]: value };
            console.log("Updated item in handleInputChange:", updatedItem);
            return updatedItem;
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
                        <MenuItem value="BTC">BTC</MenuItem>
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="ICP">ICP</MenuItem>
                        {/* Add other currencies as needed */}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="price"
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
                    name="description"
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
                        name="listId" // Change to listId
                        value={currentEditItem ? currentEditItem.listId : ''}
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
                        console.log("Saving item:", currentEditItem);
                        onSave(currentEditItem);
                    } else {
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