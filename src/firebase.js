import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQjN2iIH7uEXrwBDOU0qkS3Fdp3Nh0U2I',
  authDomain: 'whatsapp-web-a8fab.firebaseapp.com',
  projectId: 'whatsapp-web-a8fab',
  storageBucket: 'whatsapp-web-a8fab.appspot.com',
  messagingSenderId: '19927574375',
  appId: '1:19927574375:web:1dbf9718b1679c144f31c2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const vRegister = (email, username, password, URLphoto) => {
  addDoc(collection(db, 'users'), {
    email: email,
    username: username,
    password: password,
    URLphoto: URLphoto,
  });
  console.log({ email: email, username: username, password: password });
};

export const sMessage = (text, timestamp, emailS, emailR) => {
  addDoc(collection(db, 'messages'), {
    text: text,
    date: timestamp,
    emailSend: emailS,
    emailReceive: emailR,
  });
};
