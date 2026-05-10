import Image from "next/image";
import Link from "next/link";

const heroContent = {
  home: {
    badge: "New Collection 2026",
    title: "Discover the Best Products for Your Lifestyle",
    highlight: "Best Products",
    description:
      "Shop quality products at fair prices with smooth delivery, secure payments, and simple returns.",
    primaryLabel: "Shop Now",
    primaryHref: "/product",
    secondaryLabel: "Learn More",
    secondaryHref: "/about",
    image:
      "/images/Hero1.avif",
    imageAlt: "Modern ecommerce products",
  },
  about: {
    badge: "About ShoppyMania",
    title: "Shopping Made Simple, Reliable, and Friendly",
    highlight: "Simple",
    description:
      "We are building ShoppyMania as a clean online store where customers can find useful products without confusion.",
    primaryLabel: "Explore Products",
    primaryHref: "/product",
    secondaryLabel: "Contact Us",
    secondaryHref: "/contact",
    image:
      "/images/Hero2.avif",
    imageAlt: "Customer shopping online",
  },
  product: {
    badge: "Our Products",
    title: "Find Everyday Products Picked for Real Use",
    highlight: "Everyday Products",
    description:
      "Browse fresh arrivals, useful essentials, and handpicked deals that fit daily needs and budgets.",
    primaryLabel: "View Collection",
    primaryHref: "/product#collection",
    secondaryLabel: "Need Help?",
    secondaryHref: "/contact",
    image:
      "/images/Hero3.avif",
    imageAlt: "Shopping bags and products",
  },
  contact: {
    badge: "Contact Us",
    title: "Questions, Orders, or Support? We Are Here",
    highlight: "We Are Here",
    description:
      "Reach the ShoppyMania team for product questions, order help, partnership queries, or feedback.",
    primaryLabel: "Send Message",
    primaryHref: "/contact#contact-form",
    secondaryLabel: "See Products",
    secondaryHref: "/product",
    image:
      "/images/Hero4.avif",
    imageAlt: "Support team helping a customer",
  },
  cartHero: {
    badge: "Your Cart • Secure Checkout",
    title: "Review Your Cart & Place Order",
    highlight: "Your Cart",
    description:
      "Check your selected items, update quantities, and place your order with secure payment and fast delivery.",
    primaryLabel: "Continue Shopping",
    primaryHref: "/product",
    secondaryLabel: "Go Home",
    secondaryHref: "/",
    image:
      "/images/Hero5.avif",
    imageAlt: "Shopping cart ecommerce",
  },
};

function getTitleParts(title, highlight) {
  if (!highlight || !title.includes(highlight)) {
    return [title, "", ""];
  }

  const [before, after] = title.split(highlight);
  return [before, highlight, after];
}

function Hero({ page = "home" }) {
  const content = heroContent[page] || heroContent.home;
  const [beforeTitle, highlightedTitle, afterTitle] = getTitleParts(
    content.title,
    content.highlight
  );

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <span className="mb-4 inline-block rounded-full bg-[#0f172a] px-4 py-1 text-xs font-semibold text-gray-100 sm:text-sm">
            {content.badge}
          </span>

          <h1 className="text-3xl font-bold leading-tight text-[#37311d] sm:text-4xl lg:text-5xl">
            {beforeTitle}
            {highlightedTitle && (
              <span className="text-[#f59e0b]">
                {highlightedTitle}
              </span>
            )}
            {afterTitle}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
            {content.description}
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href={content.primaryHref}
              className="rounded-lg bg-[#f59e0b] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#d97706] sm:px-8 sm:text-base"
            >
              {content.primaryLabel}
            </Link>
            <Link
              href={content.secondaryHref}
              className="rounded-lg border border-[#f59e0b] px-6 py-3 text-center text-sm font-semibold text-[#d97706] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white sm:px-8 sm:text-base"
            >
              {content.secondaryLabel}
            </Link>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-xl justify-center lg:justify-end">
          <Image
            src={content.image}
            alt={content.imageAlt}
            width={700}
            height={520}
            priority
            loading="eager"
            className="h-auto w-full max-w-md rounded-xl object-cover shadow-lg md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
