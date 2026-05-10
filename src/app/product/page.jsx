"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch, FaSlidersH, FaTags } from "react-icons/fa";
import Hero from "@/app/components/Hero";
import ProductCard from "@/app/components/ProductCard";
import { formatPrice, getCategories, getProducts } from "@/app/lib/products";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const productRef = useRef(null);

  const loadProducts = async (category = "all") => {
    setLoading(true);
    setError("");

    try {
      const productData = await getProducts({ category, limit: 100 });
      setProducts(productData.products);
    } catch {
      setError("Products Not loading , Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function loadInitialData() {
      setLoading(true);
      setError("");

      try {
        const [categoryList, productData] = await Promise.all([
          getCategories(),
          getProducts({ limit: 100 }),
        ]);

        if (ignore) return;
        setCategories(categoryList);
        setProducts(productData.products);
      } catch {
        if (!ignore) setError("Products Not loading , Please refresh.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadInitialData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCategory = async (cat) => {
    setActiveCat(cat);
    setSearch("");

    try {
      await loadProducts(cat);
      productRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch {
      setError("Category products Not Available");
    }
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    let nextProducts = products.filter((product) => {
      const matchesQuery =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
      const matchesStock = !inStockOnly || product.stock > 0;

      return matchesQuery && matchesStock;
    });

    nextProducts = [...nextProducts].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount")
        return b.discountPercentage - a.discountPercentage;
      return (
        b.rating +
        b.discountPercentage / 100 -
        (a.rating + a.discountPercentage / 100)
      );
    });

    return nextProducts;
  }, [inStockOnly, products, search, sortBy]);

  const trending = useMemo(
    () => products.filter((product) => product.rating >= 4.5).slice(0, 5),
    [products],
  );

  const topDeals = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 3),
    [products],
  );

  const activeCategoryName =
    activeCat === "all"
      ? "All Products"
      : categories.find((cat) => cat.slug === activeCat)?.name ||
        activeCat.replaceAll("-", " ");

  return (
    <div className="bg-gray-50 text-[#37311d]">
      <Hero page="product" />

      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 rounded-2xl bg-[#0f172a] p-5 text-[#f3f4f6] sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
          <div>
            <p className="text-sm font-semibold text-[#fbbf24]">
              Live deals from DummyJSON
            </p>
            <h2 className="mt-1 text-xl font-bold sm:text-2xl">
              Fresh collection, clean data, real cart behavior
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Products, categories, prices, stock, ratings, and images are
              normalized from the same API source.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              productRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#f59e0b] text-white transition hover:bg-[#d97706] rounded-lg px-5 py-3 font-semibold"
          >
            Browse Products
          </button>
        </div>
        </div>

      </section>

      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <div className="border border-gray-200 bg-white shadow-sm overflow-hidden rounded-2xl">
                <div className="bg-[#0f172a] text-[#f3f4f6] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaTags className="text-[#fbbf24]" />
                      <h2 className="font-bold">Categories</h2>
                    </div>
                    <span className="text-xs text-gray-300">
                      {categories.length} types
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-300">
                    Pick a category to refresh the collection.
                  </p>
                </div>

                <div className="max-h-[calc(100vh-220px)] space-y-2 overflow-y-auto p-4">
                  <CategoryButton
                    active={activeCat === "all"}
                    label="All Products"
                    onClick={() => handleCategory("all")}
                  />

                  {categories.map((cat) => (
                    <CategoryButton
                      key={cat.slug}
                      active={activeCat === cat.slug}
                      label={cat.name}
                      onClick={() => handleCategory(cat.slug)}
                    />
                  ))}
                </div>
              </div>
            </aside>

            <main className="space-y-10">
              <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-4">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-gray-900">
                    <FaSlidersH className="text-[#f59e0b]" />
                    <h2 className="font-bold">Find the right product</h2>
                  </div>
                  <span className="text-sm font-medium capitalize text-[#d97706]">
                    {activeCategoryName}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_180px] xl:grid-cols-[1fr_180px_150px]">
                  <label className="relative block">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search product, category, brand..."
                      className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 w-full rounded-lg px-11 py-2 text-sm"
                    />
                  </label>

                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="discount">Best Discount</option>
                  </select>

                  <label className="border border-gray-200 bg-white text-[#37311d] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(event) => setInStockOnly(event.target.checked)}
                      className="h-4 w-4 accent-[#f59e0b]"
                    />
                    In stock
                  </label>
                </div>
              </div>

              {topDeals.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Special Deals</h2>
                    <span className="text-sm text-gray-500">
                      Highest discounts
                    </span>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {topDeals.map((product) => (
                      <div
                        key={product.id}
                        className="group relative h-56 overflow-hidden rounded-2xl bg-white shadow-sm"
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-black/45 p-4 text-white">
                          <span className="mb-2 w-fit rounded-full bg-[#f59e0b] px-3 py-1 text-xs font-semibold">
                            {Math.round(product.discountPercentage)}% off
                          </span>
                          <h3 className="font-semibold">{product.title}</h3>
                          <p className="font-bold text-amber-100">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-4 lg:hidden">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FaTags className="text-[#f59e0b]" />
                    <h2 className="font-bold">Shop by category</h2>
                  </div>
                  <span className="shrink-0 text-xs text-gray-500">
                    {categories.length} types
                  </span>
                </div>

                <div className="-mx-4 overflow-x-auto px-4 pb-1">
                  <div className="flex w-max gap-2">
                    <CategoryChip
                      active={activeCat === "all"}
                      label="All Products"
                      onClick={() => handleCategory("all")}
                    />

                    {categories.map((cat) => (
                      <CategoryChip
                        key={cat.slug}
                        active={activeCat === cat.slug}
                        label={cat.name}
                        onClick={() => handleCategory(cat.slug)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div ref={productRef} id="collection">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold capitalize">
                      {activeCat === "all"
                        ? "All Products"
                        : activeCat.replaceAll("-", " ")}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {filteredProducts.length} of {products.length} products
                      ready to shop
                    </p>
                  </div>
                  {(search || inStockOnly || sortBy !== "featured") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSortBy("featured");
                        setInStockOnly(false);
                      }}
                      className="text-sm font-semibold text-[#d97706] hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                {error && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="h-80 animate-pulse rounded-2xl bg-gray-200"
                      />
                    ))}
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        rating={product.rating}
                        reviews={product.reviews}
                        badge={
                          product.stock < 20 ? "Low Stock" : product.category
                        }
                        category={product.category}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-10 text-center">
                    <h3 className="text-xl font-bold">No products found</h3>
                    <p className="mt-2 text-gray-600">
                      Try a different search, category, or sorting option.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSortBy("featured");
                        setInStockOnly(false);
                      }}
                      className="bg-[#0f172a] text-white transition hover:bg-[#111827] mt-5 rounded-lg px-6 py-3 font-semibold"
                    >
                      Reset Search
                    </button>
                  </div>
                )}
              </div>

              {trending.length > 0 && (
                <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6">
                  <h2 className="text-xl font-bold">Trending Now</h2>
                  <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-5">
                    {trending.map((product) => (
                      <div key={product.id} className="min-w-0 text-center">
                        <div className="relative h-32 overflow-hidden rounded-lg bg-gray-50">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(min-width: 768px) 20vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                        <p className="mt-2 truncate text-sm font-medium">
                          {product.title}
                        </p>
                        <p className="text-sm font-bold text-[#d97706]">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                
              )}

                            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                {[
                  ["Free Delivery", "Above Rs. 499"],
                  ["Secure Payment", "Protected checkout"],
                  ["Easy Returns", "Policy from API"],
                  ["Stock Aware", "Live stock fields"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="border border-gray-200 bg-white shadow-sm rounded-xl p-4"
                  >
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="mt-1 text-xs text-gray-500">{text}</p>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium capitalize transition ${
        active
          ? "bg-[#f59e0b] text-white shadow-sm"
          : "text-gray-700 hover:bg-amber-50 hover:text-[#d97706]"
      }`}
    >
      {label}
    </button>
  );
}

function CategoryChip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${
        active
          ? "border-[#f59e0b] bg-[#f59e0b] text-white"
          : "border-gray-200 bg-white text-gray-700 hover:border-amber-200 hover:bg-amber-50 hover:text-[#d97706]"
      }`}
    >
      {label}
    </button>
  );
}
