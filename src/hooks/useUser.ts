import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import "firebase/auth";
import { useUser as useThirdwebUser } from "@thirdweb-dev/react";

function useUser() {
    const { user: thirdWebUser, isLoggedIn: isWalletLoggedIn, isLoading: isWalletLoading } = useThirdwebUser();
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set up Firebase auth listener
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
            setIsLoading(false);
        });


        return () => unsubscribe();
    }, []);

    return {
        user: {
            address: thirdWebUser?.address,
            session: thirdWebUser?.session,
            firebaseId: firebaseUser?.uid,
            email: firebaseUser?.email, // and any other firebase user attributes you need
        },
        isLoggedIn: isWalletLoggedIn && !!firebaseUser,
        isLoading: isWalletLoading || isLoading,
    };
}

export default useUser;
