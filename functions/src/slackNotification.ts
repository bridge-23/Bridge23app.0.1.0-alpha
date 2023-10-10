//../functions/slackNotification.ts
import * as functions from 'firebase-functions';
import cors from 'cors';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const corsHandler = cors({ origin: true });
const axios = require('axios');

interface SlackRequestBody {
    userUID?: string;
    fileName?: string;
    [key: string]: any;
}

export const slackNotification = functions.https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
        const data: SlackRequestBody = request.body;

        if (!data || !data.userUID || !data.fileName) {
            console.error('Request body is missing data.');
            response.status(400).send('Request body is missing data.');
            return;
        }

        const firebaseFileLink = `https://firebasestorage.googleapis.com/v0/b/bridge23-904ea.appspot.com/o/bills%2F${data.userUID}%2F${data.fileName}?alt=media`;
        const payload = {
            text: `New file uploaded!\nUser UID: ${data.userUID}\nFile Name: ${data.fileName}\nDate: ${new Date().toUTCString()}\nLink to file: ${firebaseFileLink}`,
        };

        try {
            const slackResponse = await axios.post(SLACK_WEBHOOK_URL, payload);
            console.log('Slack Response:', slackResponse.data);
            response.send({ success: true });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Caught an error:', error.message);
                response.status(500).send('Failed to send Slack notification.');
            } else {
                console.error('Caught something unexpected:', error);
                response.status(500).send('Internal Server Error.');
            }
        }
    });
});
export default slackNotification;