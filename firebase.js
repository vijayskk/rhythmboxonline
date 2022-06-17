import firebase from 'firebase/compat/app'
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDgcRjxbY-XgXzgTiber0iVkbtLQjou_wo",
    authDomain: "rhythmboxonline.firebaseapp.com",
    projectId: "rhythmboxonline",
    storageBucket: "rhythmboxonline.appspot.com",
    messagingSenderId: "983082707741",
    appId: "1:983082707741:web:9cd5043e80790b9aaa4ff4"
  };



export const fb = firebase.initializeApp(firebaseConfig)


export const auth = firebase.auth();