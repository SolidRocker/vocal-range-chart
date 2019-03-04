import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBBbQ05OZ-YhGhc_rwrb5uhkSW3uDCy5Bc",
  authDomain: "vocal-range-chart-ce9d8.firebaseapp.com",
  databaseURL: "https://vocal-range-chart-ce9d8.firebaseio.com",
  projectId: "vocal-range-chart-ce9d8",
  storageBucket: "vocal-range-chart-ce9d8.appspot.com",
  messagingSenderId: "1093254668749"
};

firebase.initializeApp(config);
var db = firebase.firestore();

export default db;