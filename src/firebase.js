import {getApp,getApps,initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';
import {getStorage} from 'firebase/storage';

const firebaseConfig={
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY||'AIzaSyDD6VXZ0JYaoVBthLjfxWls60UNgcjxCH4',
  authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN||'huntersfc.firebaseapp.com',
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID||'huntersfc',
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET||'huntersfc.firebasestorage.app',
  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID||'907563808131',
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID||'1:907563808131:web:394e7f4cedb6be379ef2b6',
};

export const firebaseApp=getApps().length?getApp():initializeApp(firebaseConfig);
export const auth=getAuth(firebaseApp);
export const db=getFirestore(firebaseApp);
export const functions=getFunctions(firebaseApp,'asia-south1');
export const storage=getStorage(firebaseApp);
