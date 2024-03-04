import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Nav = () => {
  const { auth, setAuth } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  const logouthandler = () => {
    setAuth({
      accessToken: "",
      email: "",
    });
  };
  useEffect(() => {
    if (auth?.accessToken) {
      setLoggedIn(true);
    }
  }, [auth]);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header className="z-50">
      <div
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 999,
        }}
        className="px-4 py-2 text-white flex   justify-between bg-black"
      >
        <h1 className="font-custom font-extrabold text-2xl">easyevents</h1>
        <div
          className={
            toggleMenu
              ? "md:flex  md:pt-0 pt-10 w-full md:w-auto"
              : "hidden md:flex"
          }
          id="menu"
        >
          <ul>
            <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
              Home
            </li>

            <NavLink
              to="/signup"
              className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3"
            >
              Signup
            </NavLink>
            {loggedIn ? (
              <NavLink
                to="/login"
                onClick={logouthandler}
                className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3"
              >
                Log out
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3"
              >
                Login
              </NavLink>
            )}
          </ul>
        </div>
        <div className="cursor-pointer md:hidden">
          <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
          <label
            className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
            htmlFor="menu-btn"
          >
            <span
              onClick={handleToggle}
              className="navicon bg-white-darkest flex items-center relative"
            ></span>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Nav;
