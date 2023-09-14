import { NextApiRequest, NextApiResponse } from "next";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import { createSupabaseServer } from "../../lib/Supabase/createSupabaseAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { payload, access_token } = req.body;

    // Use the Supabase service role to access the database with full permissions
    const supabase = createSupabaseServer();

    // Get the user from our database using the client side access token
    const {
        data: { user },
    } = await supabase.auth.getUser(access_token);

    if (!user) {
        // Handle the case where user is null, e.g., return an error response
        return res.status(404).json({ error: 'User not found' });
    }

    // Verify that the signed login payload is valid
    const { address, error: verifyErr } = await verifyLogin(
        process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
        payload,
    );
    if (!address) {
        return res.status(400).json({ error: verifyErr });
    }

    // Update the user's address in our database
    await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: { address: address.toLowerCase() },
    });
    return res.status(200).end();
};