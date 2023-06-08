// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC-XNMFyNzq8XlMcSNjeJquOpoS9_I9tNQ',
  authDomain: 'dotshare-0.firebaseapp.com',
  projectId: 'dotshare-0',
  storageBucket: 'dotshare-0.appspot.com',
  messagingSenderId: '240135692735',
  appId: '1:240135692735:web:53b2d06c51f2cb8803c10a'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const storageRef = ref(storage)

const imagesRef = ref(storage, 'images/')

export {
  storage,
  storageRef,
  imagesRef
}
