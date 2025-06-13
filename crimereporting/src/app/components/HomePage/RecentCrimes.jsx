"use client";

import React, { useState, useEffect } from 'react';
import CrimeCard from './CrimeCard';
import Spinner from '../../Spinner.js';
import Link from 'next/link';

const RecentCrimes = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCrime = async () => {
      try {
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
        const result = await response.json();
      
        if (result.success) {
          setReports(result.data);
        } else {
          setError("Failed to fetch crime reports!");
        }
      } catch (error) {
        setError("An internal error occurred while fetching the reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchCrime();
  }, []);

  if (loading) return <div className="flex justify-center p-8"><Spinner/></div>;
  if (error) return <p className="text-center p-4 text-[#FF3B30]">{error}</p>;

  // Limit to only 6 reports
  const limitedReports = reports.slice(0, 6);

  return (
    <div className="p-4 bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-center p-5 text-white">Recent Crime Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {limitedReports.map((report) => (
          <div key={report.id} className="flex-shrink-0">
            <CrimeCard
              title={report.title}
              image={report.image_urls}
              location={report.location}
              date={report.date}
              description={report.description}
            />
          </div>
        ))}
      </div>
     
      <div className="text-center mt-8">
        <Link 
          href="/CrimeFeed"
          className="px-6 py-3 bg-[#FF3B30] text-white rounded-lg hover:bg-[#E0352B] transition duration-200 font-medium text-lg"
        >
          View All Reports
        </Link>
      </div>
    </div>
  );
};

export default RecentCrimes;