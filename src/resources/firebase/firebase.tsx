// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // no compat for new SDK
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBaUMGf_i1ODBGxijrXl4cO3LSQI0ztyo8',
  authDomain: 'mstudio-cargoapp.firebaseapp.com',
  projectId: 'mstudio-cargoapp',
  storageBucket: 'mstudio-cargoapp.appspot.com',
  messagingSenderId: '251258123118',
  appId: '1:251258123118:web:7d8fc7a88760df0f4d077f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);
