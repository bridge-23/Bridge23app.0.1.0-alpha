//..src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { authSubscribe, User } from "@junobuild/core";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: Error | null;
}
export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null
});

interface AuthProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<Error | null>(null); // Error state

    useEffect(() => {
        // authSubscribe callback only provides the new user value, no error handling here
        const unsubscribe = authSubscribe((newUser: User | null) => {
            setUser(newUser);
            setLoading(false);
            if (!newUser) {
                console.log("User is signed out or session has expired");
                // Redirect logic or additional logic if user is not authenticated
            }
        });

        // The cleanup function
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error }}>
            {loading ? (
                <div>Loading...</div> // Your loading indicator
            ) : (
                children // Render the children, which could be HomePage or any other component based on routing or other logic
            )}
        </AuthContext.Provider>
    );
};
export default AuthProvider;


