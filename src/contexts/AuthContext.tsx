//..src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { User as JunoUser, authSubscribe } from "@junobuild/core";

export const AuthContext = createContext<{ user: JunoUser | null; setBusy: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<JunoUser | null>(null);
    const [busy, setBusy] = useState<boolean>(true);

    useEffect(() => {
        setBusy(true);

        const unsubscribe: () => void = authSubscribe((authUser: JunoUser | null) => {
            setUser(authUser); // authUser is now the correct type
            setBusy(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setBusy }}>
            {busy ? "Loading..." : children}
        </AuthContext.Provider>
    );
};




