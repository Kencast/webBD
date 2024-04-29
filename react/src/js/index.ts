// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPUiNPYlEzMzh_wmWMNKlFDhwoWvODGx8",
  authDomain: "nature-d45bb.firebaseapp.com",
  projectId: "nature-d45bb",
  storageBucket: "nature-d45bb.appspot.com",
  messagingSenderId: "156530255680",
  appId: "1:156530255680:web:39dc8e656e8fc3eddc3ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function subirArchivo(file: any, url:string) : Promise<string>{
  const imageRef = ref(storage, url);
  try{
    const subir= await uploadBytes(imageRef, file);
    const ruta= await getDownloadURL(imageRef);
    return ruta;
  }
  catch (error){
    console.log('Error al subir imagen', error);
    return 'null';
  }
}