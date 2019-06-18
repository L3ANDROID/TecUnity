import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDS3lBdLmPGwe_KW2yFZB8pvfCRB2yQV6Y",
    authDomain: "tecunity-11228.firebaseapp.com",
    databaseURL: "https://tecunity-11228.firebaseio.com",
    projectId: "tecunity-11228",
    storageBucket: "tecunity-11228.appspot.com",
    messagingSenderId: "443707306284",
    appId: "1:443707306284:web:3bf0f1a061a853dc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase