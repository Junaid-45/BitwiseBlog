import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./slices/userSlice";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./layouts/HomeLayout";
import Homepage from "./pages/Homepage";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./pages/Auth/LoginPage";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/NotFound";
import AuthWrapper from "./components/AuthWrapper";
import AddArticles from "./pages/AddArticles";
import SingleArticle from "./pages/SingleArticle";
import app from "./firebase/firebase.config";

const auth = getAuth(app);

export default function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Auth state changed");
      dispatch(login({ user }));
    } else {
      dispatch(logout());
    }
  });

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Homepage />} />
          <Route
            path="articles"
            element={
              <AuthWrapper auth={true}>
                <Articles />
              </AuthWrapper>
            }
          />
          <Route
            path="add-article"
            element={
              <AuthWrapper auth={true}>
                <AddArticles />
              </AuthWrapper>
            }
          />
          <Route path="article/:id" element={<SingleArticle />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route
          path="/login"
          element={
            <AuthWrapper auth={false}>
              <LoginPage />
            </AuthWrapper>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
