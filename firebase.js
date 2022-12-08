import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtVk7sEjf-BUHRoqnrsgmkFJt9c9xxI90",
    authDomain: "amzn-demo-b28de.firebaseapp.com",
    projectId: "amzn-demo-b28de",
    storageBucket: "amzn-demo-b28de.appspot.com",
    messagingSenderId: "1076294912547",
    appId: "1:1076294912547:web:6e9c40c58d1de6d4943f96"
  };

  const app= !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();

  export default db;