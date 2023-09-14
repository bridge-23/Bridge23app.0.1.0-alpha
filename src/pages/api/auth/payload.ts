import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle your logic here
        res.status(200).json({ message: "Payload received" });
    } else {
        res.status(405).end(); // Method not allowed
    }
}

