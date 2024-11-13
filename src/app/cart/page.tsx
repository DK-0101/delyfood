"2d1f99463be3314386b1ba4f5103093979f5f84725958eb518abe69cd378b93a"
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

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

const CartPage = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [customLocation, setCustomLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

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
          setCartItems(data);
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

  const fetchAddressSuggestions = async (query: string) => {
    try {
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=1d3581ce7cab4ce0b54dac45c0d8cb59`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setSuggestions(data.results.map((result: any) => result.formatted));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCustomLocation(value);
    if (value.length > 2) {
      fetchAddressSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddressSuggestions(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting geolocation", error);
          setAddress("Error getting geolocation");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setAddress("Geolocation not supported");
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setCustomLocation(suggestion);
    setSuggestions([]);
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const res = await fetch(`http://localhost:8800/api/cart/remove/${itemId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error("Failed to remove item from cart");
      }
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error: any) {
      setError(error.message || "Error removing item from cart");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && !cartItems.length) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  if (!cartItems.length) {
    return  <div className="flex items-center justify-center h-10 bg-red-800">
              <h1 className="text-white text-center">No items in your cart.</h1>
            </div>;
  }

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cartItems.map((item) => (
          <div className="flex items-center justify-between mb-4" key={item.id}>
            <Image src={item.product.image} alt={item.product.title} width={100} height={100} />
            <div>
              <h1 className="uppercase text-xl font-bold">{item.product.title}</h1>
              <span>Quantity: {item.quantity}</span>
            </div>
            <h2 className="font-bold">${Number(item.product.price).toFixed(2)}</h2>
            <span className="cursor-pointer" onClick={() => removeFromCart(item.id)}>X</span>
          </div>
        ))}
      </div>
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="mb-4">
          <h3 className="font-bold">Your Location</h3>
          <input
            type="text"
            value={customLocation}
            onChange={handleInputChange}
            placeholder="Enter a location"
            className="p-2 border border-gray-300 rounded w-full"
          />
          {suggestions.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded mt-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleGeolocation} className="mt-2 mr-5 bg-blue-500 text-white p-2 rounded">
            Use my current location
          </button>
        </div>
        <div className="flex justify-between">
          <span>Subtotal ({cartItems.length} items)</span>
          <span>${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage