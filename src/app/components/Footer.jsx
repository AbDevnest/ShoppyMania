import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";


function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Product", href: "/product" },
      ],
    },
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/product" },
        { label: "New Arrivals", href: "/product#collection" },
        { label: "Best Sellers", href: "/product#collection" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/contact" },
        { label: "Returns", href: "/contact" },
        { label: "Shipping", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0f172a] pt-16 text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 text-center md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link
            href="/"
            className="mx-auto flex w-fit items-center justify-center rounded-lg bg-white px-3 py-2"
          >
            <Image
              src="/images/Mainlogo.png"
              alt="ShoppyMania logo"
              width={120}
              height={50}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 text-sm leading-6">
            ShoppyMania is your simple destination for useful products, fair
            prices, fast delivery, and friendly support.
          </p>
        </div>

        {footerLinks.map((sec, index) => (
          <div key={index}>
            <h3 className="mb-4 text-lg font-semibold text-gray-100">
              {sec.title}
            </h3>
            <ul className="space-y-2">
              {sec.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="transition hover:text-[#fbbf24]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-100">
            Follow Us
          </h3>
          <div className="flex gap-4 items-center justify-center">
            <span className="cursor-pointer rounded-full bg-[#1f2937] p-2 transition hover:bg-[#f59e0b] hover:text-white">
              <FaFacebookF />
            </span>
            <span className="cursor-pointer rounded-full bg-[#1f2937] p-2 transition hover:bg-[#f59e0b] hover:text-white">
              <FaInstagram />
            </span>
            <span className="cursor-pointer rounded-full bg-[#1f2937] p-2 transition hover:bg-[#f59e0b] hover:text-white">
              <FaTwitter />
            </span>
            <span className="cursor-pointer rounded-full bg-[#1f2937] p-2 transition hover:bg-[#f59e0b] hover:text-white">
              <FaLinkedinIn />
            </span>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} ShoppyMania. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
