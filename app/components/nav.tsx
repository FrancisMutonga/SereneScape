"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerLinkClick = () => {
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 200);
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full flex text-gray-800  p-4 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.4)] "
      style={{ fontFamily: "SegoeUI" }}
    >
      <div className="container mx-auto flex ml-4 justify-between items-center gap-2">
        <div className="flex items-center space-x-6 ">
          <Link href="/auth/signin">
            <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
          </Link>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-bgreen font-semibold">
          Serene Scape
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 mx-auto">
          <li>
            <Link
              href="/"
              className="text-lg font-semi text-bgreen hover:text-blue-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-lg font-semi text-bgreen hover:text-blue-900"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/properties"
              className="text-lg font-semi text-bgreen hover:text-blue-900"
            >
              Properties
            </Link>
          </li>
        
          <li>
            <Link
              href="/contact"
              className="text-lg font-semi text-bgreen hover:text-blue-900"
            >
              Contact
            </Link>
          </li>
        </ul>

       

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-2xl ml-4"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full bg-white/40 z-40 flex flex-col items-start p-6 space-y-4 shadow-lg w-1/3 transition-transform transform">
          <button
            onClick={handleDrawerLinkClick}
            className="self-end text-lg font-bold text-dark hover:text-blue-900 mb-4"
          >
            ✖
          </button>

          <Link
            href="/"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-bgreen hover:text-linkgreen"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-bgreen hover:text-linkgreen"
          >
            About
          </Link>
          <Link
            href="/properties"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-bgreen hover:text-linkgreen"
          >
            Properties
          </Link>
         

          <Link
            href="/contact"
            onClick={handleDrawerLinkClick}
            className="text-lg font-bold text-bgreen hover:text-linkgreen"
          >
            Contact
          </Link>

          </div>
      )}
    </nav>
  );
};

export default Navbar;
