//src/lib/useSupabaseUser.ts

import { User, Session } from "@supabase/supabase-js";
import { useEffect, useState, useCallback } from "react";
import { createSupabaseClient } from "./createSupabase";

// Helpful hook for you to get the currently authenticated user
export default function useSupabaseUser() {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const { auth } = createSupabaseClient();

    // Make a function to fetch the user and session
    const refreshUser = useCallback(async () => {
        const {
            data: { user },
        } = await auth.getUser();
        setUser(user || null);

        const {
            data: { session },
        } = await auth.getSession();
        setSession(session ?? null);
    }, [auth]);

    // Add a listener to refetch the user when the session changes
    useEffect(() => {
        const {
            data: { subscription },
        } = auth.onAuthStateChange(async (event, session) => {
            refreshUser();
        });

        refreshUser();
    }, [auth]);

    return { user, session, refresh: refreshUser };
}