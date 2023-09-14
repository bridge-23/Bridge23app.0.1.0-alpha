// src/contexts/UserContext.tsx
import { createContext, useContext, ReactNode } from 'react';

type UserContextType = {
    userId: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

type Props = {
    children: ReactNode;
    userId: string | null;
}

export const UserProvider: React.FC<Props> = ({ children, userId }) => (
    <UserContext.Provider value={{ userId }}>
        {children}
    </UserContext.Provider>
);
