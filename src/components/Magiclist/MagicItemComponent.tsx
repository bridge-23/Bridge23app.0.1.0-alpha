//..src/components/Magiclist/MagicItemComponent.tsx
import React, {useState} from "react";
import { Accordion, AccordionSummary, AccordionDetails, Chip, Checkbox, IconButton, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import {Item} from "../../types";
//TODO: check all by key:...[index].id
interface MagicItemProps {
    item: Item; // Ensure this matches usage
    onDelete: () => void;
    onCheck: () => void;
    onEdit: (item: Item) => void;
    index: number;
}
const MagicItemComponent: React.FC<MagicItemProps> = ({ item, onDelete, onCheck, onEdit }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const formatCurrency = (amount: number, currency: string): string => {
        // Define the locale based on the currency or user preference
        let locale =  'en-US'; // Default locale

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
    }
    const formattedPrice = formatCurrency(item.price, item.currency);
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
export default MagicItemComponent;