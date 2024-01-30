import { NextApiRequest } from "next";
import OpenAI from 'openai-api';

// @ts-ignore
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const openaiHandler = async (req: NextApiRequest) => {
    if (req.method !== "POST") {
        throw new Error(`Method ${req.method} not allowed`);
    }

    const { message } = req.body;

    if (!message) {
        throw new Error("Message is required");
    }

    const gptResponse = await openai.complete({
        engine: "davinci",
        prompt: message,
        // ... other parameters
    });
    return gptResponse.data;
};

export default openaiHandler;
