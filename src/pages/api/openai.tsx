// pages/api/openai.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import openaiHandler from '../../utils/openai';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return openaiHandler(req, res);
}