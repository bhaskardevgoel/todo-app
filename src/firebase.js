
  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyA8GEMpZYvrAoAvcx_98OIaGXZrgY0reco",
        authDomain: "todo-app-4d6db.firebaseapp.com",
        databaseURL: "https://todo-app-4d6db.firebaseio.com",
        projectId: "todo-app-4d6db",
        storageBucket: "todo-app-4d6db.appspot.com",
        messagingSenderId: "1094074590441",
        appId: "1:1094074590441:web:065a8ef51c3f8f74bcfc78",
        measurementId: "G-VJ6H2KX6NM"
  });

  const db = firebaseApp.firestore();

  export default db ;