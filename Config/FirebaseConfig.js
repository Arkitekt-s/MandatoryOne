

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import{API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID} from '@env';
import firebase from "firebase";


//firebase config
const FirebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}
//initialize firebase
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();



export { auth, firestore, firebase,storage};