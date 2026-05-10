"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/app/context/ToastContext";
import { formatPrice } from "@/app/lib/products";

export default function ProductCard({
  id,
  title,
  image,
  price,
  rating = 4,
  reviews = 100,
  badge,
  category,
}) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = () => {
    addToCart({
      id,
      title,
      price,
      image,
      rating,
      category,
    });
    showToast(`${title} added to cart`);
  };

  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_55px_rgba(15,23,42,0.13)]">
      <div className="relative m-3 overflow-hidden rounded-2xl bg-slate-50">
        <Link href={`/product/${id}`} className="relative block h-48">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
          />
        </Link>

        {badge && (
          <span className="absolute left-3 top-3 max-w-[70%] truncate rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
            {badge}
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-500 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:text-slate-950"
        >
          <FaRegHeart />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-1">
        <Link href={`/product/${id}`}>
          <h3 className="line-clamp-2 min-h-[40px] text-[14px] font-semibold leading-5 text-slate-950 transition hover:text-slate-700">
            {title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 ring-1 ring-slate-100">
            <FaStar className="text-xs text-amber-400" />
            <span className="text-xs font-semibold text-slate-800">
              {Number(rating).toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">({reviews})</span>
          </div>

          {category && (
            <span className="max-w-[44%] truncate text-xs font-medium capitalize text-slate-500">
              {category}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Price
            </p>
            <p className="text-md font-bold leading-none text-slate-950">
            {formatPrice(price)}
            </p>
          </div>

          <Link
            href={`/product/${id}`}
            className="text-xs font-semibold text-slate-500 hover:text-slate-950"
          >
            Details
          </Link>
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#37311d] py-3 text-sm font-semibold text-white transition hover:bg-[#292412] active:scale-95"
        >
          <FaShoppingBag className="text-sm" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
