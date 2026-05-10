"use client";

import Image from "next/image";
import Slider from "react-slick";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// 🔥 CUSTOM ARROWS
const NextArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Next testimonial"
    onClick={onClick}
    className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-3 text-[#d97706] shadow-lg transition hover:bg-[#f59e0b] hover:text-white md:block"
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Previous testimonial"
    onClick={onClick}
    className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-3 text-[#d97706] shadow-lg transition hover:bg-[#f59e0b] hover:text-white md:block"
  >
    <FaChevronLeft />
  </button>
);

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      img: "/images/Testi_1.jpg",
      review: "Amazing shopping experience! Delivery was super fast.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Priya Verma",
      img: "/images/Testi_2.jpg",
      review: "Loved the UI and smooth checkout process.",
      rating: 3.8,
    },
    {
      id: 3,
      name: "Amit Singh",
      img: "/images/Testi_3.jpg",
      review: "Customer support is excellent.",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Neha Jain",
      img: "/images/Testi_4.jpg",
      review: "Best prices and fast delivery.",
      rating: 4,
    },
    {
      id: 5,
      name: "Vikas Gupta",
      img: "/images/Testi_5.jpg",
      review: "Products are genuine and packaging was great.",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Sneha Kapoor",
      img: "/images/Testi_6.jpg",
      review: "Easy returns and smooth experience.",
      rating: 4.3,
    },
  ];

  // ⭐ STAR FUNCTION
  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-[#fbbf24]" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-[#fbbf24]" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="text-[#fbbf24]" />
        );
      }
    }

    return stars;
  };

  // 🔥 SLIDER SETTINGS (UPGRADED)
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    pauseOnHover: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { arrows: false, slidesToShow: 1 },
      },
      {
        breakpoint: 480,
        settings: { arrows: false, slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-20 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6">

        {/* 🔥 HEADING */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#37311d] md:text-4xl">
            What Our  <span className="text-[#f59e0b]">Customers</span> Say
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Real feedback from happy customers
          </p>
        </div>

        {/* 🔥 SLIDER */}
        <div className="testimonial-slider relative mt-10 md:mt-12">
          <Slider {...settings}>
            {testimonials.map((t) => (
              <div key={t.id} className="px-1.5 sm:px-3">

                {/* 🔥 CARD */}
                <div className="flex min-h-[260px] flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:shadow-xl sm:min-h-[190px] sm:flex-row sm:text-left">

                  {/* IMAGE */}
                  <div className="flex-shrink-0">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={90}
                      height={90}
                      className="h-20 w-20 rounded-full object-cover sm:h-28 sm:w-24 sm:rounded-xl"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1 ">

                    <h4 className="font-semibold text-[#37311d]">
                      {t.name}
                    </h4>

                    {/* ⭐ STARS */}
                    <div className="mt-2 flex items-center justify-center gap-1 text-sm sm:justify-start">
                      {renderStars(t.rating)}
                      <span className="text-gray-500 ml-2 text-xs">
                        ({t.rating})
                      </span>
                    </div>

                    <p className="testimonial-review mt-3 text-sm leading-6 text-gray-600 sm:min-h-auto min-h-18">
                      {t.review}
                    </p>

                  </div>

                </div>

              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
}
