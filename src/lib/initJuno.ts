// ..src/lib/initJuno.ts
import { initJuno } from "@junobuild/core";

let initialized = false;

export async function initializeJuno() {
    if (!initialized) {
        await initJuno({
            satelliteId: "kuyff-qaaaa-aaaal-ac5uq-cai",
        });
        initialized = true;
    }
}

export function isJunoInitialized() {
    return initialized;
}


