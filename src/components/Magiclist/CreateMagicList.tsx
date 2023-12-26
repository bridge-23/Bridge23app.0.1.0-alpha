//../src/components/Magiclist/CreateMagicList.tsx
import React, {useState, FC, useContext} from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { setDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import {AuthContext} from "../../contexts/AuthContext";
interface CreateMagicListProps {
    onListCreated: () => void; // Ensure this matches usage
}
const CreateMagicList: FC<CreateMagicListProps> = ({ onListCreated }) => {
    const [listName, setListName] = useState('');
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const createNewMagicList = async () => {
        if (!listName.trim()) return;
        if (!user) {
            alert('You must be logged in to add a note.');
            return;
        }
        try {
            const newListId = nanoid();
            const currentTimestamp = new Date().toISOString();

            await setDoc({
                collection: "MagicLists",
                doc: {
                    key: newListId,
                    data: {
                        listid: newListId,
                        name: listName,
                        owner: {
                            userId: user.key,
                        },
                        createdAt: currentTimestamp, // Add creation timestamp
                        updatedAt: currentTimestamp, // Initially, creation and update time are the same
                    }
                }
            });
            onListCreated(); // Callback to inform parent component
            setListName(''); // Reset the list name input
        } catch (error) {
            console.error("Error creating new list:", error);
            alert('Failed to create new list. Please try again.');
        }
        handleClose();
    };

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                Create Magic List
            </Button>

            {/* The rest of your code remains unchanged */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Magic List</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="List Name"
                        type="text"
                        fullWidth
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={createNewMagicList} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default CreateMagicList;
