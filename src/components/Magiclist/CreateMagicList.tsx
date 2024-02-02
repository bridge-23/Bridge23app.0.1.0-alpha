//../src/components/Magiclist/CreateMagicList.tsx
import React, {useState, FC, useContext} from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    useMediaQuery,
    Drawer
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { setDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import {AuthContext} from "../../contexts/AuthContext";
import {useTheme} from "@mui/material/styles";
interface CreateMagicListProps {
    onListCreated: () => void; // Ensure this matches usage
}
const CreateMagicList: FC<CreateMagicListProps> = ({ onListCreated }) => {
    const [listName, setListName] = useState('');
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const renderFormContent = () => (
        <Box p={2}>
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
            <Box display="flex" justifyContent="center" mt={2} sx={{ gap: 2 }}>
                <Button variant="outlined" onClick={handleClose} color="primary">Cancel</Button>
                <Button variant="outlined" onClick={createNewMagicList} color="primary">Create</Button>
            </Box>
        </Box>
    );
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
                sx={{ borderRadius: '24px' }}
            >
                Create Magic List
            </Button>

            {isMobile ? (
                <Drawer
                    anchor="bottom"
                    open={open}
                    onClose={handleClose}
                    sx={{
                        '& .MuiDrawer-paper': {
                            borderTopLeftRadius: '24px',
                            borderTopRightRadius: '24px',
                            paddingBottom: '144px',
                        },
                    }}
                >
                    {renderFormContent()}
                </Drawer>
            ) : (
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Magic List</DialogTitle>
                    <DialogContent>
                        {renderFormContent()}
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    );
};

export default CreateMagicList;
