import React from "react";
import heros from "../img/heros.jpg";
import { IoCall } from "react-icons/io5";
import { heroData } from "../utils/data";


const HomeContainer = () => {
  return (
    <section className="grid w-full grid-cols-1 gap-2 max-[460px]:pb-20 max-[300px]:pb-32 md:grid-cols-2" id="home">
      <div className="flex flex-col items-start justify-center flex-1 gap-6 py-2 lg:-mt-40">
        <div className="flex items-center justify-center gap-2 px-2 py-1 mt-8 bg-black rounded-full">
          <p className="text-base font-semibold text-white">
            Beninx reservation
          </p>
          <div className="w-8 h-8 overflow-hidden bg-white rounded-full drop-shadow-xl">
            <IoCall className="object-contain w-full h-full" />
          </div>
        </div>

        <p className="text-[1.5rem] md:text-[3.5rem] font-bold tracking-wide text-headingColor">
          Save Indonesian people from 
          <span className="text-oranges text-[2rem] md:text-[3rem]">
            {" "}
            Evil Cycles
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          BAR BENINX adalah sebuah website yang dibuat untuk melakukan pemesanan makanan dan minuman di BAR BENINX.
        </p>
        <button
          type="button"
          className="w-full px-4 py-2 transition-all duration-100 ease-in-out rounded-lg bg-oranges md:w-auto hover:shadow-lg"
        >
          Order Now
        </button>
      </div>
      <div className="relative flex items-center flex-1 py-2">
        <img src={heros} className="w-full ml-auto rounded-3xl h-420 lg:w-auto lg:h-650" alt="hero-bg" />
        <div className="absolute top-0 left-0 flex flex-wrap items-center justify-center w-full h-full gap-4 py-12 lg:-mt-6 lg:px-8">
          {heroData && heroData.map(n => (
          <div key={n.id} className="flex flex-col items-center justify-center p-4 text-center w-28 h-30 drop-shadow-lg rounded-3xl bg-cardOverlay backdrop-blur-md md:w-190">
            <img src={n.imageSrc} alt="Beninx" className="object-contain w-full h-10 -mt-10 mx:h-36 mx:w-40 mx:-mt-20" />
            <p className="mt-1 text-base font-semibold lg:text-xl text-blues">{n.name}</p>
            <p className="lg:my-3 text-[12px] my-1 lg:text-sm font-semibold text-center text-blues">{n.decp}</p>
            <p className="text-sm font-semibold text-blues"><span className="text-xs text-red-600">Rp</span> {n.price}</p>
          </div>
          ))}
        </div>
      </div>       
    </section>
  );
};

export default HomeContainer;
