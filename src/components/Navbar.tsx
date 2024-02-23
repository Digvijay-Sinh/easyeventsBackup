import { useState } from "react";

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header className="">
      <div
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 999,
          backgroundImage: `linear-gradient(to right bottom,rgbA(255,20,147,0.9), rgba(255, 0, 255, 0.9) 35% ,rgba(0, 0, 255, 0.9))`,
          color: "white",
        }}
        className="px-4 py-2 text-white flex  justify-between "
     
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
            <li className="dropdown md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3 relative">
              <a>Products</a>
            </li>
            <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
              AboutUs
            </li>
            <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
              ContactUs
            </li>
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
