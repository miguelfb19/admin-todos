"use client";

import Image from "next/image";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { addProductToCart, substractProductFromCart } from "../actions/actions";

import { useRouter } from "next/navigation";
import type { Product } from "@/shop/data/products";

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  const router = useRouter();

  function onAddToCart() {
    addProductToCart(product.id);
    router.refresh();
  }

  function onRemoveItem() {
    substractProductFromCart(product.id);
    router.refresh();
  }

  return (
    <>
      {quantity > 0 && (
        <div className="flex items-center shadow rounded-lg w-full bg-gray-800 border-gray-100">
          {/* Product Image */}
          <div className="p-2">
            <Image
              width={200}
              height={200}
              className="rounded"
              src={product.image}
              alt={product.name}
            />
          </div>

          {/* Title */}
          <div className="px-5 pb-5 w-full flex flex-col mt-2">
            <a href="#">
              <h3 className="font-semibold text-xl tracking-tight text-white">
                {product.name} -{" "}
                <small className="text-sm">${product.price.toFixed(2)}</small>
              </h3>
            </a>

            {/* Price and Add to Cart */}
            <div className="flex flex-col items-start justify-between">
              <span className="text-white">Cantidad: {quantity}</span>
              <span className="font-bold text-white">
                Total: ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex p-5 items-center justify-center">
            <button
              onClick={onAddToCart}
              className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-80"
            >
              <IoAddCircleOutline size={25} />
            </button>
            <span className="text-2xl text-white mx-5">{quantity}</span>
            <button
              onClick={onRemoveItem}
              className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
            >
              <IoRemoveCircleOutline size={25} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
