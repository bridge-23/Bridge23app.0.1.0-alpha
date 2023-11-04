//..src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { authSubscribe, User } from "@junobuild/core";
import LoginComponentJuno from '../components/LoginComponentJuno';

interface AuthContextType {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

interface AuthProps {
    children: React.ReactNode;
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<Error | null>(null); // Error state

    useEffect(() => {
        const unsubscribe = authSubscribe((newUser: User | null, error?: Error) => {
            if (error) {
                console.error('Error subscribing to auth:', error);
                setError(error);
                setLoading(false);
            } else {
                setUser(newUser);
                setLoading(false); // Set loading to false after getting user status
                if (!newUser) {
                    console.log("User is signed out or session has expired");
                    // Perform any additional logic if user is not authenticated
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {user ? children : <LoginComponentJuno />}
        </AuthContext.Provider>
    );
};

