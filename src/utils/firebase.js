import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore"

export const config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

const firebaseApp = firebase.initializeApp(config);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

const usersCollection = db.collection('users');
const eventsCollection = db.collection('events');

export default {
    auth,
    usersCollection,
    eventsCollection
}