//../functions/src/index.ts
import * as functions from 'firebase-functions';
import axios from 'axios';
import cors from 'cors';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const corsHandler = cors({ origin: true });

export const sendToSlack = functions.https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
        const data = request.body;

        if (!data || !data.userUID || !data.fileName) {
            console.error('Request body is missing data.');
            response.status(400).send('Request body is missing data.');
            return;
        }

        const payload = {
            text: `New file uploaded! \nUser UID: ${data.userUID} \nFile Name: ${data.fileName} \nDate: ${new Date().toUTCString()}`,
        };

        try {
            const slackResponse = await axios.post(SLACK_WEBHOOK_URL, payload);
            console.log("Slack Response:", slackResponse.data);
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





