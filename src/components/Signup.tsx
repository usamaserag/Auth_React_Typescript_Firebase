import { useForm, SubmitHandler } from "react-hook-form";
import GoogleSignin from "./GoogleSignin";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

interface IFormInput {
  displayName: string;
  eMail: string;
  password: string;
  confirmPassword: string;
}

interface SignupProps {
  setIsRegister: (isRegister: boolean) => void;
  isRegister: boolean;
  setUserName: (userName: string) => void
}

const Signup: React.FC<SignupProps> = ({ setIsRegister, isRegister, setUserName }) => {
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createUserWithEmailAndPassword(auth, data.eMail, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {
          // Use auth.currentUser to access the authenticated user
          displayName: data.displayName,
        });
        setUserName(data.displayName);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="text-l font-bold">Full Name</label>
          <input
            className="border rounded-md pl-4 p-2 w-full"
            type="text"
            placeholder="Enter you name..."
            {...register("displayName", {
              required: true,
              validate: {
                minLength: (v) => v.length >= 5,
                matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
              },
            })}
          />
          {errors.displayName?.type === "required" && (
            <small className="text-red-600">Username is required</small>
          )}

          {errors.displayName?.type === "minLength" && (
            <small className="text-red-600">
              The username should have at least 5 characters
            </small>
          )}

          {errors.displayName?.type === "matchPattern" && (
            <small className="text-red-600">
              Username must contain only letters, numbers and _
            </small>
          )}
        </div>
        <div>
          <label className="text-l font-bold">E-mail</label>
          <input
            className="border rounded-md pl-4 p-2 w-full"
            type="email"
            placeholder="Enter you email..."
            {...register("eMail", {
              required: "Email is required",
              validate: {
                maxLength: (v) =>
                  v.length <= 50 ||
                  "The email should have at most 50 characters",
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
            placeholder="Enter you password..."
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <small className="text-red-600">{errors.password.message}</small>
          )}
        </div>
        <div>
          <label className="text-l font-bold">Confirm Password</label>
          <input
            className="border rounded-md pl-4 p-2 w-full"
            type="password"
            placeholder="Re-enter your password..."
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <small className="text-red-600">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>

        <div className="flex aligns-center gap-10 w-2/4 m-auto">
          <input
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 w-2/4 rounded focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
            type="submit"
            value="Sign up"
          />
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-2/4 rounded focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </form>
      <GoogleSignin />
    </>
  );
};

export default Signup;
