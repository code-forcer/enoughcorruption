"use client";
import React from "react";
import { FaHeart, FaRocket } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg w-10 h-10">
                <img src="/trump_logo.jpeg" alt="This Is Not Normal Logo" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  This Is Not Normal
                </h1>
                <p className="text-xs text-blue-300 sm:block">
                  Outrage, crowdsourced
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">

              This Is Not Normal is a new outlet for the expression of Outrage. A crowdsourced platform designed for instant insights, deeper audience engagement, and easy to read and share, real-time results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/#home" className="hover:text-blue-400">
                  -Home
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-blue-400">
                  -About
                </a>
              </li>
              {/* <li>
                <a href="/#features" className="hover:text-blue-400">
                  -Features
                </a>
              </li> */}
              <li>
                <a href="/#contact" className="hover:text-blue-400">
                  -Contact
                </a>
              </li>
            </ul>
          </div>

          {/* UWICL / Social Link Section */}
          <div>
            <h4 className="font-bold text-white mb-3">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <FaXTwitter className="w-4 h-4" />
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  className="hover:text-blue-400"
                >
                  Twitter
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram className="w-4 h-4" />
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="hover:text-blue-400"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaLinkedin className="w-4 h-4" />
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  className="hover:text-blue-400"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="text-blue-400">This Is Not Normal</span>  — All rights reserved.
            <br />
            Built with{" "}
            <FaHeart className="inline-block w-4 h-4 text-red-500 mx-1" /> for the people
          </p>
        </div>
      </div>
    </footer>
  );
}
