"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { useAuth } from "../../context/AuthProvider";
import Spinner from "../../Spinner.js";

const Dropdown = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, googleSignIn, logOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [justSignedIn, setJustSignedIn] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      setJustSignedIn(true);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    const sendUserData = async () => {
      if (user && justSignedIn) {
        const userData = {
          id: user.uid,
          name: user.displayName || '',
          email: user.email,
          photo_url: user.photoURL || '',
          phone: user.phoneNumber || null,
          location: null,
          pincode: null,
        };

        try {
          await fetch("https://d1-tutorial.crimereporting.workers.dev/add-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
          setJustSignedIn(false);
        } catch (error) {
          console.error("Failed to send user data:", error);
        }
      }
    };

    sendUserData();
  }, [user, justSignedIn]);

  return (
    <div className={`relative ${mobile ? 'w-full' : 'inline-block'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
        type="button"
      >
        <HiMenu className={`w-8 h-8 cursor-pointer ${mobile ? 'text-white' : 'text-[#FF3B30]'}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 z-50 p-2 mt-2 bg-[#1E1E1E] divide-y divide-[#404040] rounded-lg shadow-lg w-44 text-white border border-[#404040] ${mobile ? 'w-full' : ''}`}>
          {loading ? (
            <div className="flex justify-center p-4">
              <Spinner />
            </div>
          ) : !user ? (
            <>
              <div
                className="px-4 py-3 text-sm hover:bg-[#2A2A2A] hover:text-[#FF3B30] rounded-md cursor-pointer transition-colors"
                onClick={handleSignIn}
              >
                Login / Sign Up
              </div>
              <ul className="py-2 text-sm">
                <li>
                  <Link
                    href="/ContactUs"
                    className="block px-4 py-2 hover:bg-[#2A2A2A] hover:text-[#FF3B30] rounded-md cursor-pointer transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Emergency"
                    className="block px-4 py-2 hover:bg-[#2A2A2A] hover:text-[#FF3B30] rounded-md cursor-pointer transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Emergency Assist
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-[#404040]">
                <p className="text-sm font-medium truncate">{user.email}</p>
              </div>
              <ul className="py-2 text-sm">
                <li>
                  <Link
                    href={`/User/${user?.uid}`}
                    className="block px-4 py-2 hover:bg-[#2A2A2A] hover:text-[#FF3B30] rounded-md cursor-pointer transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ContactUs"
                    className="block px-4 py-2 hover:bg-[#2A2A2A] hover:text-[#FF3B30] rounded-md cursor-pointer transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Emergency"
                    className="block px-4 py-2 hover:bg-[#2A2A2A] hover:text-[#FF3B30] rounded-md cursor-pointer transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Emergency Assist
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <div
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-[#2A2A2A] text-[#FF3B30] rounded-md cursor-pointer transition-colors"
                >
                  Sign Out
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;