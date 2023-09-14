//..src/pages/api/auth/logout.ts
import { NextApiRequest, NextApiResponse } from "next";
import initializeFirebaseServer from "../../../lib/initFirebaseAdmin";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    // Initialize the Firebase Admin SDK if needed.
    const { auth, db } = initializeFirebaseServer();

    // Assuming you pass the user's UID in the request when logging out.
    const { uid } = req.body;

    // Optional: Handle any server-side logging or cleanup.
    if (uid) {
        // Example: Log the logout action in your Firebase Firestore (or any other tasks).
        const logRef = db.collection('logouts').doc(uid);
        await logRef.set({
            action: 'logout',
            timestamp: new Date().toISOString()
        });
    }

    // Return a success response.
    return res.status(200).json({ message: 'Logged out successfully' });
};

export default logout;
