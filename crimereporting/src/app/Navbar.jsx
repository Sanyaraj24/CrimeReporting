"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Dropdown from "./components/HomePage/Dropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-[#1E1E1E] shadow-lg border-b border-[#404040]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold font-serif text-[#FF3B30]">
            SafeStreet
          </Link>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex space-x-7">
            <Link 
              href="/" 
              className="text-lg text-white hover:text-[#FF3B30] transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/CrimeReportForm" 
              className="text-lg text-white hover:text-[#FF3B30] transition-colors"
            >
              Report Crime
            </Link>
            <Link 
              href="/CrimeFeed" 
              className="text-lg text-white hover:text-[#FF3B30] transition-colors"
            >
              Explore Crimes
            </Link>
            <Link 
              href="/LatestNews" 
              className="text-lg text-white hover:text-[#FF3B30] transition-colors"
            >
              Latest News
            </Link>
          </div>

          {/* Dropdown (Desktop) */}
          <div className="hidden md:flex items-center">
            <Dropdown/>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#FF3B30]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Expanded) */}
      {isOpen && (
        <div className="md:hidden bg-[#2A2A2A] border-t border-[#404040]">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              href="/" 
              className="block px-3 py-2 text-white hover:text-[#FF3B30]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/CrimeReportForm" 
              className="block px-3 py-2 text-white hover:text-[#FF3B30]"
              onClick={() => setIsOpen(false)}
            >
              Report Crime
            </Link>
            <Link 
              href="/CrimeFeed" 
              className="block px-3 py-2 text-white hover:text-[#FF3B30]"
              onClick={() => setIsOpen(false)}
            >
              Explore Crimes
            </Link>
            <Link 
              href="/LatestNews" 
              className="block px-3 py-2 text-white hover:text-[#FF3B30]"
              onClick={() => setIsOpen(false)}
            >
              Latest News
            </Link>
            <div className="px-3 py-2">
              <Dropdown mobile={true} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;