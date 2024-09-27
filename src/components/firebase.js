import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyD_2zX9bjuuOCr1f3U_mAzEi3l6Gh66CH0",
    authDomain: "pagina-web-personal-trainer-24.firebaseapp.com",
    projectId: "pagina-web-personal-trainer-24",
    storageBucket: "pagina-web-personal-trainer-24.appspot.com",
    messagingSenderId: "649898128624",
    appId: "1:649898128624:web:602919706f56d8093e3e35"
  };



//iniciar firebase
const app =initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;