// src/lib/Juno/signInJuno.ts
import { signIn, InternetIdentityProvider, NFIDProvider } from "@junobuild/core";

export const handleSignIn = async (providerType: 'internetIdentity' | 'nftId') => {
    try {
        let provider;
        if (providerType === 'internetIdentity') {
            provider = new InternetIdentityProvider({});
        } else if (providerType === 'nftId') {
            provider = new NFIDProvider({
                appName: "Billfinityapp",
                logoUrl: "https://somewhere.com/your_logo.png",
            });
        } else {
            throw new Error('Invalid provider type');
        }

        await signIn({
            provider,
            maxTimeToLive: BigInt(4 * 60 * 60 * 1000 * 1000 * 1000),
            // Add other options as needed
        });
        console.log("Sign-in successful!");
        return true;
    } catch (error) {
        console.error("Sign-in failed:", error);
        return false;
    }
};




