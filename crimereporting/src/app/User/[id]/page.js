"use client";

import {
  UserCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  MapPinIcon,
  CalendarIcon,
  PencilIcon,
  PhoneIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Spinner from "../../Spinner.js";
import EditProfileModal from "./EditProfile";
import Link from "next/link";

// Reusable Components
const DetailItem = ({ icon, title, children }) => (
  <div>
    <div className="flex items-center text-[#B0B0B0] mb-1">
      <span className="mr-2">{icon}</span>
      <span className="text-sm">{title}</span>
    </div>
    <div className="ml-7 font-medium text-white">{children}</div>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="bg-[#2A2A2A] p-3 rounded-lg border border-[#404040]">
    <div className="text-2xl font-bold text-[#FF3B30]">{value}</div>
    <div className="text-xs text-[#B0B0B0] mt-1">{label}</div>
  </div>
);

const ReportCard = ({ report }) => (
  <div className="p-6 hover:bg-[#2A2A2A] transition-colors border-b border-[#404040]">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0">
        <img
          src={report.image}
          alt="Crime scene"
          className="h-24 w-24 rounded-lg object-cover border border-[#404040]"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-white">{report.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              report.status === "Under Investigation"
                ? "bg-[#4F3A02] text-[#FFD700]"
                : "bg-[#1C3B1E] text-[#4ADE80]"
            }`}
          >
            {report.status}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <span className="flex items-center text-[#B0B0B0]">
            <CalendarIcon className="h-4 w-4 mr-1 text-[#FF3B30]" />
            {report.date}
          </span>
          <span className="flex items-center text-[#B0B0B0]">
            <ShieldCheckIcon className="h-4 w-4 mr-1 text-[#FF3B30]" />
            {report.crimeType}
          </span>
          <span className="flex items-center text-[#B0B0B0]">
            <ScaleIcon className="h-4 w-4 mr-1 text-[#FF3B30]" />
            {report.severity} severity
          </span>
        </div>
      </div>
    </div>
    <div className="mt-4 flex justify-end">
      <button className="text-sm text-[#FF3B30] hover:text-[#FF5E55] font-medium">
        View Details →
      </button>
    </div>
  </div>
);

// Dummy crime reports data
const userReports = [
  {
    id: 1042,
    title: "Armed Robbery at Central Jewelry Store",
    date: "2023-05-15",
    status: "Under Investigation",
    crimeType: "Robbery",
    severity: "High",
    image: "/criminal.jpg",
  },
  {
    id: 1041,
    title: "Vandalism in Public Park",
    date: "2023-04-22",
    status: "Case Closed",
    crimeType: "Vandalism",
    severity: "Medium",
    image: "/Jail.jpg",
  },
];

const page = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setLoading(false);
        setAuthChecked(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    const getUserDetails = async () => {
      try {
        const response = await fetch(
          `https://d1-tutorial.crimereporting.workers.dev/get-user?id=${user.uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setUserData(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };
    getUserDetails();
  }, [user]);

  const handleUpdate = async (updatedData) => {
    setUserData((prev) => ({ ...prev, ...updatedData }));
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user && authChecked) {
    return (
      <div className="p-8 text-center bg-[#121212] min-h-screen">
        <h2 className="text-xl font-semibold text-[#FF3B30]">
          Authentication Required
        </h2>
        <p className="mt-2 text-[#B0B0B0]">
          Please sign in to access your profile
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#121212] min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">User Profile</h1>
          <EditProfileModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            userInfo={userData}
            onUpdate={handleUpdate}
          />

          <button
            className="flex items-center gap-2 bg-[#FF3B30] hover:bg-[#E0352B] text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <PencilIcon className="h-5 w-5" />
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E1E1E] rounded-xl shadow-lg overflow-hidden border border-[#404040]">
              {/* Profile Header */}
              <div className="bg-[#FF3B30] p-6 text-center">
                <div className="flex justify-center">
                  <img
                    src={userData?.photo_url || ""}
                    alt="User avatar"
                    className="h-24 w-24 rounded-full border-4 border-[#1E1E1E] object-cover"
                  />
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">
                  {userData?.name || user?.displayName || "Anonymous User"}
                </h2>
                {userData?.isVerified && (
                  <div className="flex items-center justify-center gap-1 mt-2 text-[#FFD700]">
                    <ShieldCheckIcon className="h-5 w-5" />
                    <span>Verified Reporter</span>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <div className="space-y-4">
                  <DetailItem
                    icon={<UserCircleIcon className="h-5 w-5 text-[#FF3B30]" />}
                    title="Email"
                  >
                    {user?.email}
                  </DetailItem>
                  <DetailItem
                    icon={<PhoneIcon className="h-5 w-5 text-[#FF3B30]" />}
                    title="Phone"
                  >
                    {userData?.phone || "Not provided"}
                  </DetailItem>
                  <DetailItem
                    icon={<MapPinIcon className="h-5 w-5 text-[#FF3B30]" />}
                    title="Location"
                  >
                    {userData?.location
                      ? `${userData.location} - ${userData.pincode}`
                      : "Not provided"}
                  </DetailItem>
                  <DetailItem
                    icon={<CalendarIcon className="h-5 w-5 text-[#FF3B30]" />}
                    title="Member Since"
                  >
                    {userData?.join_date
                      ? new Date(userData.join_date).toLocaleDateString()
                      : new Date(
                          user?.metadata?.creationTime
                        ).toLocaleDateString()}
                  </DetailItem>
                  <DetailItem
                    icon={
                      <DocumentTextIcon className="h-5 w-5 text-[#FF3B30]" />
                    }
                    title="Reports Submitted"
                  >
                    {user?.reportsCount}
                  </DetailItem>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <StatCard
                    value={userData?.active_cases || "0"}
                    label="Active Cases"
                  />
                  <StatCard
                    value={userData?.solved_cases || "0"}
                    label="Solved Cases"
                  />
                  <StatCard
                    value={userData?.total_reports || "0"}
                    label="Total Reports"
                  />
                  <StatCard
                    value={userData?.accuracy || "0%"}
                    label="Report Accuracy"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-[#1E1E1E] rounded-xl shadow-lg p-6 border border-[#404040]">
              <h3 className="font-semibold text-lg mb-4 text-white">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/CrimeReportForm" passHref>
                  <button className="w-full flex items-center gap-2 text-left p-3 hover:bg-[#2A2A2A] rounded-lg transition-colors text-white">
                    <DocumentTextIcon className="h-5 w-5 text-[#FF3B30]" />
                    <span>File New Report</span>
                  </button>
                </Link>
                <Link href="/Emergency" passHref>
                  <button className="w-full flex items-center gap-2 text-left p-3 hover:bg-[#2A2A2A] rounded-lg transition-colors text-white">
                    <ShieldCheckIcon className="h-5 w-5 text-[#FF3B30]" />
                    <span>Safety Tips</span>
                  </button>
                </Link>
                <button className="w-full flex items-center gap-2 text-left p-3 hover:bg-[#2A2A2A] rounded-lg transition-colors text-white">
                  <MapPinIcon className="h-5 w-5 text-[#FF3B30]" />
                  <span>Crime Hotspots</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - User Reports */}
          <div className="lg:col-span-2">
            <div className="bg-[#1E1E1E] rounded-xl shadow-lg overflow-hidden border border-[#404040]">
              <div className="p-6 border-b border-[#404040]">
                <h2 className="text-xl font-semibold text-white">
                  My Crime Reports
                </h2>
                <p className="text-[#B0B0B0] mt-1">
                  All reports you've submitted
                </p>
              </div>

              <div className="divide-y divide-[#404040]">
                {userReports.length > 0 ? (
                  userReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))
                ) : (
                  <div className="p-6 text-center text-[#B0B0B0]">
                    No Reports Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
