//..src/components/Accounts/AccountCardComponent.tsx
import React from 'react';
import { Card, CardContent, Typography, IconButton, Button, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

interface AccountCardProps {
    accountName: string;
    currentBalance: number;
    accountCurrency: string;
    accountType: string;
    onEdit: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
                                                     accountName,
                                                     currentBalance,
                                                     accountCurrency,
                                                     accountType,
                                                     onEdit,
                                                 }) => {
    // A helper function to format the balance text
    const formattedBalance = currentBalance !== undefined
        ? `${accountCurrency} ${currentBalance}`
        : `${accountCurrency} `;

    return (
        <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                perspective: '1000px',
                width: '500px',
                height: '200px',
                cursor: 'pointer',
                borderRadius: '24px',
                boxShadow: 3, // Adjust the elevation shadow as needed
            }}>
            <CardContent>
                <ListItem>
                    <ListItemText
                        primary={accountName}
                        secondary={
                            <>
                                <Typography component="span" variant="body2" color="text.secondary">
                                    {accountType}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2" color="text.secondary">
                                    Current balance
                                </Typography>
                            </>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={onEdit} size="small">
                            <EditIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Typography variant="h6" color="text.primary" gutterBottom>
                    {formattedBalance}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small">See More</Button>
            </CardActions>
        </Card>
    );
};
export default AccountCard;



