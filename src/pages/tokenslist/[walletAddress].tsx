//..src/pages/tokenslist/[userKey].tsx
import React, { useState, useRef } from 'react';
import { NextPage } from "next";
import { useAddress, useContract, useOwnedNFTs, useNFTs } from '@thirdweb-dev/react';
import { REWARD_CONTRACT } from '../../consts/parameters';
import { Container, Grid, Typography, Skeleton, Box, Table, TableBody, TableCell, TableHead, TableRow, Avatar,Collapse, IconButton, Button,
    MenuItem, ButtonGroup, Popper, Grow, Paper, ClickAwayListener, MenuList  } from '@mui/material';
import LoadingComponent from '../../components/shared/LoadingComponent';
import ErrorComponent from '../../components/shared/ErrorComponent';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


//TODO: On change text in table is not visible

const NFTDetailsRow: React.FC<{ nft: any }> = ({ nft }) => {
    const [open, setOpen] = useState(false);
    function formatName(name: string): string {
        if (name.length <= 10) return name;
        return `${name.substring(0, 5)}...${name.slice(-5)}`;
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Avatar
                        src={nft.metadata.image || ''}
                        variant="square"
                        sx={{ width: 50, height: 50 }}
                    />
                </TableCell>
                <TableCell>{formatName(nft.metadata.name)}</TableCell>
                <TableCell>{nft.quantityOwned}</TableCell>
                {/* ... Add more cells for other metadata ... */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Attributes
                            </Typography>
                            <Table size="small" aria-label="attributes">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Parameter</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {nft.metadata.attributes.map((attribute: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{attribute.trait_type}</TableCell>
                                            <TableCell>{attribute.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const TokensList: NextPage = () => {
    const address = useAddress();
    const { contract } = useContract(REWARD_CONTRACT);
    const { data, isLoading, error } = useNFTs(contract);

    const anchorRef = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0); // Default to first option
    const options = ['Transactions', 'Rewards', 'Incomes'];

    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node;
        if (anchorRef.current && target && !anchorRef.current.contains(target)) {
            setOpen(false);
            setAnchorEl(null);
        }
    };

    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading,error: nftError } = useOwnedNFTs(contract, address);
    if (isOwnedNFTsLoading) {
        return <LoadingComponent />;
    }
    if (nftError) {
        return <ErrorComponent message="Failed to fetch your NFTs!" />;
    }

    const totalNFTs = ownedNFTs?.reduce((accumulator, nft) => {
        if (nft.type === "ERC721") {
            return accumulator + 1;
        } else if (nft.type === "ERC1155" && nft.quantityOwned) {
            return accumulator + (nft.quantityOwned ? Number(nft.quantityOwned) : 0);
        }
        return accumulator;
    }, 0) || 0;

    return (
        <Container style={{ padding: '24px', marginBottom: '118px'}}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginBottom={4}  borderBottom="1px solid #000">
                <Avatar aria-label="profile" style={{ backgroundColor: '#1976d2' }}>
                    P
                </Avatar>

                <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">

                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>

                        <Button
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                </Box>

                <Popper
                    sx={{ zIndex: 1 }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu">
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>

                <IconButton style={{ marginLeft: 'auto' }}>
                    <MoreIcon />
                </IconButton>
            </Box>

                <div>
                    <Grid container spacing={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Item</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Value</TableCell>
                                    {/* ... Add more headers as needed ... */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isOwnedNFTsLoading ? (
                                    ownedNFTs?.length! > 0 ? (
                                        ownedNFTs?.map((nft) => (
                                            <NFTDetailsRow key={nft.metadata.id} nft={nft} />
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No NFTs owned.
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <Skeleton variant="rectangular" width="100%" height={50} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Grid>
                </div>

        </Container>
    );
};

export default TokensList;
//delete {address ? ( from the line 187 to 228)

