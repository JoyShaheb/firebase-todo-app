import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useLogoutMutation } from "../store";
import { toast } from "react-toastify";
import { themeSwitch, ThemeTypesEnum } from "../store/Slices/systemSlice";
import NavbarMenuOptions from "./Layout/NavbarMenuOptions";
import { LuSunMoon } from "react-icons/lu";
import { Button } from "./ui/button";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [logout] = useLogoutMutation();
  const user = useSelector((state: RootState) => state.user);
  const mode: string = useSelector((x: RootState) => x.system.mode);

  const dispatch = useDispatch()

  const isDarkMode = mode === ThemeTypesEnum.DARK;

  useEffect(() => {
    document.documentElement.classList.toggle(ThemeTypesEnum.DARK, isDarkMode);
  }, [isDarkMode]);

  const navigate = useNavigate();

  const appSignout = async () =>
    await toast
      .promise(logout(null).unwrap, {
        pending: "Logging out...",
        success: "Logout successful",
        error: "Logout failed",
      })
      .then(() => navigate("/login"));

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            Fire Task
          </span>
          <Button variant="ghost" size="icon" onClick={() =>
            dispatch(
              themeSwitch(
                isDarkMode ? ThemeTypesEnum.LIGHT : ThemeTypesEnum.DARK
              )
            )
          } >
            <LuSunMoon className="w-7 h-7" />
          </Button>
          {user.uid && (
            <div className="">
              <NavbarMenuOptions appSignout={appSignout} userImage={user?.photoURL} />
            </div>
          )}

          {/* signup button */}
          {!user.uid && (
            <div className="flex gap-3">
              <button
                type="button"
                className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="container mx-auto max-w-7xl">{children}</div>
    </>
  );
};

export default Navbar;
