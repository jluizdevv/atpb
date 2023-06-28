import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBknz3Im5be2COd12MlK516ttFCb6zSrk",
  authDomain: "atpb-fcc3b.firebaseapp.com",
  projectId: "atpb-fcc3b",
  storageBucket: "atpb-fcc3b.appspot.com",
  messagingSenderId: "774430263617",
  appId: "1:774430263617:web:54024f070e462e79d5b9c0"
};
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
