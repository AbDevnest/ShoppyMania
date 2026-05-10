"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import Hero from "../components/Hero";
import { formatPrice } from "@/app/lib/products";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const delivery = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total = subtotal + delivery;

  return (
    <div className="bg-gray-50 text-[#37311d] flex min-h-screen flex-col">
      <Hero page="cartHero" />

      <section className="flex-1 py-10">
        <div className="mx-auto w-full max-w-5xl px-6">

        {cart.length === 0 ? (

          /* 🔥 EMPTY STATE */
          <div className="text-center py-20">

            <Image
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty cart"
              width={160}
              height={160}
              className="w-40 mx-auto mb-6 opacity-80"
            />

            <h2 className="text-2xl font-bold mb-2">
              Your Cart is Empty
            </h2>

            <p className="mb-6 text-gray-600">
              Looks like you haven’t added anything yet.
            </p>

            <Link href="/product" className="bg-[#0f172a] text-white transition hover:bg-[#111827] inline-block rounded-lg px-6 py-2 font-semibold">
              Start Shopping
            </Link>
          </div>

        ) : (

          /* 🔥 CART ITEMS */
          <>
            <h2 className="text-2xl font-bold mb-6">Your Cart Items</h2>

            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 bg-white shadow-sm flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center md:justify-between"
                >

                  {/* LEFT */}
                  <div className="flex w-full min-w-0 items-center gap-4 md:w-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-semibold">{item.title}</h3>
                      {item.category && (
                        <p className="mt-1 text-xs capitalize text-gray-500">
                          {item.category}
                        </p>
                      )}
                      <p className="font-bold text-[#d97706]">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* CENTER */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="border border-gray-200 bg-white text-[#37311d] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white rounded px-3 py-1"
                    >
                      -
                    </button>

                    <span className="font-semibold">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="border border-gray-200 bg-white text-[#37311d] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white rounded px-3 py-1"
                    >
                      +
                    </button>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4">
                    <p className="font-bold">{formatPrice(item.price * item.qty)}</p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}

            </div>

            {/* 🔥 TOTAL + CTA */}
            <div className="border border-gray-200 bg-white shadow-sm mt-10 rounded-2xl p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">
                    {delivery ? formatPrice(delivery) : "Free"}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <Link
                  href="/checkout"
                  className="bg-[#0f172a] text-white transition hover:bg-[#111827] rounded-lg px-8 py-3 text-center text-lg font-semibold"
                >
                  Checkout
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="border border-gray-200 bg-white text-[#37311d] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white rounded-lg px-8 py-3 text-center font-semibold"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
        </div>
      </section>

    </div>
  );
}
