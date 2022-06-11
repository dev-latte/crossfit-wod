import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);


// start database function
export const insertData = async (table, document, data) => {
    await setDoc(doc(database, table, document), data)
            .then(response => console.log(`${document}, insert success!`))
            .catch(err => alert(err));
}

export const selectWodDataFromDate = async (table, document, setWodCard) => {
  console.log('select');
  const docRef = doc(database, table, document);
  await getDoc(docRef)
          .then(response => {
            if(response.exists) { 
              setWodCard(response.data()); 
            }
          })
          .catch(err => {
            console.log(err);
          });

  // const result = [];

  // const q = query(collection(database, table), where("date", "==", date));
  // const querySnapShot = await getDocs(q);
  // querySnapShot.forEach(doc => result.push(doc.data()));

  // return result[0];
}

export const selectMovementData = async (table) => {
  const result = [];

  const querySnapShot = await getDocs(collection(database, table));
  querySnapShot.forEach(doc => result.push(doc.data()));

  return result;
}