import React from 'react'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className="relative bg-[url('/Banner_security.jpg')] bg-cover bg-center bg-no-repeat w-full h-auto aspect-[16/9]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10">
        <div className='nav-bar p-5'></div>
        
        <div className="content flex flex-col justify-center items-center text-center p-10 space-y-6 md:p-52 lg:p-52">
          <Link 
            href="/CrimeReportForm" 
            className='text-4xl font-bold text-white hover:text-[#FF3B30] transition-colors'
          >
            REPORT CRIME
          </Link>
          
          <p className='text-xl font-semibold text-white max-w-2xl'>
            Your vigilance matters! Help make our community safer by reporting suspicious activities.
          </p>
          
          <button className="bg-[#FF3B30] hover:bg-[#E0352B] text-white font-bold text-lg px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg">
            <Link href="/CrimeReportForm">START REPORTING</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner