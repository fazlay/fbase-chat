import React, { useState, useEffect } from 'react';
import '../src/index.css'
//firebase dependencies
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
//components
import Button from './component/button/Button';
import Channel from './component/Channel'
import Loader from '../src/component/loader'


firebase.initializeApp(
  {
    apiKey: "AIzaSyDeuE4WEvwsb-RP-Laq1tVMRIvkRqHrl5M",
    authDomain: "chat-app-b5178.firebaseapp.com",
    projectId: "chat-app-b5178",
    storageBucket: "chat-app-b5178.appspot.com",
    messagingSenderId: "8782532640",
    appId: "1:8782532640:web:364265f0e39f5d82dc2c45",
    measurementId: "G-7SBC922XDT"
  }
)

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initializing, setInitializing] = useState(true)

  //retrive Google provider object




  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    })
    //clean up subscriber
    return unsubscribe;

  }, []);
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    //set language to the default browser preference
    auth.useDeviceLanguage();
    //start sign in process
    try {
      await auth.signInWithPopup(provider)
    } catch (error) {
      console.error(error);

    }
  }

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }

  };

  const renderContent = () => {
    if (initializing) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader size="lg" />
        </div>
      )
    }
  }


  //if (user) return <Channel user={user} />;

  return (
    <div>

      {user ? (
        <>
          <Button
            onClick={signOut}

          >Sign out</Button>
          <Channel user={user} db={db} />
        </>
      ) : (
          <Button

            onClick={signInWithGoogle}

          >
            Sign in with Google
          </Button>
        )}
    </div>
  );
}

export default App;
