import React from "react";
import Image from "next/image";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-bgreen text-white p-6 mt-10  bottom-0 w-full ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          {/* Logo Section */}
          <div className="relative w-[84px] h-[84px] rounded-xl">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/90 rounded-full z-0" />
            <Image
              src="/images/logo.png"
              alt="school Logo"
              className=" opacity-80 transition-opacity rounded-full duration-300"
              width={84}
              height={84}
            />
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold wmb-3">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="text-white text-sm hover:text-blue transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="text-white text-sm hover:text-forest transition-colors"
              >
                About
              </Link>
            </li>
           
            <li>
              <Link
                href="/contact"
                className="text-white text-sm hover:text-forest transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Find Us Section */}
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-3">Find Us</h3>
          <div className="flex space-x-4">
            <a href="" target="_blank" rel="noopener noreferrer">
              <Image
                src="/icons/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/twitter.png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Image
                src="/icons/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://wa.me/254722688316"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/whatsapp.png"
                alt="WhatsApp"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Separator Line and Copyright Notice */}
      <div className="border-t border-white mt-6 pt-4">
        <div className="container mx-auto text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} SereneScope. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
