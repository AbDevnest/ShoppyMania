"use client";
import { createContext, useContext, useSyncExternalStore } from "react";

const CartContext = createContext();
const CART_KEY = "cart";
const CART_EVENT = "shoppymania:cart";
const EMPTY_CART = [];
let cartCacheKey = null;
let cartCacheValue = [];

function getStoredCart() {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(CART_KEY) || "[]";
  if (raw === cartCacheKey) return cartCacheValue;

  try {
    cartCacheValue = JSON.parse(raw) || [];
  } catch {
    cartCacheValue = [];
  }

  cartCacheKey = raw;
  return cartCacheValue;
}

function subscribeToCart(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_EVENT, callback);
  };
}

function saveCart(nextCart) {
  const normalizedCart = nextCart.filter((item) => item.id !== undefined);
  const raw = JSON.stringify(normalizedCart);
  cartCacheKey = raw;
  cartCacheValue = normalizedCart;
  localStorage.setItem(CART_KEY, raw);
  window.dispatchEvent(new Event(CART_EVENT));
}

export const CartProvider = ({ children }) => {
  const cart = useSyncExternalStore(
    subscribeToCart,
    getStoredCart,
    () => EMPTY_CART
  );

  // ADD
  const addToCart = (product) => {
    if (product.id === undefined) return;

    const currentCart = getStoredCart();
    const productId = Number(product.id);
    const quantity = Math.max(1, Number(product.qty || 1));
    const exist = currentCart.find((item) => Number(item.id) === productId);

    if (exist) {
      saveCart(
        currentCart.map((item) =>
          Number(item.id) === productId
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      );
      return;
    }

    saveCart([...currentCart, { ...product, id: productId, qty: quantity }]);
  };

  // REMOVE
  const removeFromCart = (id) => {
    saveCart(getStoredCart().filter((item) => Number(item.id) !== Number(id)));
  };

  // INCREASE
  const increaseQty = (id) => {
    saveCart(
      getStoredCart().map((item) =>
        Number(item.id) === Number(id) ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (id) => {
    saveCart(
      getStoredCart().map((item) =>
        Number(item.id) === Number(id) && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
