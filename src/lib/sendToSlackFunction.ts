//..src/lib/sendToSlackFunction.ts
import { httpsCallable } from 'firebase/functions';
import { functions } from "./initFirebase";

const sendToSlackFunction = httpsCallable(functions, 'sendToSlack'); // Notice the change here

interface SlackPayload {
    userUID: string;
    fileName: string;
}

export const sendNotificationToSlack = async (payload: SlackPayload): Promise<void> => {
    try {
        await sendToSlackFunction(payload);
    } catch (error) {
        console.error('Failed to send Slack notification:', error);
        throw error;
    }
};
