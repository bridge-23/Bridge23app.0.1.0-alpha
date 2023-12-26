//..src/page/magiclists/index.tsx
import React, {useContext, useState} from 'react';
import {useTheme, Paper, Typography, Box, Container, useMediaQuery, Divider} from '@mui/material';
import { AuthContext } from "../../contexts/AuthContext";
import { listDocs } from "@junobuild/core-peer";
import {Theme} from "@mui/material/styles";
import MagicListComponent from '../../components/Magiclist/MagicListComponent'
import CreateMagicList from "../../components/Magiclist/CreateMagicList";
import {Item} from "../../types";
import {MagicList} from "../../types";
import theme from "../../utils/theme";

//TODO: make shopping panel for create shopping list
//TODO: add edit button for shopping list
//TODO: add delete button for shopping list
const MagicLists: React.FC = () => {
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
        fetchMagicList();
    };

    return (
        <Container sx={{marginBottom: isMobile ? '118px' : '62px', padding: isMobile ? 'initial' : '24px'}}>

            <Box sx={{borderRadius: '24px', maxWidth: 'fit-content', margin: 'auto'}}>
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
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                style={{ margin: '20px 0' }}
            >
                <CreateMagicList onListCreated={onListCreated}/>
            </Box>
            <MagicListComponent/>
        </Container>
    );
};
export default MagicLists;

