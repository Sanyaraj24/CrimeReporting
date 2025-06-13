"use client";
import React from 'react';
import { FiMapPin, FiCalendar, FiAlertTriangle } from 'react-icons/fi';
import Link from 'next/link';

export const CrimeCard = ({ 
  id, 
  image, 
  title, 
  location, 
  date, 
  description, 
  severity = "medium" // Default value added
}) => {
  // More robust image parsing
  const parsedImages = () => {
    try {
      return typeof image === 'string' ? JSON.parse(image) : 
             Array.isArray(image) ? image : [];
    } catch {
      return [];
    }
  };

  // Severity color mapping
  const severityColors = {
    high: '#E74C3C',
    medium: '#F39C12',
    low: '#2ECC71',
    severe: '#E74C3C', // Added to match your API's "severe"
    minor: '#2ECC71'   // Added to match your API's "minor"
  };

  const firstImage = parsedImages()[0];

  return (
    <Link href={`/CrimePost/${id}`} passHref legacyBehavior>
      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-[#1E1E1E] hover:shadow-xl transition-all duration-200 flex flex-col p-2 group cursor-pointer">
        {/* Image Section */}
        <div className="aspect-video w-full overflow-hidden relative">
          {firstImage ? (
            <img
              src={`https://res.cloudinary.com/dzxhgjre3/image/upload/c_fill,g_auto,w_600/${firstImage}`}
              alt={`Crime scene: ${title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/crime-placeholder.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full bg-[#2A2A2A] flex items-center justify-center">
              <FiAlertTriangle className="text-[#B0B0B0] text-2xl" />
            </div>
          )}
          {severity && (
            <div 
              className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold text-white"
              style={{ 
                backgroundColor: severityColors[severity.toLowerCase()] || '#E74C3C'
              }}
            >
              {severity}
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg mb-2 text-white line-clamp-1 group-hover:text-[#E74C3C] transition-colors">
            {title}
          </h3>
          
          <p className="text-[#B0B0B0] text-sm mb-4 line-clamp-3">
            {description}
          </p>
          
          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-[#404040]">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
              <span className="inline-flex items-center gap-1 truncate text-[#E74C3C]">
                <FiMapPin className="flex-shrink-0" />
                <span className="truncate">{location}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[#B0B0B0]">
                <FiCalendar className="flex-shrink-0" />
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CrimeCard;