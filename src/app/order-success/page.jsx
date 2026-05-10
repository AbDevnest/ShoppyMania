"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { formatPrice } from "@/app/lib/products";

const ORDER_KEY = "lastOrder";
let orderCacheKey = null;
let orderCacheValue = null;

function subscribeToOrder(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredOrder() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(ORDER_KEY);
  if (raw === orderCacheKey) return orderCacheValue;

  try {
    orderCacheValue = raw ? JSON.parse(raw) : null;
  } catch {
    orderCacheValue = null;
  }

  orderCacheKey = raw;
  return orderCacheValue;
}

export default function OrderSuccessPage() {
  const order = useSyncExternalStore(subscribeToOrder, getStoredOrder, () => null);

  return (
    <section className="bg-gray-50 text-[#37311d] py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-8 text-center">
          <FaCheckCircle className="mx-auto text-5xl text-green-500" />
          <h1 className="mt-5 text-3xl font-bold">Order Placed Successfully</h1>
          <p className="mt-3 text-gray-600">
            Thanks for shopping with ShoppyMania. Your order is confirmed.
          </p>

          {order && (
            <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-bold">{order.id}</span>
              </div>
              <div className="mt-3 flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-bold">{formatPrice(order.total)}</span>
              </div>
              <div className="mt-3 flex justify-between">
                <span className="text-gray-600">Payment</span>
                <span className="font-bold uppercase">{order.customer.payment}</span>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/product"
              className="bg-[#0f172a] text-white transition hover:bg-[#111827] rounded-lg px-6 py-3 font-semibold"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="border border-gray-200 bg-white text-[#37311d] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white rounded-lg px-6 py-3 font-semibold"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
