"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Cta from "@/components/Cta";
import Features from "@/components/Features";
import About from "@/components/About";
import Hero from "@/components/Hero";
import HorizontalCardMarquee from "@/components/Slider";
import TestimonialCarousel from "@/components/Testimnonials";

const HomepageHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      <Header isScrolled={isScrolled} toggleSidebar={toggleSidebar} />
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
      {/* Demo Content - Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-x-hidden">
        {/* Hero */}
        <Hero />
        {/* About Section */}
        <About />
        {/* Horizontal Card Marquee */}
        <HorizontalCardMarquee />
        {/* How It Works Section   */}
        {/* <Features /> */}
        {/* Testimonials Section */}
        {/* <TestimonialCarousel /> */}
        {/* How it work */}
        {/* <HowItWorks /> */}
        {/* Contact Section */}
        <Cta />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomepageHeader;
