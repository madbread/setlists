import { initializeApp } from 'firebase/app';
import {getDatabase, ref} from 'firebase/database'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQeCmX7ouzkQGwXDWqGHaKwXHZg6yZjgQ",
  authDomain: "madbread-setlists.firebaseapp.com",
  databaseURL: "https://madbread-setlists.firebaseio.com",
  projectId: "madbread-setlists",
  storageBucket: "madbread-setlists.appspot.com",
  messagingSenderId: "659663875433",
  appId: "1:659663875433:web:3a43234812cd2a9814e1f8"
}

// Initialize DB
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const songlistRef = ref(db, 'data/songLists');
const songsRef = ref(db, 'data/songs');
const instrumentsRef = ref(db, 'meta/instruments');

const methods = {
  getSonglistsRef: () => songlistRef,
  getSongsRef: () => songsRef,
  getInstrumentsRef: () => instrumentsRef,

  getSonglistRef: id => ref(db, `data/songLists/${id}`),
  getSonglistSongsRef: id => ref(db, `data/songLists/${id}/songs`),
  
  login: (email, pass) => {
    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, pass)
        .then((response) => {
          console.log('response: ', response)
          console.log('...you are signed in!')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
  },

  logout: () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => console.log('You have signed out'))
      .catch(error => console.log('Error signing out: ', error))
  },

  getLoginObserver: callback => {
    const auth = getAuth();
      onAuthStateChanged(auth, user => {
        user = user ? user : {}
        callback(user)
      })
  }
};

export default methods;