// components/ProfilePage/AvatarContext.tsx
import React from "react";

interface AvatarContextType {
    avatarUrl: string;
    nickname: string;
    dmail: string;
    currency: string;
    setAvatarUrl: (url: string) => void;
    setNickname: (nickname: string) => void;
    setDmail: (dmail: string) => void;
    setCurrency: (currency: string) => void;
}

export const AvatarContext = React.createContext<AvatarContextType>({
    avatarUrl: '',
    nickname: '',
    dmail: '',
    currency: '',
    setAvatarUrl: () => {},
    setNickname: () => {},
    setDmail: () => {},
    setCurrency: () => {},
});