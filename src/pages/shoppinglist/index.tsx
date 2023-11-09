//..src/page/shoppinglist/index.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, Paper, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, useMediaQuery } from '@mui/material';
import { AuthContext } from "../../contexts/AuthContext";
import { setDoc, listDocs,deleteDoc,getDoc} from "@junobuild/core";
import { nanoid } from "nanoid";
//import { useRouter } from 'next/router';

//TODO: make shopping panel for create shopping list
//TODO: add edit button for shopping list
interface ShoppingListItemProps {
    note: string;
    onDelete: () => void;
}
interface ShoppingListDoc {
    content: string;
    checked?: boolean;
}
const ShoppingListItem: React.FC<ShoppingListItemProps & { checked: boolean, onCheck: () => void }> = ({ note, onDelete, checked, onCheck}) => {
    const itemStyle = checked ? { backgroundColor: '#f0f0f0', color: '#d0d0d0' } : {};
    return (
        <ListItem style={itemStyle}>
            <Checkbox edge="start" tabIndex={-1} disableRipple checked={checked} onChange={onCheck} />
            <ListItemText primary={note} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
const ShoppingList: React.FC = () => {
    const [notes, setNotes] = useState<{
        checked: boolean; content: string, id: string
    }[]>([]);
    const [currentNote, setCurrentNote] = useState<string>('');
    const [junoReady, setJunoReady] = useState<boolean>(false);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const { user } = useContext(AuthContext);

    const paperStyle = {
        padding: '20px',
        paddingLeft: isDesktop ? '90px' : '20px',
        paddingTop: isDesktop ? '20px' : '50px',
    };

    useEffect(() => {
        async function init() {
            setJunoReady(true);
        }
        init();
    }, []);

    useEffect(() => {
        if (junoReady) {
            fetchShoppingList();
        }
    }, [junoReady]);
    const fetchShoppingList = async () => {
        let fetchedNotes: {
            checked: boolean; content: string; id: string;
        }[] = []; // Declare fetchedNotes here and initialize it as an empty array

        try {
            const shoppingListData = await listDocs({
                collection: "ShoppingList"
            });

            if (shoppingListData && shoppingListData.items) {
                fetchedNotes = shoppingListData.items.map(doc => {
                    const data = doc.data as ShoppingListDoc;
                    return {
                        content: data.content,
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

        // Sort fetchedNotes after it's been populated
        const sortedFetchedNotes = fetchedNotes.sort((a, b) => Number(a.checked) - Number(b.checked));
        setNotes(sortedFetchedNotes);
    };
    const handleCheckboxChange = async (index: number) => {
        const updatedNotes = [...notes];
        updatedNotes[index].checked = !updatedNotes[index].checked;
        const currentDoc = await getDoc({ collection: "ShoppingList", key: updatedNotes[index].id });
        // Check if currentDoc exists
        if (!currentDoc) {
            console.error("Error retrieving the current document.");
            alert('Failed to retrieve the current document. Please try again.');
            return; // exit the function
        }
        try {
            await setDoc({
                collection: "ShoppingList",
                doc: {
                    key: updatedNotes[index].id,
                    updated_at: currentDoc.updated_at, // use the retrieved timestamp
                    data: {
                        content: updatedNotes[index].content,
                        checked: updatedNotes[index].checked,
                    }
                }
            });
            setNotes(updatedNotes);
            // If the checkbox is checked, add a new note
            if (updatedNotes[index].checked) {
                addNote();
            }
        } catch (error) {
            console.error("Error updating note:", error);
            alert('Failed to update note. Please try again.');
        }
        const sortedUpdatedNotes = updatedNotes.sort((a: { checked: boolean; content: string; id: string }, b: { checked: boolean; content: string; id: string }) => Number(a.checked) - Number(b.checked));
        setNotes(sortedUpdatedNotes);
    };
    const addNote = async () => {
        if (currentNote.trim()) {
            if (!junoReady) {
                alert('Application is initializing, please try again in a moment.');
                return;
            }
            if (!user) {
                alert('You must be logged in to add a note.');
                return;
            }
            const noteId = `${nanoid()}`;

            try {
                await setDoc({
                    collection: "ShoppingList",
                    doc: {
                        key: noteId,
                        data: {
                            content: currentNote,
                            checked: false,
                            owner: {
                                userId: user.key,  // Using the 'key' property as the user's unique identifier
                                provider: user.data.provider
                            }
                        }
                    }
                });
                setNotes([...notes, { content: currentNote, id: noteId, checked: false }]);
                setCurrentNote('');
            } catch (error) {
                console.error("Error adding note:", error);
                alert('Failed to add note. Please try again.');
            }
        }
    };
    const deleteNote = async (index: number) => {
        const noteId = notes[index].id;  // Get the note's id

        // Retrieve the most recent document
        const currentDoc = await getDoc({ collection: "ShoppingList", key: noteId });

        // Check if currentDoc exists
        if (!currentDoc) {
            console.error("Error retrieving the current document.");
            alert('Failed to retrieve the current document before deleting. Please try again.');
            return; // exit the function
        }

        try {
            await deleteDoc({
                collection: "ShoppingList",
                doc: {
                    key: noteId,
                    updated_at: currentDoc.updated_at, // use the retrieved timestamp
                    data: { }  // If required by the function
                }
            });

            const newNotes = [...notes];
            newNotes.splice(index, 1);
            setNotes(newNotes);
        } catch (error) {
            console.error("Error deleting note:", error);
            alert('Failed to delete note. Please try again.');
        }
    };

    return (
        <Paper elevation={2} style={paperStyle}>
            <Typography
                variant="h3"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'primary.main' //
                }}
            >
                List - {user && `${user.key.substring(0, 3)}...${user.key.substring(user.key.length - 3)}`}
            </Typography>

            <Box display="flex" alignItems="center" style={{ marginBottom: '20px' }}>
                <AddIcon style={{ marginRight: '8px' }} />
                <TextField
                    variant="standard"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Add item"
                    fullWidth
                />
            </Box>

            <Button variant="contained" color="primary" style={{ marginBottom: '20px', width: '100%' }} onClick={() => addNote()}>
                Add Item
            </Button>

            <List>
                {notes.map((note, index) => (
                    <ShoppingListItem
                        key={index}
                        note={note.content}
                        onDelete={() => deleteNote(index)}
                        checked={note.checked}
                        onCheck={() => handleCheckboxChange(index)}
                    />
                ))}
            </List>
        </Paper>
    );
};
export default ShoppingList;

