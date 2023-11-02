// src/lib/Juno/authSubscribeJuno.ts
import { authSubscribe, User } from "@junobuild/core";
export const handleAuthSubscription = () => {
    const unsubscribe = authSubscribe((user: User | null) => {
        if (user) {
            console.log("User is signed in:", user);
        } else {
            console.log("User is signed out or session has expired2");
        }
    });

    return unsubscribe;
};

export const handleSessionExpiration = () => {
    const onSessionExpire = () => {
        console.log("Session has expired");
    };

    document.addEventListener("junoSignOutAuthTimer", onSessionExpire, { passive: true });

    return () => document.removeEventListener("junoSignOutAuthTimer", onSessionExpire);
};

