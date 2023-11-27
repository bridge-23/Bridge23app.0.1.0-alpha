//..src/pages/transactions/index.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Container, Typography, Grid, useMediaQuery, AccordionDetails, AccordionSummary, Accordion, Card, ToggleButtonGroup, ToggleButton, Box, Divider} from "@mui/material";
import {Theme} from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AppleIcon from '@mui/icons-material/Apple';
import StoreIcon from '@mui/icons-material/Store';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { setDoc, listDocs,deleteDoc,getDoc} from "@junobuild/core-peer";
//import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ReceiptData {
    supplier: string;
    address: string;
    amount: number;
    date: string;
    time: string;
    items: Array<{
        description: string;
        amount: number;
    }>;
}
export default function Transactions () {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [selectedToggle, setSelectedToggle] = useState('WEB2');
    const handleToggleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment !== null) {
            setSelectedToggle(newAlignment);
        }
    };
    const [receipts, setReceipts] = useState<Array<ReceiptData>>([]);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const receiptsData = await listDocs({
                    collection: "Receipts"
                });

                if (receiptsData && receiptsData.items) {
                    const transformedReceipts = receiptsData.items.map(doc => {
                        const data = doc.data as any; // Assuming data structure is unknown

                        return {
                            supplier: data.supplierName?.value || 'Unknown Supplier',
                            address: data.supplierAddress?.value || 'Address Unknown',
                            amount: data.totalAmount?.value || 0,
                            date: data.date?.value || 'Unknown Date',
                            time: data.time?.value || 'Unknown Time',
                            items: data.lineItems?.map((item: any) => ({
                                description: item.description || 'Unknown Description',
                                amount: item.totalAmount || 0
                            })) || []
                        };
                    });

                    setReceipts(transformedReceipts);
                }
            } catch (error) {
                console.error("Error fetching receipts:", error);
            }
        };

        fetchReceipts();
    }, []);


    return (
        <Container sx={{ marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px',}}>
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
                    Transactions
                </Typography>

            </Box>
            <Divider/>
            <br/>
            <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={selectedToggle}
                    onChange={handleToggleChange}
                    sx={{
                        '& .MuiToggleButtonGroup-grouped': {
                            border: 0, // Removes border from ToggleButtons
                            fontWeight: 'bold', // Makes font bold
                            fontSize: '1rem', // Increase font size (you can adjust this value)
                            '&.Mui-selected, &.Mui-selected:hover': {
                                backgroundColor: 'primary.main', // Change as needed for selected button
                                color: 'white', // Change text color for selected button
                            },
                            '&:not(:first-of-type)': {
                                borderRadius: '24px', // Applies border radius to right side buttons
                            },
                            '&:first-of-type': {
                                borderRadius: '24px', // Applies border radius to left side buttons
                            },
                        },
                        marginBottom: '1px',
                    }}
                >
                    <ToggleButton value="WEB2">WEB2</ToggleButton>
                    <ToggleButton value="WEB3">WEB3</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Divider/>
            <br/>
            {selectedToggle === 'WEB2' && (
            <Box sx={{boxShadow: 3, borderRadius: '24px',width: '100%'}}>
                {/* Transaction 1 */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        <CoffeeIcon style={{ marginRight: '8px' }}/> {/* Icon for a store */}
                        <Typography>Starbucks - $20.00 - 11.01.23 - 10:30 AM</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Address: 123 Coffee Rd, Seattle, WA 98101, United States<br />
                        Americano (100ml) - $5.00<br />
                        Cappuccino (150ml) - $6.00<br />
                        Croissant - $4.00<br />
                        Chocolate Muffin - $5.00<br />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* Transaction 2 */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                    <AutoStoriesIcon style={{ marginRight: '8px' }} />
                    <Typography>Bookstore - $45.00 - 11.01.23 - 1:45 PM</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Address: 456 Fashion Ave, New York, NY 10018, United States<br />
                        Novel - The Great Gatsby - $15.00<br />
                        Science Magazine - $5.00<br />
                        Art Supplies - $25.00<br />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* Transaction 3 */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
                    <StoreIcon style={{ marginRight: '8px' }}/>
                    <Typography>Walmart - $30.00 - 11.01.23 - 4:20 PM</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Address: 100 Stumer Rd, Rapid City, SD 57701, United States<br />
                        Apples (1 kg) - $3.00<br />
                        Bread - $2.50<br />
                        Milk (1 liter) - $1.50<br />
                        Chicken Breasts (500g) - $7.00<br />
                        Cereal - $4.00<br />
                        Orange Juice (1 liter) - $3.00<br />
                        Eggs (12 pcs) - $5.00<br />
                        Tomatoes (500g) - $4.00<br />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* Transaction 4 */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4-content" id="panel4-header">
                    <AppleIcon style={{ marginRight: '8px' }}/>
                    <Typography>Apple - $120.00 - 11.01.23 - 6:00 PM</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        To access more details, please consider subscribing. Our subscription plans offer comprehensive insights and additional features.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* Transaction 5 */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5-content" id="panel5-header">
                        <CheckroomIcon style={{ marginRight: '8px' }}/> {/* Icon for a clothing store */}
                        <Typography>Uniqlo - $75.00 - 11.01.23 - 2:30 PM</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To access more details, please consider subscribing. Our subscription plans offer comprehensive insights and additional features.
                        </Typography>
                    </AccordionDetails>
            </Accordion>
            {/* Transaction 6 */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6-content" id="panel6-header">
                        <HomeIcon style={{ marginRight: '8px' }}/> {/* Icon for a home store */}
                        <Typography>Zara Home - $85.00 - 09.01.23 - 11:10 AM</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To access more details, please consider subscribing. Our subscription plans offer comprehensive insights and additional features.
                        </Typography>
                    </AccordionDetails>
            </Accordion>
            {/* Transaction 7 */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7-content" id="panel7-header">
                    <LocalPharmacyIcon style={{ marginRight: '8px' }}/>
                    <Typography>Pharmacy - $55.00 - 11.11.23 - 5:50 PM</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        To access more details, please consider subscribing. Our subscription plans offer comprehensive insights and additional features.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            </Box>
            )}
            {selectedToggle === 'WEB3' && (
                <Box sx={{boxShadow: 3, borderRadius: '24px', width: '100%'}}>
                    {receipts.map((receipt, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ flex: 1, textAlign: 'left' }}>
                                    {receipt.supplier}
                                </Typography>
                                <Typography sx={{ flex: 1, textAlign: 'right' }}>
                                    ${receipt.amount.toFixed(2)} - {receipt.date} - {receipt.time}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', textAlign: 'center', marginBottom: 1 }}>
                                    <Typography>Address: {receipt.address}</Typography>
                                </Box>
                                <Divider sx={{ width: '100%', marginY: 1 }} />
                                {receipt.items.map((item, itemIndex) => (
                                    <Box key={itemIndex} sx={{ width: '100%', textAlign: 'center', marginBottom: itemIndex !== receipt.items.length - 1 ? 1 : 0 }}>
                                        <Typography>{item.description} - ${item.amount.toFixed(2)}</Typography>
                                        {itemIndex !== receipt.items.length - 1 && <Divider sx={{ width: '100%', marginY: 1 }} />}
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

            )}

        </Container>
    );
}