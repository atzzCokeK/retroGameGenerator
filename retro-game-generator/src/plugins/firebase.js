import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAllFPHADfJEfKFQ9Xxy_oZKWXd5pk-N7E",
    authDomain: "retro-games-generator.firebaseapp.com",
    projectId: "retro-games-generator",
    storageBucket: "retro-games-generator.appspot.com",
    messagingSenderId: "164723489244",
    appId: "1:164723489244:web:10b8379eae04ab00643719",
    measurementId: "G-VBWT8XEYB2"
};

const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.firestore();