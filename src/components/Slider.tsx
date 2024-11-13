"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
     2000
    );
    return () => clearInterval(interval)
  }, []);

  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-gray-100'>
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8  font-bold lg:h-full lg:w-1/2">
        <h1 className="text-5xl text-center uppercase md:p-10 p-4 md:text-6xl xl:text-7xl">
            {data[currentSlide].title}
        </h1>
        <button className="bg-red-800 text-white py-4 px-8">Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full h-1/2 relative lg:h-full lg:w-1/2">
       <Image src={data[currentSlide].image} alt='' fill className='object-cover'/>
      </div>
    </div>
  )
}

export default Slider
