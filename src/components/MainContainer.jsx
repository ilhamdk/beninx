/* eslint-disable */
import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";

const MainContainer = () => {

  const [{foodItems}, dispatch] = useStateValue()
  const [scrollValue, setScrollValue] = useState(0)

  useEffect(() => {}, [scrollValue])
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <HomeContainer />

      <section className="w-full mb-6">
        <div className="flex items-center justify-between w-full">
          <p className="relative text-2xl font-semibold transition-all duration-100 ease-in-out text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600">
            Beninx prodigy drink
          </p>
          <div className="items-center hidden gap-3 md:flex">
            <motion.div whileTap={{ scale: 0.75 }} className="flex items-center justify-center w-8 h-8 bg-orange-300 rounded-lg cursor-pointer hover:bg-orange-600 hover:shadow-lg" onClick={() => setScrollValue(-200)}>
              <MdChevronLeft className="text-base text-white"/>
            </motion.div>
            <motion.div whileTap={{ scale: 0.75 }} className="flex items-center justify-center w-8 h-8 bg-orange-300 rounded-lg cursor-pointer hover:bg-orange-600 hover:shadow-lg" onClick={() => setScrollValue(200)}>
              <MdChevronRight className="text-base text-white"/>
            </motion.div>
          </div>
        </div>
        <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter((n) => n.price > "700.000")} />
      </section>
      <MenuContainer />
    </div>
  );
};

export default MainContainer;
