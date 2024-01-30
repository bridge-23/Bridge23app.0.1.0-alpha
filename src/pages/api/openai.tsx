import type { NextApiRequest, NextApiResponse } from 'next';
import openaiHandler from '../../utils/openai';
require('dotenv').config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Received request:', req.body);
    const openAIResponse = await openaiHandler(req);
    console.log('OpenAI API response:', openAIResponse);
    res.status(200).json({ data: openAIResponse });
  } catch (error) {
    console.error("Error in OpenAI API handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

