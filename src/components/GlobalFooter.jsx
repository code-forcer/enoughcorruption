// components/Footer.jsx
"use client";

import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function GFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-400 text-center md:text-left">
  &copy; {new Date().getFullYear()}{" "}
  <a
    href="https://thisisnotnormal.social"
    className="text-yellow-500 underline hover:text-yellow-400"
    target="_blank"
    rel="noopener noreferrer"
  >
    thisisnotnormal.social
  </a>
  . Social opinion polling system. All rights reserved.
</p>


        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
