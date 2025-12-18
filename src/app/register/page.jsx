"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Cta from "@/components/Cta";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("🎉 " + data.message);
        
        // Store token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);

      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Join Us Today
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Create your account to start managing polls, engaging your audience,
            and leveraging AI-powered insights.
          </p>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/95">
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-12">
          {/* Registration Form */}
          <div className="bg-white/5 rounded-1xl border border-white/10 p-8 shadow-xl shadow-blue-500/10 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                    placeholder="Re-enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
                  >
                    {showConfirm ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-bold text-white text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-gray-400 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-400 font-semibold hover:underline"
              >
                Log In
              </a>
            </p>

            {/* Social registration */}
            <div className="mt-6 flex justify-center gap-6">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
              >
                <FaXTwitter className="w-5 h-5" />X
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
              >
                <FaInstagram className="w-5 h-5" />
                Instagram
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-500 transition"
              >
                <FaLinkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
      <Cta />
      <Footer />
    </>
  );
}