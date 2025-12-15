"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { FaVoteYea } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("🎉 " + data.message);
        
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Reset form
        setFormData({
          email: "",
          password: ""
        });

        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);

      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
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
  Welcome Back
</h1>
<p className="text-lg text-gray-300 max-w-2xl mx-auto">
  Access portal to manage polls or continue to vote and view live results.
</p>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/95">
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-12">
          {/* Login Form */}
          <div className="bg-white/5 rounded-1xl border border-white/10 p-8 shadow-xl shadow-blue-500/10 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Log in to Your Account
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
             <code className="text-red-600">If Admin?</code> Email Address
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

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                 <code className="text-red-600">If Admin?</code> Password
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
                    disabled={loading}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <code className="text-green-500 font-bold text-lg">IF NOT ADMIN:</code>
{/* Visitor CTA */}
<button
  type="button"
  onClick={() => {
    window.location.href = "/dashboard";
  }}
  className="w-full mb-4 py-3 flex items-center justify-center gap-3 
             bg-white text-black rounded-lg font-bold text-lg
             shadow-lg hover:bg-gray-100 transition-all"
>

  <FaVoteYea className="w-5 h-5" />
  Vote & View Results
</button>
<hr className="text-white" />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-bold text-white text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>

            <p className="mt-6 text-gray-400 text-center">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-400 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>

            {/* Social login */}
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

      {/* CTA SECTION */}
      <Cta />
      <Footer />
    </>
  );
}