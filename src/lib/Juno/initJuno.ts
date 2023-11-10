// ..src/lib/initJuno.ts
import { initJuno } from "@junobuild/core-peer";

let initialized = false;
export async function initializeJuno() {
    if (!initialized) {
        try {
            await initJuno({
                satelliteId: process.env.NEXT_PUBLIC_JUNO_ID as string,
            });
            initialized = true;
        } catch (error) {
            console.error("Failed to initialize Juno:", error);
        }
    }
}
export function isJunoInitialized() {
    return initialized;
}


