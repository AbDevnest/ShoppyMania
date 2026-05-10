export const DUMMYJSON_BASE_URL = "https://dummyjson.com";
export const INR_RATE = 85;

export function formatPrice(price) {
  return `Rs. ${Math.round(Number(price || 0)).toLocaleString("en-IN")}`;
}

export function toInrPrice(price) {
  return Math.round(Number(price || 0) * INR_RATE);
}

export function mapDummyProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description || "",
    category: product.category || "general",
    brand: product.brand || "ShoppyMania",
    price: toInrPrice(product.price),
    originalPrice: toInrPrice(
      product.price / (1 - Number(product.discountPercentage || 0) / 100)
    ),
    discountPercentage: Number(product.discountPercentage || 0),
    rating: Number(product.rating || 0),
    reviews: Number(product.reviews?.length || product.stock || 0),
    stock: Number(product.stock || 0),
    sku: product.sku || `SM-${product.id}`,
    image: product.thumbnail,
    images: Array.isArray(product.images) ? product.images : [product.thumbnail],
    warrantyInformation: product.warrantyInformation || "Standard warranty",
    shippingInformation: product.shippingInformation || "Fast delivery available",
    returnPolicy: product.returnPolicy || "Easy returns available",
  };
}

export function mapCategory(category) {
  if (typeof category === "string") {
    return { slug: category, name: titleCase(category), url: "" };
  }

  return {
    slug: category.slug,
    name: category.name || titleCase(category.slug),
    url: category.url || `${DUMMYJSON_BASE_URL}/products/category/${category.slug}`,
  };
}

export async function getProducts({ category = "all", limit = 100 } = {}) {
  const endpoint =
    category === "all"
      ? `${DUMMYJSON_BASE_URL}/products?limit=${limit}`
      : `${DUMMYJSON_BASE_URL}/products/category/${category}?limit=${limit}`;

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Products could not be loaded");

  const data = await res.json();
  return {
    products: (data.products || []).map(mapDummyProduct),
    total: data.total || data.products?.length || 0,
  };
}

export async function getCategories() {
  const res = await fetch(`${DUMMYJSON_BASE_URL}/products/categories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Categories could not be loaded");

  const data = await res.json();
  return (data || []).map(mapCategory);
}

export async function getProductById(id) {
  const res = await fetch(`${DUMMYJSON_BASE_URL}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Product could not be loaded");

  return mapDummyProduct(await res.json());
}

function titleCase(value = "") {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
