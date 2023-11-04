//..src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { authSubscribe, User } from "@junobuild/core";
import { useRouter } from 'next/router';
import LoginComponentJuno from '../components/LoginComponentJuno';
// Define the context shape and default values
interface AuthContextType {
    user: User | null | undefined;
}
//TODO: print to users collection user.key, time create
export const AuthContext = createContext<AuthContextType>({ user: undefined });

// Define prop types for the Auth component
interface AuthProps {
    children: ReactNode;
}
export const Auth: React.FC<AuthProps> = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const unsubscribe = authSubscribe((user: User | null) => {
            setUser(user);

            if (user) {
                console.log("User is signed in:", user);
            } else {
                console.log("User is signed out or session has expired3");
                if (!user && typeof window !== 'undefined' && !isRedirecting) {
                    setIsRedirecting(true);
                }
            }
        });

        return () => unsubscribe();
    }, [router, isRedirecting]); // Ensure to add the new dependency

    return (
        <AuthContext.Provider value={{ user }}>
            {user ? (
                <div>{children}</div>
            ) : (
                <LoginComponentJuno />
            )}
        </AuthContext.Provider>
    );
};

