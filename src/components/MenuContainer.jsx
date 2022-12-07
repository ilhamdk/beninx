/* eslint-disable */
import React, { useState } from 'react'
import { IoBeer } from "react-icons/io5";
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {

  const [filter, setFilter] = useState("wine");
  const [{foodItems}, dispatch] = useStateValue()

  return (
    <section className="w-full mb-6" id='menu'>
      <div className='flex flex-col items-center justify-center w-full'>
        <p className="relative mr-auto text-2xl font-semibold transition-all duration-100 ease-in-out text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600">
            Beninx category drink
        </p>

        <div className='flex items-center justify-start w-full gap-8 py-6 overflow-x-scroll scrollbar-none'>
          {categories && categories.map(category => (
            <motion.div whileTap={{ scale: 0.75 }} key={category.id} className={`group ${filter === category.urlParamName ? 'bg-cartNumBg' : 'bg-white' }  hover:bg-cartNumBg w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center`} onClick={() => setFilter(category.urlParamName)}>
            <div className={`flex items-center ${filter === category.urlParamName ?  'bg-white' : 'bg-cartNumBg' } shadow-lg justify-center w-10 h-10 rounded-full group-hover:bg-white`}> 
              <IoBeer className={`text-lg ${filter === category.urlParamName ? 'text-textColor' : 'text-white'} group-hover:text-textColor`} />
            </div>
            <p className={`text-sm ${filter === category.urlParamName ? 'text-white' : 'text-textColor' } text-textColor group-hover:text-white`}>{category.name}</p>
          </motion.div>
          ))}
        </div>
        <div className='w-full'>
          <RowContainer flag={false} data={foodItems?.filter(n => n.category === filter)} />
        </div>
      </div>
    </section>
    )
}

export default MenuContainer