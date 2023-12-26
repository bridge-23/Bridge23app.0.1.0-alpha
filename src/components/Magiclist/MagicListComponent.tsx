//..src/components/MagicList/MagicListComponent.tsx
import React, {useContext, useEffect, useState} from 'react';
import {List, Typography, Box, Snackbar, Divider} from '@mui/material';
import { AuthContext } from "../../contexts/AuthContext";
import {setDoc, listDocs, getDoc, deleteDoc} from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import {Item} from "../../types";
import {MagicList} from "../../types";
import MagicItem from './MagicItemComponent';
import AddItemComponent from "./AddItemComponent";
import EditItemComponent from "./EditItemComponent";
const MagicListComponent: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [notes, setNotes] = useState<Item[]>([]);
    const [currentNote, setCurrentNote] = useState<string>('');
    const [currentEditItem, setcurrentEditItem] = useState<Item | null>(null);
    const [magicLists, setMagicLists] = useState<MagicList[]>([]);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const handleEditOpen = (item: Item) => {
        setEditingItem(item);
    };
 /*   const handleEditSave = (updatedItem: Item) => {
        const updatedNotes = notes.map(note => note.id === updatedItem.id ? updatedItem : note);
        setNotes(updatedNotes);
        setEditingItem(null); // Close the edit dialog
        setSnackbarMessage("Item updated successfully.");
        setSnackbarOpen(true);
    };*/
    const handleEditClose = () => {
        setEditingItem(null);
    };
    const handleAddItem = (newItem: Item) => {
        setNotes(prevNotes => [...prevNotes, { ...newItem, id: nanoid() }]);
    };
    useEffect(() => {
        (async () => {
            try {
                await fetchShoppingList();
                fetchMagicLists();
            } catch (error) {
                console.error("Failed to fetch shopping list:", error);
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
    const fetchShoppingList = async () => {
        let fetchedNotes: Item[] = []; // Use Item[] as the type
        try {
            const shoppingListData = await listDocs({
                collection: "ShoppingList"
            });

            if (shoppingListData && shoppingListData.items) {
                fetchedNotes = shoppingListData.items.map(doc => {
                    const data = doc.data as Item; // Ensure data matches the Item type
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
        const sortedFetchedNotes = fetchedNotes.sort((a, b) => Number(a.checked) - Number(b.checked));
        setNotes(sortedFetchedNotes);
    };
    const handleCheckboxChange = async (index: number) => {
        setBackdropOpen(true);
        const updatedNotes = [...notes];
        updatedNotes[index].checked = !updatedNotes[index].checked;
        const currentDoc = await getDoc({ collection: "ShoppingList", key: updatedNotes[index].id });

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
                collection: "ShoppingList",
                doc: {
                    key: updatedNotes[index].id,
                    updated_at: currentDoc.updated_at,
                    data: {
                        itemName:updatedNotes[index].itemName,
                        itemLink:updatedNotes[index].itemLink,
                        description:updatedNotes[index].description,
                        price:updatedNotes[index].price,
                        currency:updatedNotes[index].currency,
                        listId:updatedNotes[index].listId,
                        checked: updatedNotes[index].checked,
                        listName:updatedNotes[index].listName,
                        owner: {
                            userId: user.key,
                            provider: user.data.provider
                        },
                    }
                }
            });
            setNotes(updatedNotes);
            // If the checkbox is checked, add a new note
            if (updatedNotes[index].checked) {
                const noteText = "Some text for the new note"; // Replace this with the actual note text
                await addNote(index);
            }
        } catch (error) {
            console.error("Error updating note:", error);
            alert('Failed to update note. Please try again.');
        } finally {
            setBackdropOpen(false); // Close the backdrop
        }
        const sortedUpdatedNotes = updatedNotes.sort((a: { checked?: boolean; id: string }, b: { checked?: boolean; id: string }) => Number(a.checked) - Number(b.checked));
        setNotes(sortedUpdatedNotes);
    };
    const addNote = async (index: number) => {  // Assuming noteText is the text of the new note
        if (currentNote.trim()) {
            if (!user) {
                alert('You must be logged in to add a note.');
                return;
            }

            const noteId = nanoid();
            setBackdropOpen(true);
            try {
                await setDoc({
                    collection: "ShoppingList",
                    doc: {
                        key: noteId,
                        data: {
                            itemName: currentNote,
                            itemLink:'',
                            description:'',
                            price:'',
                            currency:'',
                            listId:'',
                            checked: false,
                            listName:'',
                            owner: {
                                userId: user.key,
                                provider: user.data.provider
                            },
                        }
                    }
                });
                setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
                // Reset current note input field if you have one
            } catch (error) {
                console.error("Error adding note:", error);
                alert('Failed to add note. Please try again.');
            } finally {
                setBackdropOpen(false);
            }
        }
    };
    const handleEditSave = async (updatedItem: Item) => {
        setBackdropOpen(true);
        try {
            const docKey = updatedItem.id; // Ensure this value is defined
            console.log("Doc key for getDoc:", docKey); // Debugging log

            const currentDoc = await getDoc({ collection: "ShoppingList", key: updatedItem.id });
            if (!currentDoc) {
                console.error("No item selected for editing.");
                setSnackbarMessage('No item selected for editing.');
                setSnackbarOpen(true);
                return;
            }

            if (!user) {
                alert('You must be logged in to add a note.');
                return;
            }

            await setDoc({
                collection: "ShoppingList",
                doc: {
                    key: updatedItem.id,
                    updated_at: currentDoc.updated_at,
                    data: updatedItem
                }
            });
            setSnackbarMessage("Item updated successfully.");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error updating item:", error);
            console.error("Error in handleEditSave:", error);
            setSnackbarMessage("Failed to update item. Please try again.");
            setSnackbarOpen(true);
        } finally {
            setBackdropOpen(false);
            handleEditClose(); // Ensure handleEditClose is defined and accessible
        }
    };

    const handleDelete = async (index: number) => {
        setBackdropOpen(true);
        const itemId = notes[index].id;
        console.log(`Attempting to delete item at index: ${index}`);
        console.log("Current notes:", notes);

        try {
            const currentDoc = await getDoc({ collection: "ShoppingList", key: itemId });
            if (!currentDoc) {
                console.error(`Document with ID ${itemId} not found.`);
                // Show an error message to the user
                return;
            }
            await deleteDoc({
                collection: "ShoppingList",
                doc: {
                    key: itemId,
                    updated_at: currentDoc.updated_at,
                    data: {}
                }
            });
            // Update local state after successful deletion in the backend
            setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
            setSnackbarMessage("Note deleted successfully.");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error deleting item:", error);
            setSnackbarMessage("Failed to delete note.");
            setSnackbarOpen(true);
        } finally {
            setBackdropOpen(false);
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
                        style={{ margin: '20px 0' }} // Margin of 20 pixels on top and bottom
                    >
                        <Typography variant="h6">{list.name}</Typography>
                        <AddItemComponent onAddItem={handleAddItem} />
                    </Box>
                    {notes
                        .filter((note) => note.listName === list.name) // Filtering notes by listName
                        .map((filteredNote, index) => (
                            <MagicItem
                                key={filteredNote.id}
                                item={filteredNote}
                                onDelete={() => handleDelete(notes.findIndex(n => n.id === filteredNote.id))}
                                onCheck={() => handleCheckboxChange(notes.findIndex(n => n.id === filteredNote.id))}
                                onEdit={() => handleEditOpen(filteredNote)}
                                index={notes.findIndex(n => n.id === filteredNote.id)}
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
