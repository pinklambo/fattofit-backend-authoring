// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC32Dast7et1O-BoueaRe0Yr98BQIxw1BA",
  authDomain: "fattofit-prod-68cba.firebaseapp.com",
  projectId: "fattofit-prod-68cba",
  storageBucket: "fattofit-prod-68cba.firebasestorage.app",
  messagingSenderId: "934844443780",
  appId: "1:934844443780:web:0162746e9a3d951e0826d1"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
