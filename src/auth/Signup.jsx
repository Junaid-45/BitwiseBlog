import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/1.png";
import { useEffect, useState } from "react";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useFirebaseContext } from "../firebase/FirebaseProvider";
import { ScaleLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Enter a valid Password"
    ),
});

export default function Signup() {
  const firebase = useFirebaseContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.userState);
  const [isLoading, setIsloading] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    !status && setIsloading(false);
  }, [status]);

  console.log(firebase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await registerSchema.validate(userData, {
        abortEarly: false,
      });

      let user = await firebase.signup(result);

      if (user) {
        toast.success("Registration successfull");
        navigate("/login");
      } else {
        toast.error("Something went wrong while signing up");
      }
    } catch (error) {
      console.log(error.errors || error);
      toast.error(error.errors[0] || error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen min-w-full flex items-center justify-center">
        <ScaleLoader color="#4f46e5" height={50} width={6} />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-[80px] w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={userData.email}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    // toggle type functionality
                    type={showPassword ? "text" : "password"}
                    value={userData.password || password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
              <div className="flex justify-between items-center gap-4">
                {" "}
                <hr
                  className="flex-1"
                  style={{
                    borderTop: "1px solid lightgray",
                  }}
                />
                <p className="flex-1 text-center">OR</p>{" "}
                <hr
                  style={{
                    borderTop: "1px solid lightgray",
                  }}
                  className="flex-1"
                />
              </div>
              <div>
                <button
                  onClick={firebase.signinWithGoogle}
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in With Google
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Click here to Login
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}
