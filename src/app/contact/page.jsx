"use client";
import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import { FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL =
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/contact`;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!form.name || !form.email || !form.message) {
      toast.warning("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(API_URL, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data?.ok) {
        toast.success(data.message || "Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data?.error || "Failed to send message."
        );
      } else if (error.request) {
        toast.error("Server unreachable. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions, need support, or want to collaborate? We’re
            here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/95">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 shadow-xl shadow-blue-500/10 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  type="text"
                  className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  type="email"
                  className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Write your message..."
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-bold text-white text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Support
              </h3>
              <p className="text-gray-300">
                Technical or account issues? Our support team is
                ready.
              </p>
              <p className="mt-2 text-blue-400 font-semibold">
                <a href="mailto:support@thisisnotnormal.social">support@thisisnotnormal.social</a>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Partnerships
              </h3>
              <p className="text-gray-300">
                Collaborate with This Is Not Normal on campaigns or
                integrations.
              </p>
              <p className="mt-2 text-blue-400 font-semibold">
                <a href="mailto:partners@thisisnotnormal.social">partners@thisisnotnormal.social</a>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Business Enquiries
              </h3>
              <p className="text-gray-300">
                Sponsorships, media, or enterprise solutions.
              </p>
              <p className="mt-2 text-blue-400 font-semibold">
                <a href="mailto:business@thisisnotnormal.social">business@thisisnotnormal.social</a>
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-2xl font-bold text-white mb-3">
                Follow Us
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
                >
                  <FaXTwitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-500 transition"
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
      <Footer />

      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}
