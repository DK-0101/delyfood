import React from 'react';
import Image from 'next/image';
import CountDown from './CountDown';

const Offers = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">Delicious Burger & French Fry</h1>
        <p className='text-white xl:text-xl'>Progressively simplify effective e-toilers and process-centric methods of empowerment. Quickly pontificate parallel.</p>
        <CountDown />
        <button className="bg-red-800 text-white rouded-md py-3 px-6">Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="relative flex-1 w-full md:h-full">
        <Image className='object-contain' src="/offerProduct.png" alt='' fill/>
      </div>
    </div>
  )
}

export default Offers