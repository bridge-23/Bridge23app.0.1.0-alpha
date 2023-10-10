//..src/components/Transactions/receiptRow.js
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import styles from '../styles/receiptRow.module.scss';

/*
 Each row with receipt information

 props:
  - receipt data:
    - id (doc id of receipt)
    - uid (user id of user who submitted the receipt)
    - date
    - locationName
    - address
    - items
    - amount
    - imageUrl
    - isConfirmed
  - toConfirm: boolean for whether the row is to be confirmed

  - onEdit emits to notify needing to update receipt
  - onDelete emits to notify needing to delete receipt
 */
export default function ReceiptRow(props) {
    const receipt = props.receipt;
    return (
        <div>
            <Stack direction="row" justifyContent="space-between" sx={{ margin: "1em 0" }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <Avatar alt="receipt image" src={receipt.imageUrl} />
                    <Stack direction="row" className={styles.contentRow}>
                        <Stack direction="column" sx={{ flexGrow: 1 }}>
                            <Typography variant="h3">
                                {format(receipt.date, 'MM/dd/yy')}
                            </Typography>
                            <Typography variant="h3">
                                ${receipt.amount}
                            </Typography>
                        </Stack>
                        <Stack direction="column" sx={{ flexGrow: 1 }}>
                            <Typography variant="h5">
                                {receipt.locationName} ({receipt.address})
                            </Typography>
                            <Typography variant="h5">
                                {receipt.items}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                {props.toConfirm ?
                    <Stack direction="row" className={styles.actions}>
                        <IconButton aria-label="edit" color="secondary" onClick={props.onEdit}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={props.onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                    :
                    <Stack direction="row" className={styles.actions}>
                        <IconButton aria-label="edit" color="secondary" onClick={props.onEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={props.onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>}
            </Stack>
        </div>
    )
}