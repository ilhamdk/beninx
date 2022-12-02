import React from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, MainContainer, CreateContainer } from "./components";

const App = () => {
  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col w-screen h-auto bg-primary">
        <Header />
        <main className="w-full md:px-10 px-4 py-4 mt-14 md:mt-20">
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
