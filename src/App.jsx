import { Navigate, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./slices/userSlice";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./layouts/HomeLayout";
import Homepage from "./pages/Homepage";
import Articles from "./pages/Articles";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AddArticles from "./pages/AddArticles";
import SingleArticle from "./pages/SingleArticle";
import app from "./firebase/firebase.config";
import Contact from "./pages/Contact";
import LoginPage from "./auth/LoginPage";
import Signup from "./auth/Signup";

const auth = getAuth(app);

export default function App() {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.userState);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Auth state changed");
      dispatch(login({ user }));
    } else {
      dispatch(logout());
    }
  });
  console.log(user);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="articles" element={<Articles />} />
          <Route path="article/:id" element={<SingleArticle />} />
          <Route
            path="add-article"
            element={status ? <AddArticles /> : <Navigate to={"/login"} />}
          />
        </Route>
        <Route
          path="/login"
          element={status ? <Navigate to={"/"} /> : <LoginPage />}
        />

        <Route
          path="/signup"
          element={status ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
