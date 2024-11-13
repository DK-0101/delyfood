"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

const CategoryPage = () => {
  const pathname = usePathname();
  const category = pathname.split("/").pop();
  console.log("Current category:", category);
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:8800/api/products`);
        const data = await res.json();
        console.log("Fetched data:", data);

        const filteredProducts = data.filter(
          (product: Product) => product.category.toLowerCase() === category?.toLowerCase()
        );
        console.log("Filtered products:", filteredProducts);

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  const handleAddToCart = async (productId: number) => {
    if (!user || !user.id) {
      setError("You need to be logged in to add items to the cart.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8800/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add item to cart");
      }

      console.log(`Product ${productId} added to cart`);
      console.log("Item added to cart successfully!");
    } catch (error: any) {
      setError(error.message || "Error adding item to cart");
    }
  };

  return (
    <div className="flex flex-wrap ">
      {error && <div className="text-red-500">{error}</div>} {/* Exibir erro, se houver */}
      {products.length > 0 ? (
        products.map((item) => (
          <div
            className="w-full h-[60vh] border-r-2 border-b-2 border-red-800 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
            key={item.id}
          >
            {/* IMAGE CONTAINER */}
            {item.image && (
              <div className="relative h-[80%]">
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex items-center justify-between font-bold">
              <h1 className="text-2xl uppercase p-2">{item.title}</h1>
              <h2 className="group-hover:hidden text-xl">${item.price}</h2>
              <button
                className="hidden group-hover:block uppercase bg-red-800 text-white p-2 rounded-md"
                onClick={() => handleAddToCart(item.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
