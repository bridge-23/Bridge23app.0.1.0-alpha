//../src/pages/api/openai-test.js
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful assistant." }],
                model: "gpt-3.5-turbo",
            });

            res.status(200).json(completion.choices[0]);
        } catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: 'Error creating completion', details: error.message });
        }
    } else {
        // Handle any other HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}