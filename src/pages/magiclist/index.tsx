//..src/page/magiclist/index.tsx
import React, { useContext, useEffect, useState } from 'react';
import {
    useTheme,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction, Checkbox, IconButton, Paper, Typography, Box, Backdrop,
    CircularProgress, Container, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from "../../contexts/AuthContext";
import { setDoc, listDocs,deleteDoc,getDoc} from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import {Theme} from "@mui/material/styles";
//import usePullToRefresh from '../../hooks/usePullToRefresh';
//import CreateMagicList from "../../components/Magiclist/CreateMagicList";

//TODO: make shopping panel for create shopping list
//TODO: add edit button for shopping list
interface ShoppingListItemProps {
    note: string;
    onDelete: () => void;
    onCheck: () => void;
    onEdit: () => void;
    index: number;
}
interface ShoppingListDoc {
    content: string;
    checked?: boolean;
}

const ShoppingListItem: React.FC<ShoppingListItemProps & { checked: boolean, onCheck: () => void, onEdit: (note: ShoppingListDoc, index: number) => void }> = ({ note, onDelete, checked, onCheck, onEdit,index  }) => {
    const itemStyle = checked ? { backgroundColor: '#f0f0f0', color: '#d0d0d0' } : {};

    return (
        <ListItem style={itemStyle}>
            <Checkbox edge="start" tabIndex={-1} disableRipple checked={checked} onChange={onCheck}/>
            <ListItemText primary={note} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={onEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
interface EditDialogProps {
    content: string;
    isOpen: boolean; // Changed from string to boolean
    onClose: () => void;
    onUpdate: () => void;
    setContent: React.Dispatch<React.SetStateAction<string>>; // Correct type for setContent
}
const EditDialog: React.FC<EditDialogProps> = ({ isOpen, content, setContent, onUpdate, onClose }) => {
    return ( // Add return statement
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Note Content"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};
/*interface MagicList {
    // Define the structure of your magic list items here
    id: string;
    name: string;
    // other fields...
}*/
const ShoppingList: React.FC = () => {
    const { user } = useContext(AuthContext);
    //usePullToRefresh();
    //const [magicLists, setMagicLists] = useState<MagicList[]>([]);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [notes, setNotes] = useState<{
        checked: boolean; content: string, id: string
    }[]>([]);
    const [currentNote, setCurrentNote] = useState<string>('');
    const [editingContent, setEditingContent] = useState("");
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<number | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    //const notesWithListId = notes.filter(note => note.listId);
    //const notesWithoutListId = notes.filter(note => !note.listId);
    const handleCloseEditDialog = () => setIsEditDialogOpen(false);
    const handleUpdateNote = () => {
        if (editingNote !== null) {
            editNote(editingNote);
            setIsEditDialogOpen(false);
        } else {
            console.error("Error: editingNote is null");
        }
    };
    const handleEditClick = (note: ShoppingListDoc, index: number) => {
        setEditingNote(index);
        setEditingContent(note.content);
        setIsEditDialogOpen(true);
    };

    const paperStyle = {
        padding: '20px',
        paddingLeft: isDesktop ? '90px' : '20px',
        paddingTop: isDesktop ? '20px' : '10px',
    };

    useEffect(() => {
        (async () => {
            try {
                await fetchShoppingList();
            } catch (error) {
                console.error("Failed to fetch shopping list:", error);
                // Handle the error appropriately
            }
        })();
    }, []);
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
                await addNote();
            }
        } catch (error) {
            console.error("Error updating note:", error);
            alert('Failed to update note. Please try again.');
        } finally {
            setBackdropOpen(false); // Close the backdrop
        }
        const sortedUpdatedNotes = updatedNotes.sort((a: { checked: boolean; content: string; id: string }, b: { checked: boolean; content: string; id: string }) => Number(a.checked) - Number(b.checked));
        setNotes(sortedUpdatedNotes);
    };
    const editNote = async (index: number) => {
        setBackdropOpen(true);

        const noteToEdit = notes[index];
        const currentDoc = await getDoc({ collection: "ShoppingList", key: noteToEdit.id });

        if (!currentDoc) {
            console.error("Error retrieving the current document.");
            alert('Failed to retrieve the current document. Please try again.');
            setBackdropOpen(false);
            return;
        }
        try {
            await setDoc({
                collection: "ShoppingList",
                doc: {
                    key: noteToEdit.id,
                    updated_at: currentDoc.updated_at,
                    data: {
                        content: editingContent, // The updated content
                        checked: noteToEdit.checked,
                    }
                }
            });

            const updatedNotes = notes.map((note, idx) =>
                idx === index ? { ...note, content: editingContent } : note
            );
            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error updating note:", error);
            alert('Failed to update note. Please try again.');
        } finally {
            setBackdropOpen(false);
            setEditingNote(null); // Reset editing note
            setEditingContent(""); // Reset editing content
        }
    };
    const addNote = async () => {
        if (currentNote.trim()) {
            if (!user) {
                alert('You must be logged in to add a note.');
                return;
            }
            const noteId = `${nanoid()}`;
            setBackdropOpen(true);
            try {
                await setDoc({
                    collection: "ShoppingList",
                    doc: {
                        key: noteId,
                        data: {
                            content: currentNote,
                            checked: false,
                            owner: {
                                userId: user.key,
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
            } finally {
                setBackdropOpen(false); // Close the backdrop
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
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px'}}>
            {/*<div>
                <CreateMagicList onListCreated={onListCreated} />
            </div>*/}
            <Box sx={{borderRadius: '24px', maxWidth: 'fit-content', margin: 'auto' }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'primary.main',
                        m: 2
                    }}
                >
                    Magic Lists
                </Typography>
            </Box>
            <Divider/>
            <br/>
            <Paper elevation={2} style={paperStyle}>
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
            <div>
                <Button variant="contained" color="primary" style={{ marginBottom: '20px', width: '100%' }} onClick={() => addNote()}>
                    Add Item
                </Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdropOpen}
                    onClick={() => setBackdropOpen(false)}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            <List>
                {notes.map((note, index) => (
                    <ShoppingListItem
                        key={index}
                        note={note.content}
                        onDelete={() => deleteNote(index)}
                        checked={note.checked}
                        onCheck={() => handleCheckboxChange(index)}
                        onEdit={() => handleEditClick(note, index)}
                        index={index}
                    />
                ))}
            </List>
        </Paper>
            <EditDialog
                isOpen={isEditDialogOpen}
                content={editingContent}
                setContent={setEditingContent}
                onUpdate={handleUpdateNote}
                onClose={handleCloseEditDialog}
            />
        </Container>
    );
};
export default ShoppingList;

