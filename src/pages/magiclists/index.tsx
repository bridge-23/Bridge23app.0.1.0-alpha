//..src/page/magiclists/index.tsx
import React, {useContext, useState, useEffect} from 'react';
import { Typography, Box, Container, useMediaQuery, Divider} from '@mui/material';
import { AuthContext } from "../../contexts/AuthContext";
import { listDocs } from "@junobuild/core-peer";
import {Theme} from "@mui/material/styles";
import MagicListComponent from "../../components/Magiclist/MagicListComponent";
import CreateMagicList from "../../components/Magiclist/CreateMagicList";
import {MagicList} from "../../types";
import theme from "../../utils/theme";

//TODO: make shopping panel for create shopping list
//TODO: add edit button for shopping list
//TODO: add delete button for shopping list
const MagicLists: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.pageYOffset;
        setIsScrolled(offset > 50); // Change transparency after 50px of scrolling
    };
    const { user } = useContext(AuthContext);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [magicLists, setMagicLists] = useState<MagicList[]>([]);
    const fetchMagicList = async () => {
        let fetchedLists: MagicList[] = [];
        try {
            const magicListData = await listDocs({
                collection: "MagicLists"
            });
            if (magicListData && magicListData.items) {
                fetchedLists = magicListData.items.map(doc => {
                    const data = doc.data as MagicList;
                    return {
                        id: doc.key,
                        name: data.name,
                        owner: data.owner
                    };
                });
            } else {
                console.error("Magic list data is undefined or items are missing");
                alert('Failed to fetch magic lists. Please try again.');
            }
        } catch (error) {
            console.error("Error fetching magic lists:", error);
            alert('Failed to fetch magic lists. Please try again.');
        }

        setMagicLists(fetchedLists);
    };
    const onListCreated = () => {
        fetchMagicList().then(r => console.log("Magic lists fetched:", r));
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Container sx={{
            marginBottom: isMobile ? '118px' : '62px',
            padding: isMobile ? 'initial' : '24px',
            marginLeft: isMobile ? '0' : '50px'
        }}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%', // Ensure full width
                    maxWidth: 'auto',
                    margin: 'auto',
                    display: 'flex',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    zIndex: 1100,// Ensure it's above other elements
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                >
                    Magic Lists
                </Typography>
            </Box>
            <Divider />
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    paddingTop: '40px', // Adjust this based on the height of your fixed header
                    margin: '40px 0',
                    paddingX: '10px'
                }}
            >

                <CreateMagicList onListCreated={onListCreated}/>
            </Box>
            <Box sx={{ borderRadius: '24px', maxWidth: 'auto', margin: 'auto' }}>
                <MagicListComponent/>
            </Box>
        </Container>
    );
};
export default MagicLists;

