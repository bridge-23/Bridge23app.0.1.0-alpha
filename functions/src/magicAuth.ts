//..function/src/magicAuth.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Magic } from '@magic-sdk/admin';

admin.initializeApp();

const magic = new Magic('sk_live_C1147EC0E59D1EF8');

export const auth = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
    const didToken = data.didToken;
    const metadata = await magic.users.getMetadataByToken(didToken);
    const email = metadata.email;

    if (!email) {
        throw new functions.https.HttpsError('invalid-argument', 'Email is missing.');
    }

    try {
        const user = await admin.auth().getUserByEmail(email);
        const claim = magic.token.decode(didToken)[1];
        return await handleExistingUser(user, claim);
    } catch (err) {
        if ((err as { code?: string }).code === 'auth/user-not-found') {
            return await handleNewUser(email);
        } else {
            throw err;
        }
    }
});

const handleExistingUser = async (user: admin.auth.UserRecord, claim: any) => {
    /* Check for replay attack */
    const lastSignInTime = Date.parse(user.metadata.lastSignInTime!) / 1000;  // Use ! to assert it's not null
    const tokenIssuedTime = claim.iat;

    if (tokenIssuedTime <= lastSignInTime) {
        throw new functions.https.HttpsError('invalid-argument', 'This DID token is invalid.');
    }

    const firebaseToken = await admin.auth().createCustomToken(user.uid);
    return {
        uid: user.uid,
        token: firebaseToken,
    };
};

const handleNewUser = async (email: string) => {
    const newUser = await admin.auth().createUser({
        email,
        emailVerified: true,
    });
    const firebaseToken = await admin.auth().createCustomToken(newUser.uid);
    return {
        uid: newUser.uid,
        token: firebaseToken,
    };
};

