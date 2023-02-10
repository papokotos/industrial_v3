import React, { useContext, useState } from "react";
import { NavbarContext } from "./NavbarContext";
import { FaBars, FaGithub, FaTimes } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { useSignOut } from "react-auth-kit";
import Logo from "../../assets/hr.png";

const Navbar = () => {
  // const [nav, setNav] = useState(true);
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const handleClick = () => setMobileNav(!mobileNav);
  const signOut = useSignOut();
  const singOutAndDeleteStorage = () => {
    signOut();
    localStorage.setItem("loggedIn", null);
    window.location.reload();
  };

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#D3D3D3] text-black">
      <div>
        <a href={"/dashboard"}>
          <img href={"/dashboard"} src={Logo} alt="Logo" style={{ width: "80px", cursor: "pointer" }} />
        </a>
      </div>

      {/* Main Menu */}
      <ul className="hidden md:flex">
        <li>
          <a href={"/dashboard"}>Dashboard</a>
        </li>
        <li>
          <a href={"/users"}>Users</a>
        </li>
        <li>
          <a href={"/teams"}>Teams</a>
        </li>
        <li>
          <a href={"/tasks"}>Tasks</a>
        </li>
      </ul>
      <ul className="hidden md:flex">
        <li onClick={singOutAndDeleteStorage}>Sign Out</li>
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10">
        {mobileNav ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <ul className={mobileNav ? "absolute top-0 left-0 w-full h-screen bg-[#D3D3D3] flex flex-col justify-center items-center" : "hidden"}>
        <li className="py-6 text-4xl">
          <a href={"/dashboard"}>Dashboard</a>
        </li>
        <li className="py-6 text-4xl">
          <a href={"/users"}>Users</a>
        </li>
        <li className="py-6 text-4xl">
          <a href={"/teams"}>Teams</a>
        </li>
        <li className="py-6 text-4xl">
          <a href={"/tasks"}>Tasks</a>
        </li>
        <li onClick={signOut} className="py-6 text-4xl">
          Sign Out
        </li>
      </ul>

      {/* Social Menu */}
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[0px] duration-300 bg-[#333]">
            <a className="flex justify-between items-center w-full text-gray-300" href="https://github.com/papokotos/industrial_v2">
              GitHub <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[0px] duration-300 bg-[#6e5494]">
            <a className="flex justify-between items-center w-full text-gray-300" href="/">
              Docs <FcDocument size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
