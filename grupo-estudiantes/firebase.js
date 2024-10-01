// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_2zX9bjuuOCr1f3U_mAzEi3l6Gh66CH0",
  authDomain: "pagina-web-personal-trainer-24.firebaseapp.com",
  databaseURL: "https://pagina-web-personal-trainer-24-default-rtdb.firebaseio.com",
  projectId: "pagina-web-personal-trainer-24",
  storageBucket: "pagina-web-personal-trainer-24.appspot.com",
  messagingSenderId: "649898128624",
  appId: "1:649898128624:web:602919706f56d8093e3e35"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la base de datos
const db = getDatabase(app);

export { db };
