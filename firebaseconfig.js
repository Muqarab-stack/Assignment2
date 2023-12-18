import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAaQM4JOGwo65FyyAIT3eqtblD6SGHGjm0",
  authDomain: "food-restaurants-1883d.firebaseapp.com",
  projectId: "food-restaurants-1883d",
  storageBucket: "food-restaurants-1883d.appspot.com",
  messagingSenderId: "786877568168",
  appId: "1:786877568168:web:ac73f815ea0f875e4d5e9d",
  measurementId: "G-QNMDJ5SK44"
  };
 


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);