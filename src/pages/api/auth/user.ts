//../src/pages/api/auth/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getFirebaseUser } from "../../../utils/firebaseAuth";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();  // Method not allowed
    }

    try {
        const firebaseUser = await getFirebaseUser();
        if (!firebaseUser) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        return res.status(200).json({ user: { uid: firebaseUser.uid } });
    } catch (error) {
        console.error("Error fetching Firebase user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
