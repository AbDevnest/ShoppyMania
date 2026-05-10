"use client";

import { FaBars, FaShoppingCart, FaUser, FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  const items = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/product" },
    { name: "Contact", href: "/contact" },
  ];

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

  // 🔥 OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

      if (
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, profileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-3 lg:py-4 px-2">
        <Link href="/" className="shrink-0" aria-label="ShoppyMania home">
          <Image
            src="/images/Mainlogo.png"
            width={140}
            height={58}
            alt="ShoppyMania logo"
            priority
            className="h-10 w-auto object-contain sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-gray-50 p-1 shadow-inner lg:flex">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-[#f59e0b] text-white shadow-md"
                    : "text-gray-700 hover:bg-amber-50 hover:text-[#37311d]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div ref={profileRef} className="relative hidden lg:block">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-amber-50"
                >
                  <FaUserCircle className="text-2xl text-[#37311d]" />
                  <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                    {user.name}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                    <p className="font-semibold text-[#37311d]">{user.name}</p>
                    <p className="mb-3 truncate text-xs text-gray-500">
                      {user.email}
                    </p>

                    <button
                      onClick={logout}
                      className="w-full rounded-lg px-3 py-2 text-left text-red-500 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#37311d] shadow-sm transition hover:bg-[#37311d] hover:text-white"
              >
                <FaUser className="text-inherit" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
          </div>

          {/* CART */}
          <Link
            href="/cart"
            aria-label="View cart"
            className="relative rounded-full p-2 transition hover:bg-amber-50"
          >
            <FaShoppingCart className="text-xl text-[#37311d]" />
            {totalQty > 0 && (
              <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-[#f59e0b] px-1.5 py-0.5 text-center text-xs text-white">
                {totalQty}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            className="rounded-full p-2 transition hover:bg-amber-50 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <FaBars className="text-xl text-[#37311d]" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <aside
          ref={sidebarRef}
          className="fixed right-0 top-0 z-50 flex h-dvh w-[70vw] max-w-sm flex-col bg-white shadow-2xl lg:hidden text-[#37311d]"
        >
          <div className="flex items-center justify-between border-b p-4">
            <Image
              src="/images/Mainlogo.png"
              width={150}
              height={60}
              alt="ShoppyMania logo"
              className="h-10 w-auto object-contain"
            />
            <button
              type="button"
              aria-label="Close menu"
              className="rounded-full p-2 hover:bg-amber-50"
              onClick={() => setOpen(false)}
            >
              <IoClose className="text-2xl text-[#37311d]" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <ul className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-[#f59e0b] text-white"
                          : "text-gray-700 hover:bg-amber-50 hover:text-[#d97706]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t bg-white p-4">
            {user ? (
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-3xl text-[#f59e0b]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm font-medium text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block rounded-lg bg-[#f59e0b] py-3 text-center font-semibold text-white"
              >
                Login / Signup
              </Link>
            )}

            <Link
              href="/cart"
              className="block rounded-lg border border-gray-200 py-3 text-center font-semibold transition hover:bg-gray-50"
            >
              View Cart ({totalQty})
            </Link>
          </div>
        </aside>
      )}
    </header>
  );
}
