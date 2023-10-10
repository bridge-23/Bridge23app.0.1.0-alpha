//..functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { readReceiptDetails } from './readReceiptDetails'; // Import your functions
import { slackNotification } from './slackNotification'; // Import your functions

admin.initializeApp();

// Export the readReceiptDetails function
export const readReceiptDetailsFunction = functions
    .storage.object()
    .onFinalize(readReceiptDetails);

// Export the sendToSlack function
export const slackNotificationFunction = functions.https.onRequest(slackNotification);





