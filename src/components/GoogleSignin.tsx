import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const GoogleSignin = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in with Google, you can access the user data from the result
      })
      .catch((error) => {
        // Handle errors
      });
  };
  return <button onClick={signInWithGoogle}>GoogleSignin</button>;
};

export default GoogleSignin;
