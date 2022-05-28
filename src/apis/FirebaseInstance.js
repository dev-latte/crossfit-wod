import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { getAuth } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = firebase.firestore(app);


// start database function

export const insertData = async (document, uid, data) => {
    await setDoc(doc((database, document, uid)), data)
            .then(response => console.log(`${document}, insert success!`))
            .catch(err => alert(err) );
}

export const selectData = () => {

}