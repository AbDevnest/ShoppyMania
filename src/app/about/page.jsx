import Hero from "@/app/components/Hero";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
const team = [
  {
    name: "Rohit Sharma",
    role: "CEO",
    image: "/images/team1.jpg",
  },
  {
    name: "Kushal Verma",
    role: "Manager",
    image: "/images/team3.jpg",
  },
  {
    name: "Abhishek",
    role: "Full Stack Developer",
    image: "/images/Abhi.png",
  },
];
  return (
    <div className="bg-gray-50 text-[#37311d]">
      <Hero page="about" />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <Image
            src="/images/Story.webp"
            width={500}
            height={300}
            alt="ShoppyMania team preparing customer orders"
            className="rounded-2xl shadow-lg"
          />

          <div>
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

      <section className="bg-gray-50 py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mx-auto mt-6 max-w-3xl text-gray-600">
            To revolutionize online shopping by making it faster, smarter, and
            more reliable for everyone.
          </p>
        </div>
      </section>

<section className="bg-gray-50 py-20">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="text-center text-3xl font-bold">Our Team</h2>

    <div className="mt-12 grid gap-10 md:grid-cols-3">
      {team.map((member, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl p-6 text-center transition hover:shadow-xl hover:-translate-y-2"
        >
          <Image
            src={member.image}
            width={200}
            height={200}
            alt={member.name}
            className="mx-auto rounded-full object-cover object-top h-40 w-40 shadow-lg"
          />

          <h3 className="mt-4 font-semibold text-lg">
            {member.name}
          </h3>

          <p className="text-sm text-gray-500">
            {member.role}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="bg-[#37311d] text-[#f3f4f6] py-16 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Join ShoppyMania Today</h2>
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
      
      <section className="bg-gray-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Our Offline Mart</h2>
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
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="bg-white py-20 text-center">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
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
