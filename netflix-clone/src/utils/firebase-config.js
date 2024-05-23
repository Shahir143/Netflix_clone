// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCd3OX_vnYDudV_uW0jj2yzeUdZoxkmnQA",
  authDomain: "netflix-react-5c033.firebaseapp.com",
  projectId: "netflix-react-5c033",
  storageBucket: "netflix-react-5c033.appspot.com",
  messagingSenderId: "475566730436",
  appId: "1:475566730436:web:c7d083e26c239fea26ad91",
  measurementId: "G-Z5XHPZ0Q4R"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth =getAuth(app);