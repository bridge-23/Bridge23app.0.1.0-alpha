//src/lib/Dashboard/createWallet.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const createWallet = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to create a wallet.');
    }

    const userId = context.auth.uid;
    const { walletName, initialBalance } = data;

    if (!walletName) {
        throw new functions.https.HttpsError('invalid-argument', 'Please provide a wallet name.');
    }

    // Ensure the initial balance is a valid number and non-negative
    if (isNaN(initialBalance) || initialBalance < 0) {
        throw new functions.https.HttpsError('invalid-argument', 'Initial balance must be a non-negative number.');
    }

    const userDocRef = db.collection('users').doc(userId);
    const walletRef = userDocRef.collection('wallets').doc();

    await walletRef.set({
        walletName,
        balance: initialBalance
    });

    return { message: 'Wallet created successfully!' };
});

