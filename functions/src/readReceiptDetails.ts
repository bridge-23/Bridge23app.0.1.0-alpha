//..functions/readReceiptDetails.ts
import * as functions from 'firebase-functions';
import * as vision from '@google-cloud/vision';
import * as admin from 'firebase-admin';

// Ensure these are the same as the one in ../firebase/messaging
export const FCM_TOKEN_COLLECTION = 'fcmTokens';
export const FCM_TOKEN_KEY = 'fcmToken';

// Ensure this is the same as the one in ../firebase/firestore
export const RECEIPT_COLLECTION = 'receipts';

admin.initializeApp();

interface VisionApiResponse {
    responses?: {
        textAnnotations?: Array<{
            description?: string;
            // Add other properties as needed
        }>;
        // Add other properties as needed
    }[];
    // Add other properties as needed
}

export const readReceiptDetails: functions.CloudFunction<any> = functions.storage
    .object()
    .onFinalize(async (object) => {
        const imageBucket = object ? `gs://${object.bucket}/${object.name}` : '';
        const client = new vision.ImageAnnotatorClient();

        try {
            const textDetections: VisionApiResponse = (await client.textDetection(
                imageBucket
            )) as VisionApiResponse;
            const annotations =
                textDetections?.responses?.[0]?.textAnnotations || [];
            const annotation = annotations[0];

// ... (other code)

            if (annotation) {
                // Use 'annotation' here
            }

            // Parse text

            // Get user ID
            const re = /(.*)\//;
            const match = re.exec(object.name || ''); // Use an empty string as a default if object.name is undefined
            const uid = match ? match[1] : null;

            if (uid !== null) {
                // Now you can use uid safely here
            } else {
                // Handle the case where uid is null
            }
            // Check whether receipt already exists by checking for existing imageBucket so a document isn't
            // created for the same receipt
            let doc = await admin
                .firestore()
                .collection(RECEIPT_COLLECTION)
                .where('imageBucket', '==', imageBucket)
                .get();
            if (doc.empty) {
                const receipt = {
                    address: '123 Happy St, Bestcity, World 67890',
                    amount: '23.45',
                    date: new Date(),
                    imageBucket,
                    items: 'best appetizer, best main dish, best dessert',
                    isConfirmed: false,
                    locationName: 'Best Restaurant',
                    uid,
                };
                await admin.firestore().collection(RECEIPT_COLLECTION).add(receipt);
            }
            // Log success information
            console.log('Function executed successfully');
        } catch (error) {
            // Log any errors that occur
            console.error('Error:', error);
        }
    });
