//src/components/Accounts/NewAccountComponent.tsx
import React, { useContext, useState } from "react";
import { Card,IconButton, Typography, Dialog, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Backdrop, CircularProgress, Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { setDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import { AuthContext } from "../../contexts/AuthContext";

const NewAccountComponent: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [initialBalance, setInitialBalance] = useState<string | number>("");
  const [currency, setCurrency] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [financialInstitution, setFinancialInstitution] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [backdropOpen, setBackdropOpen] = useState(false);
  const handleCreateAccount = async () => {
    const parsedInitialBalance = parseFloat(initialBalance.toString());
    setErrorMessage("");

    if (
      !accountName ||
      isNaN(parsedInitialBalance) ||
      parsedInitialBalance < 0
    ) {
      console.error("Please provide a valid account name and initial balance.");
      setErrorMessage(
        "Please provide a valid account name and initial balance."
      );
      return;
    }
    setBackdropOpen(true);
    try {
      if (!user) {
        console.error("Please sign in to create an account.");

        return;
      }
      const accountRef = `${user.key}_${nanoid()}`; // This creates a unique reference for the account using the user ID and nanoid
      await setDoc({
        collection: "Accounts",
        doc: {
          key: accountRef,
          data: {
            userId: user.key, // Replace with actual user ID variable
            accountName,
            financialInstitution,
            initialBalance: parsedInitialBalance,
            currentBalance: parsedInitialBalance,
            currency,
            accountType,
            created: new Date().toISOString(), // Assuming you want to use ISO string for the timestamp
            // Add other necessary fields
          },
        },
      });
      console.log("Account created successfully!");
      setSuccessMessage("Account created successfully!");
      setTimeout(() => {
        setOpen(false);
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error creating account:", error);
      setErrorMessage("Error creating account. Please try again.");
    } finally {
      setBackdropOpen(false); // Ensure the backdrop is closed whether the operation is successful or not
    }
  };

  return (
    <>
      <Card
        sx={{
          perspective: "1000px",
          width: { xs: '100%', sm: '150px' },
          height: '110px',
          cursor: "pointer",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6">New Account</Typography>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            label="Account Name"
            variant="outlined"
            margin="normal"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Account Type</InputLabel>
            <Select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as string)}
              label="Account Type"
            >
              <MenuItem value="money">Money</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="cards">Cards</MenuItem>
              {/* Add more types if necessary */}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Financial Institution"
            variant="outlined"
            margin="normal"
            value={financialInstitution}
            onChange={(e) => setFinancialInstitution(e.target.value)}
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as string)}
              label="Currency"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="IDR">IDR</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
              {/* Add more currencies if necessary */}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Initial Balance"
            variant="outlined"
            margin="normal"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={handleCreateAccount}
          >
            Create
          </Button>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={backdropOpen}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default NewAccountComponent;
