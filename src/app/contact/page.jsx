"use client";

import { useState } from "react";
import Hero from "@/app/components/Hero";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";

    if (!form.email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email";
    }

    if (!form.phone) {
      err.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      err.phone = "Enter valid 10 digit number";
    }

    if (!form.city.trim()) err.city = "City is required";

    if (!form.message.trim()) {
      err.message = "Message required";
    } else if (form.message.length < 10) {
      err.message = "Min 10 characters required";
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("Message Sent Successfully");
    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-gray-50 text-[#37311d]">
      <Hero page="contact" />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 text-center md:grid-cols-3">
          {[
            [FaPhoneAlt, "+91 23425 43210"],
            [FaEnvelope, "support@shoppymania.com"],
            [FaMapMarkerAlt, "Jaipur, Rajasthan"],
          ].map(([Icon, text]) => (
            <div key={text} className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6">
              <Icon className="mx-auto mb-3 text-2xl text-[#f59e0b]" />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 bg-white shadow-sm space-y-5 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold">Send Message</h2>

            <FieldErrorInput
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              error={errors.name}
            />
            <FieldErrorInput
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              error={errors.email}
            />
            <FieldErrorInput
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              error={errors.phone}
            />
            <FieldErrorInput
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Your City"
              error={errors.city}
            />

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your Message"
                className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 w-full rounded-lg px-4 py-3"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <button className="bg-[#37311d] text-white transition hover:bg-[#292412] w-full rounded-lg py-3 font-semibold">
              Send Message
            </button>
          </form>

          <div className="border border-gray-200 bg-white shadow-sm h-[450px] w-full overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps?q=Jaipur,Rajasthan&output=embed"
              className="h-full w-full border-0"
              title="ShoppyMania Jaipur map"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Why Contact Us?</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              ["24/7 Support", "We are always available."],
              ["Quick Response", "We reply within minutes."],
              ["Customer First", "Your satisfaction matters."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}

function FieldErrorInput({ name, value, onChange, placeholder, error }) {
  return (
    <div>
      <input
        type={name === "email" ? "email" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 w-full rounded-lg px-4 py-3"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
