"use client";
import React, { useEffect, useState } from "react";
import CrimeCard from "./CrimeCard";
import Spinner from "../Spinner";
import { FiAlertTriangle, FiSearch, FiFilter } from "react-icons/fi";

const page = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  useEffect(() => {
    const fetchCrime = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://d1-tutorial.crimereporting.workers.dev/crime-feed",
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
          setReports(result.data);
          setFilteredReports(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch crime reports");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCrime();
  }, []);

  useEffect(() => {
    let results = [...reports];

    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (report) =>
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply district filter
    if (selectedDistrict !== "All") {
      results = results.filter(
        (report) => report.district === selectedDistrict
      );
    }

    // Apply date filter
    if (dateFilter !== "All") {
      const now = new Date();

      results = results.filter((report) => {
        const reportDate = new Date(report.incident_date);

        if (dateFilter === "Today") {
          return reportDate.toDateString() === now.toDateString();
        } else if (dateFilter === "This Week") {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          return reportDate > oneWeekAgo;
        } else if (dateFilter === "This Month") {
          const firstDayOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          );
          return reportDate >= firstDayOfMonth;
        }
        return true;
      });
    }

    setFilteredReports(results);
  }, [searchTerm, selectedDistrict, dateFilter, reports]);

  // Get unique districts for filter dropdown
  const districts = [
    "All",
    ...new Set(reports.map((report) => report.district).filter(Boolean)),
  ];

  return (
    <div className="max-w-full p-4 sm:p-8 bg-[#121212] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FiAlertTriangle className="text-[#E74C3C] text-2xl" />
          <h1 className="text-3xl font-bold text-white">
            Crime Reports in Your Area
          </h1>
        </div>
        <div className="w-20 h-1 bg-[#E74C3C]"></div>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search crimes..."
              className="pl-10 w-full bg-[#1E1E1E] border border-[#404040] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="bg-[#1E1E1E] border border-[#404040] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map((district) => (
              <option key={district} value={district}>
                {district || "Unknown"}
              </option>
            ))}
          </select>

          <select
            className="bg-[#1E1E1E] border border-[#404040] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center text-[#E74C3C] font-semibold p-4 bg-[#1E1E1E] rounded-lg shadow-md">
            {error}
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center text-[#B0B0B0] p-8 bg-[#1E1E1E] rounded-lg">
            No crime reports found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReports.map((data) => (
              <CrimeCard
                key={data.id}
                id={data.id}
                title={data.title}
                image={data.image_urls}
                location={data.district}
                date={data.incident_date}
                description={data.description}
                severity={data.severity_level || data.severity} // Handles both cases
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
