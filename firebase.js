
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUZjX6fPtVhXaBxp_ETYhePwN83fcOMno",
  authDomain: "laundry-app-f549d.firebaseapp.com",
  projectId: "laundry-app-f549d",
  storageBucket: "laundry-app-f549d.appspot.com",
  messagingSenderId: "834803396891",
  appId: "1:834803396891:web:f8d9e0e17922a30ef163be"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};