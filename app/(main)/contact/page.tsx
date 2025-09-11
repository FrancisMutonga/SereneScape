"use client";
import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    error: "",
    success: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ error: "", success: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus({ error: "", success: "Your message has been sent ✅" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const data = await res.json();
        setFormStatus({
          error: data.error || "Failed to send message ❌",
          success: "",
        });
      }
    } catch {
      setFormStatus({ error: "Network error ❌", success: "" });
    }
  };

  return (
    <div className="mx-aut0 px-3 py-8 mt-20">
      {/* Contact Form Section */}
      <section className="mb-12">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-bgreen text-center  mb-8">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form
            className="bg-bgreen p-8 space-y-8 rounded-xl shadow-lg"
            onSubmit={handleSubmit}
          >
            <h3 className="text-lg font-bold text-white text-left">
              Write us a Message
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Fields */}
              <div className="flex flex-col">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-white" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-white" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col mb-6">
              <label className="text-sm font-bold text-white" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-lg py-3 text-white border border-bgold  hover:bg-bgold rounded-full"
            >
              Submit
            </button>

            {/* Status Messages */}
            {formStatus.error && (
              <p className="text-red-500 mt-4">{formStatus.error}</p>
            )}
            {formStatus.success && (
              <p className="text-green-500 mt-4">{formStatus.success}</p>
            )}
          </form>

          {/* Contact Info Card */}
          <div className="bg-[url('/images/contact1.jpg')] bg-cover bg-center p-4 space-y-12 items-center rounded-lg shadow-lg flex items-center justify-center">
            <div className="bg-black/60 p-6 rounded-xl  ">
              <h3 className="text-2xl text-white font-bold text-left mb-6">
                Our Contact Information
              </h3>
              <div className="space-y-4 text-white">
                <div className="flex items-center">
                  <FaPhoneAlt className="text-white mr-4" />
                  <span className="text-lg">0755944533</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-white mr-4" />
                  <span className="text-lg">
                   info@gmail.com
                  </span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-white mr-4" />

                  <span>kajiado</span>
                </div>
                <div className="flex gap-12 items-center text-xl">
                  <a
                    href="https:"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="text-white hover:text-blue-800" />
                  </a>
                  <a
                    href="https:/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="text-white hover:text-blue-600" />
                  </a>
                  <a
                    href="https:/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-white hover:text-blue-900" />
                  </a>
                  <a
                    href="https:"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTiktok className="text-white hover:text-blue-900" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Location with Google Maps */}
          <div className="flex flex-col gap-6 p-6">
            <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-bgreen mb-3">
              Visit Us
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg text-white shadow-lg">
              {/* Main Showroom */}
              <div className="w-full">
                <h4 className="text-xl font-bold text-bgreen mb-3 text-center md:text-left">
                  Main Showroom
                </h4>
                <div className="relative w-full h-72">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19988.42123075205!2d36.7742796!3d-1.8420731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182fc559d2acbce5%3A0x0!2sKajiado%2C%20Kenya!5e0!3m2!1sen!2ske!4v0!5m2!1sen!2ske"
                    allowFullScreen
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
