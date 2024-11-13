import React from 'react';
import Link from "next/link";

const Footer = () => {
  return (
    <div className='h-12 md:h-24 lg:p-20 xl:p-40 text-red-800 flex items-center justify-between'>
      <Link className='font-bold text-xl' href="/">DelyFood</Link>
      <p>© ALL RIGHTS RESERVED</p>
    </div>
  )
}

export default Footer
