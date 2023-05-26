import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  searchItem,
  setSearchItem,
  user,
  darkModeToggler,
  darkMode,
}) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-5">
      <div className="flex gap-3 items-center shadow-sm w-full p-2 px-4 rounded-md dark:bg-slate-500 bg-white ">
        <IoMdSearch fontSize={30} className="dark:text-white" />
        <input
          type="text"
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
          placeholder="Search"
          value={searchItem}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none dark:bg-slate-500 "
        />
        {user && (
          <>
            {" "}
            <Link to={`user-profile/${user?._id}`} className="hidden md:block">
              <img
                src={user?.image}
                alt="user-pic"
                className="w-14 h-12 rounded-lg "
              />
            </Link>
            <Link
              to={`create-pin`}
              className="bg-black text-white rounded-lg w-20 h-10 md:w-14 md:h-12 flex justify-center items-center"
            >
              <IoMdAdd />
            </Link>
          </>
        )}
        {user ? (
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white rounded-lg w-20 h-10 md:w-14 md:h-12 flex justify-center items-center"
          >
            <AiOutlineLogin size={25} />
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-green-500 text-white rounded-lg w-20 h-10 md:w-14 md:h-12 flex justify-center items-center"
          >
            <AiOutlineLogin size={25} />
          </button>
        )}

        <button
          onClick={darkModeToggler}
          className="flex items-center justify-center bg-black dark:bg-white dark:text-black dark:border-0 text-white border-2 border-black md:w-14 md:h-12 w-20 h-10 rounded-lg "
        >
          {darkMode ? (
            <BsFillLightbulbFill size={20} />
          ) : (
            <BsFillLightbulbOffFill size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
