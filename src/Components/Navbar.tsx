import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useLogoutMutation } from "../store";
import { toast } from "react-toastify";
import { TextLimit } from "./Text/TextLimit";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import BasicSwitch from "./Switch/BasicSwitch";
import { themeSwitch, ThemeTypesEnum } from "../store/Slices/systemSlice";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [logout] = useLogoutMutation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const mode: string = useSelector((x: RootState) => x.system.mode);

  const iconStyles =
    "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";

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
      .then(() => setIsMenuOpen(false))
      .then(() => navigate("/login"));
  function dispatch(arg0: any): void {
    throw new Error("Function not implemented.");
  }

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
          {/* icon */}
          {user.uid && (
            <div className="flex items-center md:order-2 relative">
              <button
                type="button"
                className="border border-gray-500 p-[3px] flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open user menu</span>
                {user?.photoURL ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL}
                    alt="user photo"
                  />
                ) : (
                  <UserIcon className="w-6 rounded-full" />
                )}
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  right: "0",
                }}
                className={`z-50 ${
                  !isMenuOpen && "hidden"
                } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user?.name ? TextLimit(user?.name, 20) : "anonymus user"}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {TextLimit(user?.email, 20)}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/tasks"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Tasks
                  </Link>
                  <Link
                    to="/tasks"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/tasks"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Premium
                  </Link>
                  <div
                    onClick={appSignout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </div>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white :bg-gray-700 group">
                    {isDarkMode ? (
                      <MoonIcon className={iconStyles} />
                    ) : (
                      <SunIcon className={iconStyles} /> // Use SunIcon for light mode
                    )}
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {isDarkMode ? "Dark Mode" : "Light Mode"}
                    </span>
                    <BasicSwitch
                      onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.checked
                          ? dispatch(themeSwitch(ThemeTypesEnum.DARK))
                          : dispatch(themeSwitch(ThemeTypesEnum.LIGHT))
                      }
                    />
                  </div>
                </ul>
              </div>
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
