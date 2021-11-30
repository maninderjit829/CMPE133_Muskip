
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUl7e2xoBFAIoRYCjNyQnukrYxZJDGigM",
    authDomain: "muskip-5c952.firebaseapp.com",
    projectId: "muskip-5c952",
    storageBucket: "muskip-5c952.appspot.com",
    messagingSenderId: "985958247263",
    appId: "1:985958247263:web:49b0ff7d3c304b037b24ea"
  };

 const fire = firebase.initializeApp(firebaseConfig);

if(!firebase.apps.length){
  firebase.initializeApp({});
} else {
  firebase.app();
}

  const auth = firebase.auth();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

  export { auth, googleAuthProvider, facebookAuthProvider}
  export default fire;