// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBniR40x8R8wWL_wj16pydR6x6DxYy2cRg",
  authDomain: "vue-3-2023-3beb5.firebaseapp.com",
  projectId: "vue-3-2023-3beb5",
  storageBucket: "vue-3-2023-3beb5.appspot.com",
  messagingSenderId: "989542206586",
  appId: "1:989542206586:web:f857af4b80c4153e497fc3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth=getAuth();

export { auth };