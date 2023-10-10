//src/lib/storage.js
import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './initFirebase';

// Bucket URL from Storage in Firebase Console
const BUCKET_URL = "gs://bridge23-904ea.appspot.com";

// Uploads image and returns the storage bucket
export async function uploadImage(image, uid) {
    const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
    await uploadBytes(ref(storage, bucket), image);
    return bucket;
}

// Replaces existing image in storage and returns the storage bucket
export async function replaceImage(image, bucket) {
    await uploadBytes(ref(storage, bucket), image);
}

// Deletes existing image in storage
export async function deleteImage(bucket) {
    await deleteObject(ref(storage, bucket));
}

// Gets the download URL from the reference URL
export async function getDownloadURL(bucket) {
    return await getStorageDownloadURL(ref(storage, bucket));
}