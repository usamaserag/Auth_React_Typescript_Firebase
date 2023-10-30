import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

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
  return (
    <button  onClick={signInWithGoogle} className="m-auto w-2/4 flex items-center justify-center gap-5 p-2 rounded bg-red-500 text-l text-white font-bold cursor-pointer">
      <FaGoogle />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignin;
