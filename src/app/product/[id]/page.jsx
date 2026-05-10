"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/app/context/ToastContext";
import { formatPrice, getProductById, getProducts } from "@/app/lib/products";
import ProductCard from "@/app/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await getProductById(id);
        if (ignore) return;
        setProduct(data);
        setActiveImage(data.images[0] || data.image);
        setQuantity(1);

        const relatedData = await getProducts({
          category: data.category,
          limit: 8,
        });
        if (!ignore) {
          setRelatedProducts(
            relatedData.products.filter((item) => item.id !== data.id).slice(0, 4)
          );
        }
      } catch {
        if (!ignore) setError("Product detail Not Loading.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  const highlights = useMemo(() => {
    if (!product) return [];

    return [
      product.shippingInformation,
      product.warrantyInformation,
      product.returnPolicy,
      `${product.stock} items in stock`,
    ];
  }, [product]);

  if (loading) {
    return (
      <section className="bg-gray-50 text-[#37311d] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="h-[420px] animate-pulse rounded-2xl bg-gray-200" />
            <div className="space-y-4">
              <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="bg-gray-50 text-[#37311d] py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-3 text-gray-600">
            {error || "Please try another item."}
          </p>
          <Link
            href="/product"
            className="bg-[#0f172a] text-white transition hover:bg-[#111827] mt-6 inline-block rounded-lg px-6 py-3 font-semibold"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="bg-gray-50 text-[#37311d] py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          <div>
          <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6">
            <Image
              src={activeImage || product.image}
              alt={product.title}
              width={620}
              height={520}
              priority
              className="h-[420px] w-full object-contain"
            />
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((image) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setActiveImage(image)}
                  className={`rounded-xl border bg-white p-2 ${
                    activeImage === image ? "border-[#f59e0b]" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} preview`}
                    width={120}
                    height={90}
                    className="h-20 w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
          </div>

          <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6">
          <p className="text-sm font-semibold capitalize text-[#f59e0b]">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#37311d]">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.round(product.rating)
                    ? "text-[#fbbf24]"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-sm text-gray-500">
              {product.rating.toFixed(1)} rating
            </span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-bold text-[#d97706]">
              {formatPrice(product.price)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="pb-1 text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          <p className="mt-5 leading-7 text-gray-600">{product.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="rounded-lg bg-amber-50 p-3 text-sm">
                {item}
              </div>
            ))}
          </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 items-center justify-between rounded-lg border sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="h-full px-4 text-lg font-bold"
                >
                  -
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="h-full px-4 text-lg font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart({ ...product, qty: quantity });
                  showToast(`${quantity} x ${product.title} added to cart`);
                }}
                className="bg-[#0f172a] text-white transition hover:bg-[#111827] flex-1 rounded-lg px-6 py-3 font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Related Products</h2>
                <p className="text-gray-600">
                  More picks from {product.category.replaceAll("-", " ")}.
                </p>
              </div>
              <Link
                href="/product"
                className="text-sm font-semibold text-[#d97706] hover:underline"
              >
                View all products
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  reviews={item.reviews}
                  badge={item.category}
                  category={item.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
