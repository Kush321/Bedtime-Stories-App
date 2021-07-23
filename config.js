import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyC3X6gX_ZtIDr_M1fgZyBERsC0OgSmTvs8",
    authDomain: "story-hub-74a56.firebaseapp.com",
    projectId: "story-hub-74a56",
    storageBucket: "story-hub-74a56.appspot.com",
    messagingSenderId: "35356267257",
    appId: "1:35356267257:web:2bb45b1c3e39bf6b7d0828"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()