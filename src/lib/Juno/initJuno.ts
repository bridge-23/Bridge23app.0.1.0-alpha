// ..src/lib/initJuno.ts
import { initJuno } from "@junobuild/core";

let initialized = false;
export async function initializeJuno() {
    if (!initialized) {
        try {
            await initJuno({
                satelliteId: "kuyff-qaaaa-aaaal-ac5uq-cai",
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


