/* eslint-disable */
import React, { useState } from "react";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setisMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };

  const logout = () => {
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-4 px-5 md:p-6 md:px-16">
      {/* desktop and tablet */}
      <div className="items-center justify-between hidden w-full h-full md:flex">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="object-cover w-8" alt="logo" />
          <p className="text-xl font-bold text-headingColor">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              Home
            </li>
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              Menu
            </li>
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              About Us
            </li>
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              Service
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingCart className="text-2xl cursor-pointer text-textColor" />
            <div className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 bg-cartNumBg">
              <p className="text-xs font-semibold text-white">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-x1 rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "barbeninx@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textcolor text-base rounded-t-lg">
                      <MdAdd /> New Item
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textcolor text-base rounded-b-lg"
                  onClick={logout}
                >
                  <MdLogout /> Log Out
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between w-full h-full md:hidden">
        <div className="relative flex items-center justify-center">
          <MdShoppingCart className="text-2xl cursor-pointer text-textColor" />
          <div className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 bg-cartNumBg">
            <p className="text-xs font-semibold text-white">2</p>
          </div>
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="object-cover w-8" alt="logo" />
          <p className="text-xl font-bold text-headingColor">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-x1 rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "barbeninx@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base rounded-t-lg">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li className="px-4 py-2 text-base hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer text-textColor">
                  Home
                </li>
                <li className="px-4 py-2 text-base hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer text-textColor">
                  Menu
                </li>
                <li className="px-4 py-2 text-base hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer text-textColor">
                  About Us
                </li>
                <li className="px-4 py-2 text-base hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer text-textColor">
                  Service
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Log Out <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default header;
