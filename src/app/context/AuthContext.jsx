"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const AuthContext = createContext();
const USER_KEY = "user";
const USER_EVENT = "shoppymania:user";
let userCacheKey = null;
let userCacheValue = null;

function getStoredUser() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);
  if (raw === userCacheKey) return userCacheValue;

  try {
    userCacheValue = raw ? JSON.parse(raw) : null;
  } catch {
    userCacheValue = null;
  }

  userCacheKey = raw;
  return userCacheValue;
}

function subscribeToUser(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(USER_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(USER_EVENT, callback);
  };
}

function saveUser(userData) {
  const raw = JSON.stringify(userData);
  userCacheKey = raw;
  userCacheValue = userData;
  localStorage.setItem(USER_KEY, raw);
  window.dispatchEvent(new Event(USER_EVENT));
}

function clearUser() {
  userCacheKey = null;
  userCacheValue = null;
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(USER_EVENT));
}

export const AuthProvider = ({ children }) => {
  const user = useSyncExternalStore(subscribeToUser, getStoredUser, () => null);

  // Login
  const login = (name, email) => {
    saveUser({ name, email });
  };

  // Logout
  const logout = () => {
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
