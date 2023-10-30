import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Loading from "./components/Loading";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Home from "./components/Home";

function App() {
  const [isRegister, setIsRegister] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setLoading(false);
      } else {
        setUserName(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Function to sign out the current user
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error", error);
      });
  };

  return (
    <div className="container m-auto h-screen">
      <Navbar userName={userName} handleSignOut={handleSignOut} />
      {loading ? (
        // Display a loading indicator while checking for the userName
        <Loading />
      ) : !userName ? (
        isRegister ? (
          <Signup
            setIsRegister={setIsRegister}
            isRegister={isRegister}
            setUserName={setUserName}
          />
        ) : (
          <Signin setIsRegister={setIsRegister} isRegister={isRegister} />
        )
      ) : (
        <Home userName={userName} />
      )}
    </div>
  );
}

export default App;
