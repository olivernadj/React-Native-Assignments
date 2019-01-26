import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "***",
  authDomain: "***.firebaseapp.com",
  databaseURL: "https://***.firebaseio.com",
  projectId: "***",
  storageBucket: "***.appspot.com",
  messagingSenderId: "***"
});

export default firebase;