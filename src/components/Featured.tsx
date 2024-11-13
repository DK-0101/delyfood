import React, { useEffect, useState } from "react";
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

const Featured = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const res = await fetch("http://localhost:8800/api/products");
          const data = await res.json();

          const featuredProducts = data.filter(
            (product: Product) => product.category === "Featured"
          );
          setProducts(featuredProducts);
        } catch (err) {
          console.error("Failed to fetch products:", err);
        }
      };

      fetchProducts();
    }
  }, [user]);

  const addToCart = async (productId: number) => {
    if (!user) return;

    try {
      const res = await fetch("http://localhost:8800/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add product to cart");
      }

      const cartItem = await res.json();
      console.log("Product added to cart:", cartItem);
    } catch (error: any) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  if (!user) {
    return <p className=" text-white bg-red-800">Você precisa estar logado para ver os produtos.</p>;
  }

  return (
    <div className="w-full overflow-x-scroll text-red-800">
      <div className="w-max flex">
        {products.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {item.image && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.description}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button
                className="bg-red-800 text-white p-2 rounded-md"
                onClick={() => addToCart(item.id)} // Chama a função addToCart
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
