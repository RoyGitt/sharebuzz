import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward, IoMdHome } from "react-icons/io";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";
import { GiBee } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-red-500 transition-all duration-100 ease-in-out capitalize";
  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black text-red-500  capitalize";

  return (
    <div className="flex flex-col shadow-lg justify-evenly dark:bg-slate-950 bg-white h-full  min-w-210 hide-scrollbar ">
      <Link
        to="/"
        className="flex  px-5 gap-2 my-3 pt-1  items-center"
        onClick={handleCloseSidebar}
      >
        <GiBee size={40} className="text-red-500  " />
        <h1 className="text-2xl dark:text-white font-bold  ">
          SHARE <span className=" font-normal">Buzz</span>
        </h1>
      </Link>
      <div className="flex flex-col gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
          onClick={handleCloseSidebar}
        >
          <IoMdHome size={30} />
          Home
        </NavLink>
        <h3 className="mt-2 px-5 text-base 2xl:text-2xl dark:text-white">
          Discover cateogries
        </h3>
        {categories.slice(0, categories.length - 1).map((category) => (
          <NavLink
            to={`/category/${category.name}`}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
            key={category.name}
          >
            <img
              src={category.image}
              className="w-8 h-8 rounded-full shadow-sm"
            />
            {category.name}
          </NavLink>
        ))}
      </div>
      {user && (
        <Link
          to={`user-profile/${user?._id}`}
          className="flex my-5 mb-3 gap-2  items-center  rounded-lg shadow-sm mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.image}
            className="w-10 h-10 rounded-full "
            alt="user-profile"
          />
          <p className="dark:text-white">{user?.userName}</p>
          <IoIosArrowForward className="dark:text-white" />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
