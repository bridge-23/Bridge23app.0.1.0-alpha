//..src/components/Magiclist/MagicItemComponent.tsx
import Link from "next/link";
import React, {useState} from "react";
import { Accordion, AccordionSummary, AccordionDetails, Chip, Checkbox, IconButton, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {MagicListItem} from "../../types";
//TODO: check all by key:...[index].id
interface MagicItemProps {
    item: Partial<MagicListItem>; // Accept Partial<Item> type to allow for optional properties
    onDelete: () => void;
    onCheck: () => void;
    onEdit: (item: Partial<MagicListItem>) => void;
    index: number;
}
const TransactionsItemComponent: React.FC<MagicItemProps> = ({ item, onDelete, onCheck, onEdit }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const formatCurrency = (amount: number | null | undefined, currency: string | null | undefined): string => {
        if (amount === null || amount === undefined || isNaN(amount)) {
            return ''; // or 'N/A' or any other placeholder
        }

        if (!currency) {
            return ''; // or 'N/A' or any other placeholder
        }

        let locale = 'en-US'; // Default locale

        switch (currency) {
            case 'EUR':
                locale = 'de-DE'; // Example: German format for Euro
                break;
            // Add more cases for different currencies if needed
            default:
                locale = 'en-US';
        }

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const formattedPrice = formatCurrency(item.price ?? 0, item.currency ?? 'USD');
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const extractDomain = (url: string): string => {
        let domain: string;
        // Remove protocol (http, https, etc.)
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        } else {
            domain = url.split('/')[0];
        }
        // Remove port number
        domain = domain.split(':')[0];
        return domain;
    };

    return (
        <Accordion expanded={expanded} onChange={handleExpandClick}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Checkbox edge="start" tabIndex={-1} disableRipple checked={item.checked} onChange={onCheck}/>
                <ListItemText
                    primary={`${formattedPrice} ${item.itemName}`}
                    secondary={item.itemLink && (
                        <Link href={item.itemLink} target="_blank" style={{ color: 'blue' }}>
                            {extractDomain(item.itemLink)}
                        </Link>
                    )}
                />
            </AccordionSummary>
            <AccordionDetails>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <ListItemText
                        primary="Description"
                        secondary={<span>{item.description}</span>}
                    />
                    <Chip label={item.listName} color="info" style={{marginLeft: 10}}/>
                    <div>
                        <IconButton onClick={() => onEdit(item)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

    );
};
export default TransactionsItemComponent;