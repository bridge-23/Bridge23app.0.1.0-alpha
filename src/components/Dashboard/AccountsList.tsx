//..src/components/Accounts/AccountList.tsx
import React from "react";
import {Grid, Card, CardContent, Typography, useMediaQuery, MobileStepper, Button} from "@mui/material";
import AccountCard from "../Accounts/AccountCardComponent";
import {useTheme} from "@mui/material/styles";
import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {accountDataState} from '../../state/atoms';
import {useRecoilState} from "recoil";
interface AccountData {
  accountName: string;
  financialInstitution: string;
  currentBalance: number;
  currency: string;
  id: string;
}
interface AccountsListProps { accounts: AccountData[];}
const AccountList: React.FC<AccountsListProps> = ({ accounts }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = accounts ? accounts.length : 0;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Card
            sx={{
                mx: "auto",
                my: 2,
                p: 0,
                borderRadius: 0,
                boxShadow: 'none',
                maxWidth: {
                    xs: '400px', // Maximum width on extra-small screens (mobile)
                    md: '700px'  // Maximum width on medium screens (desktop) and above
                }
            }}
        >
            <CardContent>
             {/*  <Typography variant="h5" gutterBottom>Accounts</Typography>*/}
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {accounts.map((account, index) => (
                        <div key={account.id} style={{ padding: 22, width: '100%'}}>
                            <AccountCard
                                accountName={account.accountName}
                                financialInstitution={account.financialInstitution}
                                currentBalance={account.currentBalance}
                                accountCurrency={account.currency}
                                onEdit={() => console.log(`Edit account with ID: ${account.id}`)}
                            />
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </CardContent>
        </Card>
    );
};

export default AccountList;
