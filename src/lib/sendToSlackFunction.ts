//..src/lib/sendToSlackFunction.ts
import axios from 'axios';

interface SlackPayload {
    userUID: string;
    fileName: string;
}

const CLOUD_FUNCTION_URL = 'https://us-central1-bridge23-904ea.cloudfunctions.net/sendToSlack'; // Your Cloud Function URL

export const sendNotificationToSlack = async (payload: SlackPayload): Promise<void> => {
    try {
        await axios.post(CLOUD_FUNCTION_URL, payload);
    } catch (error) {
        console.error('Failed to send Slack notification:', error);
        throw error;
    }
};

