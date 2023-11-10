//..src/components/ShoppingList/AddShoppingListItem.tsx
import React, {useState, FC, useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { setDoc } from "@junobuild/core-peer";
//import { initializeJuno } from '../../lib/Juno/initJuno';
import { nanoid } from "nanoid";
import { AuthContext } from "../../contexts/AuthContext";
interface AddShoppingListNoteProps {
  open: boolean;
  onClose: () => void;
  userId: string; // Assuming you pass the user ID as a prop
}

const AddShoppingListItem: FC<AddShoppingListNoteProps> = ({ open, onClose }) => {
    const [note, setNote] = useState<string>('');
    const { user } = useContext(AuthContext);
    const handleAddNote = async () => {
        if (!note.trim()) {
            alert('Please provide a valid note.');
            return;
        }

        try {
            const noteId = `${nanoid()}`;
            await setDoc({
                collection: "ShoppingList",
                doc: {
                    key: noteId,
                    data: {
                        content: note
                    }
                }
            });

      alert("Note added successfully!");
      setNote("");
      onClose();
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add Shopping List Item
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Note"
          variant="outlined"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNote}
                >
                    Add Note
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default AddShoppingListItem;
