"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/app/components/Hero";
import ProductCard from "@/app/components/ProductCard";
import Testimonial from "./components/Testimonial";
import { getProducts } from "@/app/lib/products";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Delivery usually takes 2-5 business days depending on your location.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes, we provide Cash on Delivery in most cities across India.",
  },
  {
    q: "What is your return policy?",
    a: "You can return products within 7 days of delivery if unsatisfied.",
  },
  {
    q: "Are products genuine?",
    a: "Absolutely! We only sell verified and high-quality products.",
  },
  {
    q: "How can I track my order?",
    a: "Once shipped, you will receive a tracking link via email/SMS.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes, all transactions are secured with encrypted payment gateways.",
  },
];

const galleryData = [
  {
    id: 1,
    img: "/images/Mart.png",
    title: "Our Offline Store",
    desc: "Visit our physical store and explore products in real experience.",
  },
  {
    id: 2,
    img: "/images/Team.jpg",
    title: "Our Team",
    desc: "A passionate team working to deliver the best service.",
  },
  {
    id: 3,
    img: "/images/Founder.jpg",
    title: "Founder & Vision",
    desc: "Driven by innovation and commitment to excellence.",
  },
  {
    id: 4,
    img: "/images/Delivery_part.jpg",
    title: "Delivery Partners",
    desc: "Fast and reliable delivery network across cities.",
  },
];

const categories = [
  {
    id: 1,
    name: "Electronics",
    desc: "Mobiles, laptops, and daily tech",
    img: "/images/Cat2.png",
  },
  {
    id: 2,
    name: "Fashion",
    desc: "Style picks for every day",
    img: "/images/Cat1.png",
  },
  {
    id: 3,
    name: "Home",
    desc: "Furniture and home essentials",
    img: "/images/Cat3.png",
  },
  {
    id: 4,
    name: "Fitness",
    desc: "Sports and wellness gear",
    img: "/images/Cat4.png",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [productError, setProductError] = useState("");

  useEffect(() => {
    let ignore = false;

    getProducts({ limit: 8 })
      .then((data) => {
        if (!ignore) setProducts(data.products);
      })
      .catch(() => {
        if (!ignore) setProductError("Trending products load nahi ho paye.");
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="bg-gray-50 text-[#37311d]">
      <Hero page="home" />

      <section className="bg-[#0f172a] py-10 text-[#f3f4f6] sm:py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Flat 30% OFF on Electronics
            </h2>
            <p className="mt-2 text-gray-400">
              Limited time offer on top gadgets and accessories.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
            <span className="rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-[#0f172a] sm:text-base">
              Free Delivery above Rs. 499
            </span>
            <Link
              href="/product"
              className="rounded-lg bg-[#f59e0b] px-6 py-2 text-center font-semibold text-white transition hover:bg-[#d97706]"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Shop by <span className="text-[#f59e0b]">Category</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Find everything you need, all in one place.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 text-center sm:gap-8 lg:grid-cols-4">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center">
                <div className="border border-gray-200 bg-white shadow-sm flex h-36 w-36 items-center justify-center rounded-full md:h-40 md:w-40">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{cat.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{cat.desc}</p>
                <Link
                  href="/product"
                  className="mt-3 text-sm font-semibold text-[#d97706] hover:underline"
                >
                  Explore All
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Image
            src="/images/Story.webp"
            alt="ShoppyMania team packing online shopping orders"
            width={640}
            height={420}
            className="h-auto w-full rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold">
              The Story of <span className="text-[#f59e0b]">ShoppyMania</span>
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Founded with a vision to simplify online shopping, ShoppyMania
              started as a small idea and quickly evolved into a trusted
              platform. We believe in delivering quality products at affordable
              prices.
            </p>
            <p className="mt-4 text-gray-600">
              Today, thousands of customers rely on us for fast delivery, secure
              transactions, and a seamless shopping experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {[
            ["Fast Delivery", "Quick shipping across India within 2-5 days."],
            ["Secure Payments", "Safe checkout with trusted gateways."],
            ["Easy Returns", "Hassle-free return policy within 7 days."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">
            Trending <span className="text-[#f59e0b]">Products</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {productError && (
              <p className="col-span-full rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
                {productError}
              </p>
            )}

            {products.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                reviews={item.reviews}
                badge={item.category}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold">
              Quality Products
            </h3>
            <p className="mt-3 text-gray-600">
              We ensure top-notch quality products curated for everyday needs.
            </p>
          </div>

          <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold">Fast Delivery</h3>
            <p className="mt-3 text-gray-600">
              Lightning fast delivery to your doorstep across multiple cities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Verified Data", "Every product is normalized from DummyJSON."],
            [
              "Smart Cart",
              "New items stay separate, repeat items increase quantity.",
            ],
            ["Fast Support", "Order and product questions get quick replies."],
            ["Easy Checkout", "Clear totals before placing an order."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#37311d] py-14 text-center text-[#f3f4f6] sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Start Shopping with{" "}
            <span className="text-[#f59e0b]">ShoppyMania</span>
          </h2>
          <p className="mt-4">Best deals waiting for you</p>
          <Link
            href="/product"
            className="bg-[#f59e0b] text-white transition hover:bg-[#d97706] mt-6 inline-block rounded-lg px-8 py-3 font-semibold"
          >
            Explore Now
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Life at <span className="text-[#f59e0b]">ShoppyMania</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            A glimpse into our offline stores, dedicated team, and operations.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {galleryData.map((item) => (
              <div
                key={item.id}
                className="group relative h-[380px] overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white transition duration-500 group-hover:translate-y-0 sm:translate-y-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-200 opacity-100 transition duration-500 sm:opacity-0 sm:group-hover:opacity-100">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">
            Frequently Asked <span className="text-[#f59e0b]">Questions</span>
          </h2>

          <div className="mt-10 space-y-4">
            {faqs.map((item, index) => (
              <div
                key={item.q}
                className="border border-gray-200 bg-white shadow-sm overflow-hidden rounded-xl"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold"
                >
                  {item.q}
                  <span className="text-[#f59e0b]">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden px-5 transition-all duration-300 ${
                    activeIndex === index ? "max-h-40 py-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />
    </div>
  );
}
