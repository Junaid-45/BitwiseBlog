import React from "react";
import logo from "../assets/4.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../slices/userSlice";
import { useFirebaseContext } from "../firebase/FirebaseProvider";

const Header = () => {
  const firebase = useFirebaseContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);

  const handleLogout = async () => {
    try {
      let result = await firebase.logout();
      console.log("Logout Function Result", result);
      if (result) {
        dispatch(logout());
        toast.success("Successfully logged out");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in Logout Method : ", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-[66px] ">
      <header className="h-full max-w-[1180px] mx-auto flex justify-between items-center">
        <div className="h-[40px]">
          <Link to={"/"}>
            <img src={logo} className="h-full" alt="Bitwiseblog logo" />
          </Link>
        </div>
        <ul className="flex items-center gap-6">
          <li className="hover:text-indigo-600 transition-all duration-200 text-[15px] font-[700] text-[#1c1c1c] cursor-pointer">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-indigo-600 transition-all duration-200 text-[15px] font-[700] text-[#1c1c1c] cursor-pointer">
            <Link to={"/articles"}>Articles</Link>
          </li>
          <li className="hover:text-indigo-600 transition-all duration-200 text-[15px] font-[700] text-[#1c1c1c] cursor-pointer">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="hover:text-indigo-600 transition-all duration-200 text-[15px] font-[700] text-[#1c1c1c] cursor-pointer">
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-[13px] font-bold bg-transparent text-indigo-600 border border-indigo-600 py-2 px-3 rounded-md hover:bg-indigo-600 hover:border-white hover:text-white transition-all duration-200"
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/add-article")}
                className="text-[13px] font-bold bg-transparent text-indigo-600 border border-indigo-600 py-2 px-3 rounded-md hover:bg-indigo-600 hover:border-white hover:text-white transition-all duration-200"
              >
                Add Post
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-[13px] font-bold bg-transparent text-indigo-600 border border-indigo-600 py-2 px-3 rounded-md hover:bg-indigo-600 hover:border-white hover:text-white transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-[13px] font-bold border bg-indigo-600 text-white py-2 px-3 rounded-md hover:text-indigo-600 hover:border hover:border-indigo-600 hover:bg-transparent transition-all duration-200"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
