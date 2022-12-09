/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdShoppingCart } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 gap-3 scroll-smooth flex items-center ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="h-auto min-w-[300px] md:min-w-[340px]: p-2 my-12 bg-gray-100 rounded-lg w-300 md:w-340 bg-cardOverlay hover:drop-shadow-lg backdrop-blur-lg flex flex-col items-center justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.imageUrl}
                className="object-contain w-40 -mt-8 h-36"
                alt=""
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-blues drop-shadow-2xl hover:shadow-md"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingCart className="text-white" />
              </motion.div>
            </div>
            <div className="flex flex-col items-end justify-end w-full gap-4">
              <p className="text-base font-semibold text-textColor md:text-lg">
                {item?.title}
              </p>
              <p className="-mt-1 text-sm text-gray-500">
                Alkohol {item?.calories}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg font-semibold text-headingColor">
                  <span className="text-sm text-red-600">Rp</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
