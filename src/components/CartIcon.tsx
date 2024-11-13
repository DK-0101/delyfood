"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

const CartIcon = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user && user.id) {
        try {
          const res = await fetch(`http://localhost:8800/api/cart/${user.id}`);
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to fetch cart items");
          }
          const data = await res.json();
          console.log("Cart data:", data);
          
          if (Array.isArray(data)) {
            setCartItems(data);
          } else {
            setError("Invalid cart data structure");
          }
        } catch (error: any) {
          setError(error.message || "Error fetching cart items");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid user ID or user is not logged in.");
        setLoading(false);
      }
    };

    if (user) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calcule a quantidade total

  return (
    <Link className='flex items-center gap-4' href="/cart">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt='' fill />
      </div>
      <span>Cart ({totalQuantity})</span> {/* Renderize a quantidade total aqui */}
    </Link>
  );
}

export default CartIcon;
