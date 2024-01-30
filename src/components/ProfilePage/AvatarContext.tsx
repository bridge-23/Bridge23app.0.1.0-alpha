import React from "react";

export const AvatarContext = React.createContext({
    avatarUrl: '',
    setAvatarUrl: (avatarUrl: string) => {},
});