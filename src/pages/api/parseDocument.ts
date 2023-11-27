// pages/api/parseDocument.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { parseDocument as parseOCRDocument } from '../../services/ocr';

export default async function parseDocumentRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { filePath } = req.body;
        const baseUrl = 'https://kuyff-qaaaa-aaaal-ac5uq-cai.icp0.io';
        const fileUrl = baseUrl + filePath;

        try {
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error('Failed to download file');
            const fileBuffer = await response.buffer();

            // Save buffer to a temporary file
            const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
            fs.writeFileSync(tempFilePath, fileBuffer);

            // Call parseOCRDocument with the file path
            const result = await parseOCRDocument(tempFilePath);
            res.status(200).json(result);

            // Optionally, delete the temporary file after processing
            fs.unlinkSync(tempFilePath);
        } catch (error: any) {
            console.error('Error processing the document:', error);
            res.status(500).json({
                message: "Error processing the document",
                error: error.message,
                stack: error.stack,
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

