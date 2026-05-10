"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/app/context/ToastContext";
import { formatPrice } from "@/app/lib/products";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  payment: "cod",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { showToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart]
  );
  const delivery = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total = subtotal + delivery;

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Valid email required";
    if (!/^[0-9]{10}$/.test(form.phone)) nextErrors.phone = "10 digit phone required";
    if (form.address.trim().length < 10) nextErrors.address = "Full address required";
    if (!form.city.trim()) nextErrors.city = "City is required";
    if (!/^[0-9]{6}$/.test(form.pincode)) nextErrors.pincode = "6 digit pincode required";
    return nextErrors;
  };

  const placeOrder = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix checkout form errors", "error");
      return;
    }

    const order = {
      id: `SM-${Date.now().toString().slice(-6)}`,
      customer: form,
      items: cart,
      subtotal,
      delivery,
      total,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    clearCart();
    showToast("Order placed successfully");
    router.push("/order-success");
  };

  if (cart.length === 0) {
    return (
      <section className="bg-gray-50 text-[#37311d] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-gray-600">
            Add a few products before starting checkout.
          </p>
          <Link
            href="/product"
            className="bg-[#0f172a] text-white transition hover:bg-[#111827] mt-6 inline-block rounded-lg px-6 py-3 font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="bg-gray-50 text-[#37311d] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="mt-2 text-gray-600">
              Confirm your delivery details and review your order.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <form
              onSubmit={placeOrder}
              className="border border-gray-200 bg-white shadow-sm space-y-5 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold">Delivery Details</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <CheckoutField
                  name="name"
                  label="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <CheckoutField
                  name="email"
                  label="Email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <CheckoutField
                  name="phone"
                  label="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <CheckoutField
                  name="city"
                  label="City"
                  value={form.city}
                  onChange={handleChange}
                  error={errors.city}
                />
                <CheckoutField
                  name="pincode"
                  label="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  error={errors.pincode}
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Address</span>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="4"
                  className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 w-full rounded-lg px-4 py-3"
                />
                {errors.address && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.address}
                  </span>
                )}
              </label>

              <div>
                <h3 className="mb-3 text-sm font-semibold">Payment Method</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["cod", "Cash on Delivery"],
                    ["upi", "UPI on Delivery"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="border border-gray-200 bg-white text-[#37311d] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white flex items-center gap-3 rounded-lg p-4"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={value}
                        checked={form.payment === value}
                        onChange={handleChange}
                        className="accent-[#f59e0b]"
                      />
                      <span className="font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="bg-[#0f172a] text-white transition hover:bg-[#111827] w-full rounded-lg px-6 py-3 font-semibold">
                Place Order
              </button>
            </form>

            <aside className="border border-gray-200 bg-white shadow-sm h-fit rounded-2xl p-6">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-5 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-bold">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t pt-5 text-sm">
                <SummaryLine label="Subtotal" value={formatPrice(subtotal)} />
                <SummaryLine
                  label="Delivery"
                  value={delivery ? formatPrice(delivery) : "Free"}
                />
                <SummaryLine label="Total" value={formatPrice(total)} strong />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckoutField({ name, label, value, onChange, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 w-full rounded-lg px-4 py-3"
      />
      {error && <span className="mt-1 block text-sm text-red-500">{error}</span>}
    </label>
  );
}

function SummaryLine({ label, value, strong }) {
  return (
    <div className={`flex justify-between ${strong ? "text-lg font-bold" : ""}`}>
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
