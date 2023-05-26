import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";
import UserProfile from "../components/UserProfile";
import Pins from "./Pins";

import { userQuery } from "../utils/data";
import { client } from "../client";
import { GiBee } from "react-icons/gi";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();

  const [darkMode, setDarkMode] = useState(false);

  const darkModeToggler = () => {
    setDarkMode((prevMode) => !prevMode);
    localStorage.setItem("mode", !darkMode ? "Dark" : "Light");
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === "Dark") {
      setDarkMode(true);
    } else if (mode === "Light") {
      setDarkMode(false);
    }
  }, []);

  console.log(darkMode);

  const scrollRef = useRef();

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="flex bg-gray-50 dark:bg-gray-800 md:flex-row flex-col h-screen transition-height duration-75 ease-out ">
        <div className="hidden  md:flex h-screen flex-initial">
          <Sidebar user={user && user} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu
              fontSize={35}
              className="cursor-pointer dark:text-white"
              onClick={() => setToggleSidebar(true)}
            />
            <Link to="/" className="flex  px-5 gap-2  pt-1  items-center">
              <GiBee size={30} className="text-red-500 " />
              <h1 className="md:text-2xl texl-xl dark:text-white  md:text-red-500 font-bold ">
                SHARE <span className=" font-normal">Buzz</span>
              </h1>
            </Link>
            {user && (
              <Link to={`user-profile/${user?._id}`}>
                <img
                  src={user?.image}
                  alt="user-pic"
                  className="w-9 h-9 rounded-full"
                />
              </Link>
            )}
          </div>
          {toggleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer dark:text-white"
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>
        <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route
              path="/*"
              element={
                <Pins
                  user={user && user}
                  darkModeToggler={darkModeToggler}
                  darkMode={darkMode}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
