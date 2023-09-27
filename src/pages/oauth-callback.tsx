// pages/oauth-callback.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function OauthCallback() {
    const router = useRouter();

    useEffect(() => {
        // Here you'd handle the data sent by Magic in the query parameters
        // For the sake of this example, I'm simply redirecting the user.

        const walletAddress = "someLogicToGetWalletAddress"; // Replace this with actual logic to get the address
        router.push(`/dashboard/${walletAddress}`);
    }, [router]);

    return <div>Processing...</div>;
}
