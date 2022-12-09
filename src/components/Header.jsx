/* eslint-disable */
import React, { useState } from "react";

import navbar_icon from "../img/navbar_icon.png";
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

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

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

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-4 px-5 md:p-6 md:px-16 bg-black ">
      {/* desktop and tablet */}
      <div className="items-center justify-between hidden w-full h-full md:flex">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={navbar_icon} className="object-cover w-8" alt="logo" />
          <p className="text-xl font-bold text-white">Bar Beninx</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base transition-all duration-100 ease-in-out cursor-pointer text-white hover:text-headingColor"
              onClick={() => setisMenu(false)}
            >
              Home
            </li>
            <li
              className="text-base transition-all duration-100 ease-in-out cursor-pointer text-white hover:text-headingColor"
              onClick={() => setisMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base transition-all duration-100 ease-in-out cursor-pointer text-white hover:text-headingColor"
              onClick={() => setisMenu(false)}
            >
              About Us
            </li>
            <li
              className="text-base transition-all duration-100 ease-in-out cursor-pointer text-white hover:text-headingColor"
              onClick={() => setisMenu(false)}
            >
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingCart className="text-2xl cursor-pointer text-white" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute flex items-center border border-black justify-center w-5 h-5 rounded-full -top-2 -right-2 bg-white">
                <p className="text-xs font-semibold text-black">
                  {cartItems.length}
                </p>
              </div>
            )}
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
                className="absolute right-0 flex flex-col w-40 rounded-lg bg-gray-50 shadow-x1 top-12"
              >
                {user && user.email === "barbeninx@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="flex items-center gap-3 px-4 py-2 text-base transition-all duration-100 ease-in-out rounded-t-lg cursor-pointer hover:bg-slate-100 text-textcolor"
                      onClick={() => setisMenu(false)}
                    >
                      <MdAdd /> New Item
                    </p>
                  </Link>
                )}
                <p
                  className="flex items-center gap-3 px-4 py-2 text-base transition-all duration-100 ease-in-out rounded-b-lg cursor-pointer hover:bg-slate-100 text-textcolor"
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
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingCart className="text-2xl cursor-pointer text-textColor" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute flex items-center border border-black justify-center w-5 h-5 rounded-full -top-2 -right-2 bg-white">
              <p className="text-xs font-semibold text-black">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={navbar_icon} className="object-cover w-8" alt="logo" />
          <p className="text-xl font-bold text-headingColor">Bar Beninx</p>
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
              className="absolute right-0 flex flex-col w-40 rounded-lg bg-gray-50 shadow-x1 top-12"
            >
              {user && user.email === "barbeninx@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="flex items-center gap-3 px-4 py-2 text-base transition-all duration-100 ease-in-out rounded-t-lg cursor-pointer hover:bg-slate-100 text-textColor"
                    onClick={() => setisMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li className="px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-100 text-textColor">
                  Home
                </li>
                <li className="px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-100 text-textColor">
                  Menu
                </li>
                <li className="px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-100 text-textColor">
                  About Us
                </li>
                <li className="px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-100 text-textColor">
                  Service
                </li>
              </ul>
              <p
                className="flex items-center justify-center gap-3 p-2 m-2 text-base transition-all duration-100 ease-in-out bg-gray-200 rounded-md shadow-md cursor-pointer hover:bg-gray-300 text-textColor"
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
