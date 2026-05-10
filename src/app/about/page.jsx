import Hero from "@/app/components/Hero";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const team = [
    {
      name: "Rohit Sharma",
      role: "CEO",
      image: "/images/Team1.jpg",
    },
    {
      name: "Kushal Verma",
      role: "Manager",
      image: "/images/Team3.jpg",
    },
    {
      name: "Abhishek",
      role: "Developer",
      image: "/images/Abhi.png",
    },
  ];
  return (
    <div className="bg-gray-50 text-[#37311d]">
      <Hero page="about" />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="block lg:hidden">
            <h2 className="text-2xl font-bold sm:text-3xl">Who We Are</h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              ShoppyMania is a next-gen ecommerce platform focused on
              delivering speed, quality, and affordability.
            </p>
            <p className="mt-4 text-gray-600">
              We blend technology with customer needs to create an effortless
              shopping journey.
            </p>
          </div>

          <Image
            src="/images/Story.webp"
            width={500}
            height={300}
            alt="ShoppyMania team preparing customer orders"
            className="h-auto w-full rounded-2xl shadow-lg"
          />

          <div className="hidden lg:block">
            <h2 className="text-3xl font-bold">Who We Are</h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              ShoppyMania is a next-gen ecommerce platform focused on
              delivering speed, quality, and affordability.
            </p>
            <p className="mt-4 text-gray-600">
              We blend technology with customer needs to create an effortless
              shopping journey.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Our Team</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-600">
              A dedicated team combining leadership, management, and development to deliver a smooth and reliable shopping experience.
            </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full shadow-lg">
                  <Image
                    src={member.image}
                    fill
                    sizes="160px"
                    alt={member.name}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover object-top"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>

                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#37311d] py-14 text-center text-[#f3f4f6] sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Join ShoppyMania Today</h2>
          <p className="mt-4 text-gray-400">
            Experience the future of shopping now.
          </p>

          <Link
            href="/product"
            className="bg-[#f59e0b] text-white transition hover:bg-[#d97706] mt-6 inline-block rounded-lg px-8 py-3 font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      </section>
      
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Our Offline Mart</h2>
            <p className="mt-6 text-gray-600">
              We also operate offline stores where customers can experience
              products physically before purchasing.
            </p>
          </div>

          <Image
            src="/images/Mart.png"
            width={500}
            height={400}
            alt="ShoppyMania offline store"
            className="h-auto w-full rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="bg-white py-16 text-center sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
          {[
            ["10K+", "Customers"],
            ["500+", "Products"],
            ["50+", "Cities"],
            ["24/7", "Support"],
          ].map(([value, label]) => (
            <div key={label}>
              <h3 className="text-3xl font-bold text-[#f59e0b]">{value}</h3>
              <p className="text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
