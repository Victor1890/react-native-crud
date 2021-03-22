import firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyDy5cYJVnZ04fehItXy48tiVAO-xzzhs2Q",
  authDomain: "react-native-crud-9d5ff.firebaseapp.com",
  projectId: "react-native-crud-9d5ff",
  storageBucket: "react-native-crud-9d5ff.appspot.com",
  messagingSenderId: "415546115715",
  appId: "1:415546115715:web:e755071d03c789d762fdb6",
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default {
  firebase,
  db,
};
