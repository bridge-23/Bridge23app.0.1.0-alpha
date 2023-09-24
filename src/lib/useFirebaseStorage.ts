import { useState, useEffect } from "react";
import { storage } from "./initFirebase";
import { getDownloadURL, ref as storageRef } from "firebase/storage";

export default function useFirebaseStorage(filePath: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);

    useEffect(() => {
        if (storage) {
            (async () => {
                try {
                    const fileRef = storageRef(storage, filePath);
                    const url = await getDownloadURL(fileRef);
                    setDownloadURL(url);
                } catch (error) {
                    console.error("Error fetching download URL:", error);
                    setDownloadURL(null);
                }
                setIsLoading(false);
            })();
        } else {
            setIsLoading(false);
        }
    }, [filePath]);

    return { isLoading, downloadURL };
}
