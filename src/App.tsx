import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  ErrorPage,
  ForgotPassword,
  Login,
  ResetPassword,
  Signup,
  Tasks,
  Profile,
} from "./pages";
import Navbar from "./Components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase-config";
// import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "./store";
import { AuthenticationRoutes, ProtectedRoutes } from "./pages/utils";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const photoURL = user.photoURL as string;
        const name = user.displayName as string;
        const email = user.email as string;
        // @ts-ignore
        // Cookies.set("accessToken", user?.accessToken);
        dispatch(
          loginSuccess({
            uid,
            photoURL,
            name,
            email,
          })
        );
      } else {
        // Cookies.remove("accessToken");
        dispatch(logoutSuccess());
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AuthenticationRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default App;
