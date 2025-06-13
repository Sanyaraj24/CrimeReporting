"use client";
import React from 'react';

export const CrimeCard = ({ image, title, location, date, description }) => {
  const parsedImages = JSON.parse(image);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-[#1E1E1E] hover:shadow-xl transition-all duration-200 flex flex-col p-2 ">
      {/* Image Section - Fixed Aspect Ratio */}
      <div className="aspect-video w-full overflow-hidden">
        {parsedImages?.[0] && (
          <img
            src={`https://res.cloudinary.com/dzxhgjre3/image/upload/c_fill,g_auto,w_600/${parsedImages[0]}`}
            alt="Crime scene"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-2 text-white line-clamp-1">{title}</h3>

        <p className="text-[#B0B0B0] text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-[#404040]">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
            <span className="inline-flex items-center gap-1 truncate text-[#FF3B30]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
            <span className="inline-flex items-center gap-1 text-[#B0B0B0]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeCard;