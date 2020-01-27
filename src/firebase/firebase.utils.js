import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAQZvAKUXnLA7pPS6CVc9ViS7a6EDuVRn0",
    authDomain: "crwn-db-e6979.firebaseapp.com",
    databaseURL: "https://crwn-db-e6979.firebaseio.com",
    projectId: "crwn-db-e6979",
    storageBucket: "crwn-db-e6979.appspot.com",
    messagingSenderId: "685701009386",
    appId: "1:685701009386:web:11b30d6c653f44bfabac93",
    measurementId: "G-QREKNKBZFZ"
};

  firebase.initializeApp(config);

    export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        });
        } catch (error) {
        console.log('error creating user', error.message);
        }
    }

    return userRef;
    };

    export const auth = firebase.auth();
    export const firestore = firebase.firestore();

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    export const signInWithGoogle = () => auth.signInWithPopup(provider);

    export default firebase;