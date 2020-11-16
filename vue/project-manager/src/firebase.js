import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDJeQVO9BvXzhwlyWPoAbPxMo3cCR01rek",
    authDomain: "netninja-proj-manager.firebaseapp.com",
    databaseURL: "https://netninja-proj-manager.firebaseio.com",
    projectId: "netninja-proj-manager",
    storageBucket: "netninja-proj-manager.appspot.com",
    messagingSenderId: "1089579360998",
    appId: "1:1089579360998:web:7dd13d59bdb8b652cf9127"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

export default db;
