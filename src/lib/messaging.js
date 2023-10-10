//..src/lib/messaging.js
import { db, messaging } from "./initFirebase";
import { doc, setDoc } from 'firebase/firestore';
import { getToken, onMessage } from 'firebase/messaging';