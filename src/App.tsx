import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  const [isRegister, setIsRegister] = useState(true);
  return (
    <div className="container m-auto">
      <Navbar />
      {isRegister ? (
        <Signup setIsRegister={setIsRegister} isRegister={isRegister} />
      ) : (
        <Signin setIsRegister={setIsRegister} isRegister={isRegister} />
      )}
    </div>
  );
}

export default App;
