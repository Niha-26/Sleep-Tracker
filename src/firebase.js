import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAnnwuPYKsnwhLSGOhexbtOtA-c3-5o17s",
    authDomain: "sleep-tracker-ec699.firebaseapp.com",
    projectId: "sleep-tracker-ec699",
    storageBucket: "sleep-tracker-ec699.appspot.com",
    messagingSenderId: "287421652528",
    appId: "1:287421652528:web:8c1ed269c3c535d6cc97f5"
  };
const fire =   firebase.initializeApp(firebaseConfig);

export default fire;