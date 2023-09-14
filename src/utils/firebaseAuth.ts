// utils/firebaseAuth.ts

import { getAuth, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
});

const auth = getAuth(firebaseApp);

export async function getFirebaseUser(): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe(); // To prevent memory leaks, unsubscribe after getting the user
            resolve(user);
        });
    });
}

