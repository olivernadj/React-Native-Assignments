import firebase from 'firebase'; // 4.8.1

firebase.initializeApp({
  apiKey: '***',
  authDomain: '***.firebaseapp.com',
  databaseURL: 'https://***.firebaseio.com/',
  projectId: '***',
});

const database = firebase.database();

export default database;