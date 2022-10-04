
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAOfuWDxPwRdsRYcyoeweDww0CBBU4CI_Q",
  authDomain: "video-57ccb.firebaseapp.com",
  projectId: "video-57ccb",
  storageBucket: "video-57ccb.appspot.com",
  messagingSenderId: "917342688811",
  appId: "1:917342688811:web:102c25f71706d6a7733c6e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app