import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface IFormInput {
  fullName: string;
  eMail: string;
  password: string;
  confirmPassword: string;
}

interface SigninProps {
  setIsRegister: (isRegister: boolean) => void;
  isRegister: boolean;
}

const Signin: React.FC<SigninProps> = ({ setIsRegister, isRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, data.eMail, data.password);
    // Sign-in successful, you can add further actions here if needed
    console.log("Sign-in successful");
  } catch (error) {
    // Handle sign-in errors
    console.error("Error signing in:", error);
    throw error; // You can handle the error or propagate it
  }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-4"
    >
      <div>
        <label className="text-l font-bold">E-mail</label>
        <input
          className="border rounded-md pl-4 p-2 w-full"
          type="email"
          {...register("eMail", {
            required: "Email is required",
            validate: {
              maxLength: (v) =>
                v.length <= 50 || "The email should have at most 50 characters",
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Email address must be a valid address",
            },
          })}
        />
        {errors.eMail?.message && (
          <small className="text-red-600">{errors.eMail.message}</small>
        )}
      </div>
      <div>
        <label className="text-l font-bold">Password</label>
        <input
          className="border rounded-md pl-4 p-2 w-full"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <small className="text-red-600">{errors.password.message}</small>
        )}
      </div>

      <div className="flex aligns-center gap-10 w-2/4 m-auto">
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer w-2/4"
          type="submit"
          value="Sign in"
        />
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-10 rounded focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer w-2/4"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Signin;
