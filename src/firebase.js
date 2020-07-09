import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "todoist-clone-app-2bfc1.firebaseapp.com",
    databaseURL: "https://todoist-clone-app-2bfc1.firebaseio.com",
    projectId: "todoist-clone-app-2bfc1",
    storageBucket: "todoist-clone-app-2bfc1.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

export { firebaseConfig as firebase }
