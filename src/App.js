/* eslint-disable */
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, MainContainer, CreateContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {

  const [{}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col w-screen h-auto bg-primary">
        <Header />
        <main className="w-full px-4 py-4 md:px-10 mt-14 md:mt-20">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
