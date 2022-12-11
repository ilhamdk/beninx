/* eslint-disable */
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="flex items-center justify-between w-full p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-textcolor" />
        </motion.div>
        <p className="text-lg font-semibold text-textcolor">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 text-base bg-gray-100 rounded-md cursor-pointer hover:shadow-md text-textColor"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />{" "}
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart item section */}

          <div className="flex flex-col w-full gap-3 px-6 py-10 overflow-y-scroll h-340 md:h-42 scrollbar-none">
            {/* cart item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items center justify-evenly px-8 py-2">
            <div className="flex items-center justify-between w-full">
              <p className="text-lg text-gray-400">Sub Total</p>
              <p className="text-lg text-gray-400">Rp {tot}.000</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-lg text-gray-400">Tax</p>
              <p className="text-lg text-gray-400">Rp 15.000</p>
            </div>

            <div className="w-full my-2 border-b border-gray-600"></div>

            <div className="flex items-center justify-between w-full">
              <p className="text-xl font-semibold text-gray-200">Total</p>
              <p className="text-xl font-semibold text-gray-200">
                Rp {tot + 15.000}.000
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg-my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg-my-2 hover:shadow-lg"
              >
                Login to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl font-semibold text-textColor">
            Add Some Items To Your Cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
