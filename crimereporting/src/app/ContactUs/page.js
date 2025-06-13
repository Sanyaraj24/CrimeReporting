"use client";
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiPhone,
} from "react-icons/fi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for your message! We'll respond shortly.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            Contact SafeStreet
          </h2>
          <div className="w-20 h-1 bg-[#E74C3C] mx-auto"></div>
          <p className="mt-4 text-[#B0B0B0]">
            Have questions or need to report an issue? Reach out to our team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-[#B0B0B0]" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 w-full bg-[#1E1E1E] border border-[#404040] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-[#B0B0B0]" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full bg-[#1E1E1E] border border-[#404040] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
                required
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-4 left-3">
              <FiMessageSquare className="text-[#B0B0B0]" />
            </div>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              className="pl-10 w-full bg-[#1E1E1E] border border-[#404040] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C] min-h-[150px]"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#E74C3C] hover:bg-[#C0392B] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <FiSend />
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-12 border-t border-[#404040] pt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Other Ways to Reach Us
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#B0B0B0]">
            <div className="flex items-center gap-3">
              <FiPhone className="text-[#E74C3C]" />
              <span>Support: +1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-[#E74C3C]" />
              <span>Email: support@safestreet.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
