

import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env'

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

//initializeapp is a function that takes the firebase config object and initializes the firebase app

firebase.initializeApp(firebaseConfig)

//Firebase Authentication (auth):handle user sign-up, sign-in, password resets, and other authentication-related tasks.
const auth = firebase.auth();
//Firebase Firestore (firestore):store and sync data with our NoSQL cloud database.
const firestore = firebase.firestore();
//Firebase Storage (storage):store files and data in the cloud.
const storage = firebase.storage();
//Firebase collection (notesRef2):store files and data in the cloud.

const notesRef2 = firestore.collection('sellitems')

export { auth, firestore, firebase, storage, notesRef2 }
