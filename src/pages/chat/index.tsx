// src/pages/chat/index.tsx
import { useRouter } from 'next/router';
import '@sendbird/uikit-react/dist/index.css';
import useFirebaseUser from "../../lib/useFirebaseUser";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import {useMediaQuery} from "@mui/material";
import MobileLayout from "../../layouts/MobileLayout";
import DesktopLayout from "../../layouts/DesctopLayout"

export default function Chat() {
    const {user} = useFirebaseUser();
    const {isReady, query} = useRouter();
    // const uid = isReady ? query.uid : undefined;
    const APP_ID = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string;
    const matches = useMediaQuery('(max-width:600px)');  // Assuming you've implemented useMediaQuery as per the guide.

    if (!isReady || !user ) {
        return <p>Loading...</p>;
    }

    // The function to initiate a connection to Sendbird

    return (
        <SendbirdProvider appId={APP_ID} userId={user.uid} breakpoint={matches}>
            <div> {/* This wrapping div ensures there's only one child for SendbirdProvider */}
                <main style={{ paddingBottom: '50px' }}>
                {matches
                        ? <MobileLayout />
                        : <DesktopLayout />}
                </main>
            </div>
        </SendbirdProvider>
    );
}
