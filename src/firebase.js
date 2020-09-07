// import firebase from "firebase";
// import "firebase/firebase-auth";
// import "firebase/storage";


import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'


// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyBin57Y_2P8geQXvhfiYj1JnfqvjEL0gLo",
  authDomain: "vue-shop-c3df1.firebaseapp.com",
  databaseURL: "https://vue-shop-c3df1.firebaseio.com",
  projectId: "vue-shop-c3df1",
  storageBucket: "vue-shop-c3df1.appspot.com",
  messagingSenderId: "168449862529",
  appId: "1:168449862529:web:1b4fc971a61b3068455680",
  measurementId: "G-5SZLEVM10S"
};
// Initialize Firebase
const fb = firebase.initializeApp(config);
const db = firebase.firestore();

export {fb, db}