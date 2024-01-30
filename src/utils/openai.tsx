import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai-api";

const openai = new OpenAI('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');

const openaiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!openai) {
        return res.status(500).json({ message: "OpenAI client not initialized" });
    }
    
    if (req.method === "POST") {
        const { message } = req.body;
        const gptResponse = await openai.complete({
            engine: "davinci",
            prompt: message,
            maxTokens: 150,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ["\n"]
        });
        res.status(200).json({ data: gptResponse.data });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};

export default openaiHandler;