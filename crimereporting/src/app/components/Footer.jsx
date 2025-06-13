import React from 'react'
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-[#B0B0B0] py-12 border-t border-[#404040]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1: About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About SafeStreet</h3>
          <p className="text-sm">
            A community-driven platform for reporting crimes and enhancing neighborhood safety. 
            Stay vigilant, stay protected.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-[#FF3B30] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/CrimeReportForm" className="hover:text-[#FF3B30] transition-colors">
                Report a Crime
              </Link>
            </li>
            <li>
              <Link href="/CrimeFeed" className="hover:text-[#FF3B30] transition-colors">
                Crime Reports
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#FF3B30] transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/ContactUs" className="hover:text-[#FF3B30] transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Emergency Contacts */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Emergency Contacts</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FF3B30]" /> 
              <span>Police: 100</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FF3B30]" /> 
              <span>Ambulance: 108</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#FF3B30]" /> 
              <span>support@safestreet.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-[#404040] mt-8 pt-6 text-center flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SafeStreet. All Rights Reserved.
        </p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <FaFacebook className="text-xl hover:text-[#FF3B30] transition-colors" />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter className="text-xl hover:text-[#FF3B30] transition-colors" />
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <FaInstagram className="text-xl hover:text-[#FF3B30] transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer