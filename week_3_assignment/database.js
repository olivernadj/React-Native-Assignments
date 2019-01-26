import firebase from 'firebase'; // 4.8.1

firebase.initializeApp({
  apiKey: 'AIzaSyB68nykLu7MVsqLxwppc0J1hyMBqqhhc1g',
  authDomain: 'coderschool-react-native.firebaseapp.com',
  databaseURL: 'https://coderschool-react-native.firebaseio.com/',
  projectId: 'coderschool-react-native',
});

const database = firebase.database();

export default database;

