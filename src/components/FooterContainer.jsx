import React from 'react'
import footer from '../img/footer.jpg';

const FooterContainer = () => {
  return (
    <div className='ssm:flex'> 
      <div className='flex justify-around w-full bg-blues'> 
      <img src={footer} alt="footer" className='hidden sm:block w-[200px] h-full' />
      <div className='p-6 px-6 text-white'>
        OH YES, WE DID.THE BAR BENINX, WELL SERVE YOU A BEST DRINK FROM DIFFERENT PARTS OF THE WORLD 
      </div>
      <div className='p-6 text-white'>
        <div className='text-oranges'>
          FIND OUR BAR
        </div>
        <div>
          Jl. Dr. Ir. H. Soekarno, Mulyorejo, Surabaya.(031) 5915551
        </div>
      </div>
      <div className='p-6 text-white'>
        <div className='text-oranges'>
          WORKING HOURS
        </div>
        <div>
          MONDAY UNTIL FRIDAY 
          <div>
            9.00 - 22.00
          </div>
        </div>
        <div className='mt-6'>
          SATURDAY - SUNDAY 
          <div>
            12.00 - 24.00
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default FooterContainer