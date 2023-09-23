//src/lib/useFirebaseUser.ts
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./initFirebase"; // Import named export directly

// Helpful hook for you to get the currently authenticated user in Firebase.
export default function useFirebaseUser() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });
        return () => {
            listener();
        };
    }, []);

    return { isLoading, user };
}
