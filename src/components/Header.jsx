import React from 'react'
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import {MdShoppingCart} from 'react-icons/md'

const header = () => {
  return (
    <header className="fixed z-50 w-screen p-6 px-16">

      {/* desktop and tablet */}
      <div className="items-center justify-between hidden w-full h-full md:flex">
        <div className="flex items-center gap-2">
          <img src={Logo} className="object-cover w-8" alt="logo" />
          <p className="text-xl font-bold text-headingColor">City</p>
        </div>

        <div className='flex items-center gap-8'>
        <ul className="flex items-center gap-8">
          <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">Home</li>
          <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">Menu</li>
          <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">About Us</li>
          <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">Service</li>
        </ul>
        <div className="relative flex items-center justify-center">
          <MdShoppingCart className="text-2xl cursor-pointer text-textColor"/>
          <div className='absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 bg-cartNumBg'>
            <p className='text-xs font-semibold text-white'>2</p>
          </div>
        </div>

        <img src={Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl" alt="userprofile" />
        </div>
      </div>

      {/* mobile */}
      <div className="flex w-full h-full md:hidden"></div>
    </header>
  );
};

export default header