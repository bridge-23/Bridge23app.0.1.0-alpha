// src/lib/Juno/signOutJuno.ts
import { signOut } from "@junobuild/core";

export const handleSignOut = async () => {
    try {
        await signOut();
        console.log("Sign-out successful!");
        return true;
    } catch (error) {
        console.error("Sign-out failed:", error);
        return false;
    }
};




