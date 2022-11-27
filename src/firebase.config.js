import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlPjYxpI0bFLnBCJ-PNRAAhYuuoMZjoZ0",
  authDomain: "barbeninx.firebaseapp.com",
  databaseURL: "https://barbeninx-default-rtdb.firebaseio.com",
  projectId: "barbeninx",
  storageBucket: "barbeninx.appspot.com",
  messagingSenderId: "246330691000",
  appId: "1:246330691000:web:4504035d990d5bdef3d34d"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};