"use client"

import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);

    router.push('/');
  };

  const confirmLogout = () => {
    setShowConfirmLogout(true);
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <div className="h-12 text-red-800 p-4 flex items-center justify-between border-b-2 border-b-red-800 uppercase md:h-24 lg:px-20 xl:px-40">
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Delyfood</Link>
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div>
        {user ? (
          <>
            {showConfirmLogout ? (
              <div className="flex gap-2">
                <button
                  onClick={handleLogout}
                  className="bg-red-800 text-white text-sm p-1 rounded-sm cursor-pointer"
                >
                  Confirm Logout
                </button>
                <button
                  onClick={cancelLogout}
                  className="bg-gray-500 text-white text-sm p-1 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={confirmLogout}
                className="bg-red-800 text-white text-sm p-1 rounded-sm cursor-pointer"
              >
                LOGOUT
              </button>
            )}
          </>
        ) : (
          <Link
            className="bg-red-800 text-white text-sm p-1 rounded-sm cursor-pointer"
            href="/login"
          >
            Login
          </Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
