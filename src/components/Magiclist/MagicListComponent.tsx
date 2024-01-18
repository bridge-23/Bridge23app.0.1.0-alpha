//..src/components/MagicList/MagicListComponent.tsx
import React, {useContext, useEffect, useState} from 'react';
import {List, Typography, Box, Snackbar, Divider} from '@mui/material';
import {setDoc, listDocs, getDoc, deleteDoc} from "@junobuild/core-peer";
import { AuthContext } from "../../contexts/AuthContext";
import { useRecoilState } from 'recoil';
import { nanoid } from "nanoid";
import AddItemComponent from "./AddItemComponent";
import EditItemComponent from "./EditItemComponent";
import MagicItem from './MagicItemComponent';
import {MagicList} from "../../types";
import {MagicListItem} from "../../types";
import { magicListsState, magicListItemState } from '../../state/atoms';
import { useLoading } from '../../contexts/LoadingContext';

const MagicListComponent: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { setLoading } = useLoading();
    const [currentItem, setCurrentItem] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editingItem, setEditingItem] = useState<MagicListItem | null>(null);
    const [magicLists, setMagicLists] = useRecoilState(magicListsState);
    const [items, setItems] = useRecoilState(magicListItemState);
    const handleEditOpen = (item: MagicListItem) => {
        setEditingItem(item);
        console.log("22Editing item set:", item);
    };
    const handleEditClose = () => {
        setEditingItem(null);
    };
    useEffect(() => {
        (async () => {
            try {
                await fetchMagicListItems();
                await fetchMagicLists();
            } catch (error) {
                console.error("Failed to fetch MagicListItem:", error);
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
                setMagicLists(fetchedLists);
            } else {
                console.error("Magic list data is undefined or items are missing");
            }
        } catch (error) {
            console.error("Error fetching magic lists:", error);
        }
    };
    const fetchMagicListItems = async () => {
        let fetchedItems: MagicListItem[] = []; // Use Item[] as the type
        try {
            const shoppingListData = await listDocs({
                collection: "MagicListItems"
            });

            if (shoppingListData && shoppingListData.items) {
                fetchedItems = shoppingListData.items.map(doc => {
                    const data = doc.data as MagicListItem; // Ensure data matches the Item type
                    return {
                        ...data, // Spread all properties from the data
                        id: doc.key,
                        checked: data.checked || false
                    };
                });
            } else {
                console.error("Shopping list data is undefined or items are missing");
                alert('Failed to fetch shopping list. Please try again.');
            }
        } catch (error) {
            console.error("Error fetching shopping list:", error);
            alert('Failed to fetch shopping list. Please try again.');
        }
        const sortedFetchedItems = fetchedItems.sort((a, b) => {
            const aChecked = a.checked || false;
            const bChecked = b.checked || false;
            return Number(aChecked) - Number(bChecked);
        });
        setItems(sortedFetchedItems);
    };
    const handleCheckboxChange = async (index: number) => {

        setLoading(true);

        const updatedItems = items.map((item, idx) => {
            if (idx === index) {
                // Toggle the 'checked' property of the specific item
                return { ...item, checked: !item.checked };
            }
            return item;
        });

        const currentDoc = await getDoc({ collection: "MagicListItems", key: updatedItems[index].id || ''});
        if (!currentDoc) {
            console.error("Error retrieving the current document.");
            alert('Failed to retrieve the current document. Please try again.');
            return;
        }
        if (!user) {
            alert('You must be logged in to add a note.');
            return;
        }
        try {
            await setDoc({
                collection: "MagicListItems",
                doc: {
                    key: updatedItems[index].id || '',
                    updated_at: currentDoc.updated_at,
                    data: {
                        price:updatedItems[index].price,
                        currency:updatedItems[index].currency,
                        itemName:updatedItems[index].itemName,
                        itemLink:updatedItems[index].itemLink,
                        description:updatedItems[index].description,
                        listId:updatedItems[index].listId,
                        checked: updatedItems[index].checked,
                        listName:updatedItems[index].listName,
                        owner: {
                            userId: user.key,
                        },
                    }
                }
            });
            setItems(updatedItems);
            // If the checkbox is checked, add a new note
            if (updatedItems[index].checked) {
                await addNote(index);
            }
            await fetchMagicListItems();
            // Apply filter to show only checked items
            const filteredItems = updatedItems.filter(item => item.checked);
            setItems(filteredItems);
        } catch (error) {
            console.error("Error updating note:", error);
            alert('Failed to update note. Please try again.');
        } finally {
            setLoading(false);
        }
        const sortedUpdatedItems = [...updatedItems].sort((a, b) => {
            const aChecked = a.checked ?? false;
            const bChecked = b.checked ?? false;
            return Number(aChecked) - Number(bChecked);
        });
        setItems(sortedUpdatedItems);
        // Closing the backdrop and other cleanup
        setLoading(false);
    };
    const addNote = async (index: number) => {  // Assuming noteText is the text of the new note
        if (currentItem.trim()) {
            if (!user) {
                alert('You must be logged in to add a note.');
                return;
            }
            const noteId = `${nanoid()}`;
            setLoading(true);
            try {
                await setDoc({
                    collection: "MagicListItems",
                    doc: {
                        key: noteId,
                        data: {
                            itemName: currentItem,
                            itemLink:'',
                            description:'',
                            price:'',
                            currency:'',
                            listId:'',
                            checked: false,
                            listName:'',
                            owner: {
                                userId: user.key,
                            },
                        }
                    }
                });
                setItems(prevItems => prevItems.filter((_, i) => i !== index));
                setCurrentItem('');
                setSnackbarMessage('Note added successfully');
                setSnackbarOpen(true);
                // Reset current note input field if you have one
                await fetchMagicListItems();
                await fetchMagicLists();
            } catch (error) {
                console.error("Error adding note:", error);
                alert('Failed to add note. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };
    const handleEditSave = async (updatedItem: Partial<MagicListItem>) => {
        console.log("handleEditSave received:", updatedItem);

        setLoading(true);
        try {
            // Ensure the id of the updated item is defined
            if (!updatedItem.id) {
                console.error("No item id provided for editing.");
                setSnackbarMessage('No item id provided for editing.');
                setSnackbarOpen(true);
                setLoading(false);
                return;
            }

            const currentDoc = await getDoc({ collection: "MagicListItems", key: updatedItem.id });
            if (!currentDoc) {
                console.error("No item selected for editing.");
                setSnackbarMessage('No item selected for editing.');
                setSnackbarOpen(true);
                setLoading(false);
                return;
            }

            if (!user) {
                alert('You must be logged in to edit an item.');
                setLoading(false);
                return;
            }

            await setDoc({
                collection: "MagicListItems",
                doc: {
                    key: updatedItem.id,
                    updated_at: currentDoc.updated_at,
                    data: updatedItem
                }
            });

            setSnackbarMessage("Item updated successfully.");
            setSnackbarOpen(true);
            setCurrentItem('');
            // Update the items state here if necessary

            // Update the local state with the edited item
            setItems(prevItems => {
                const updatedItems = prevItems.map(item =>
                    item.id === updatedItem.id ? updatedItem : item
                );
                return updatedItems;
            });
        } catch (error) {
            console.error("Error updating item:", error);
            setSnackbarMessage("Failed to update item. Please try again.");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
            handleEditClose();
        }
    };

    const handleDelete = async (index: number) => {
        setLoading(true);

        const itemId = items[index].id;

        if (!itemId) { return }
        try {
            const currentDoc = await getDoc({ collection: "MagicListItems", key: itemId || '' });
            if (!currentDoc) {
                console.error(`Document with ID ${itemId} not found.`);
                // Show an error message to the user
                return;
            }
            await deleteDoc({
                collection: "MagicListItems",
                doc: {
                    key: itemId || '',
                    updated_at: currentDoc.updated_at,
                    data: {}
                }
            });
            // Update local state after successful deletion in the backend
            setItems((oldItems) => oldItems.filter(item => item.id !== itemId));
            setSnackbarMessage("Note deleted successfully.");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error deleting item:", error);
            setSnackbarMessage("Failed to delete note.");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <List>
            <Divider />
            {magicLists.map((list) => (
                <li key={list.id}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                        margin: '20px 0', // Margin of 20 pixels on top and bottom
                        paddingX: '10px' // Horizontal padding of 20 pixels
                    }}
                    >
                        <Typography variant="h6">{list.name}</Typography>
                        <AddItemComponent selectedListId={list.id} />

                    </Box>
                    {items
                        .filter(item => item.listId === list.id) // Use list.id for filtering
                        .map((filteredItem, index) => (
                            <MagicItem
                                key={filteredItem.id}
                                item={filteredItem}
                                onDelete={() => handleDelete(items.findIndex(n => n.id === filteredItem.id))}
                                onCheck={() => handleCheckboxChange(items.findIndex(n => n.id === filteredItem.id))}
                                onEdit={() => handleEditOpen(filteredItem as MagicListItem)}
                                index={items.findIndex(n => n.id === filteredItem.id)}
                            />
                        ))
                    }
                </li>
            ))}
            {editingItem && (
                <EditItemComponent
                    isOpen={!!editingItem}
                    item={editingItem}
                    setItem={setEditingItem}
                    onSave={handleEditSave}
                    onClose={handleEditClose}
                />
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </List>
    );
};
export default MagicListComponent;
