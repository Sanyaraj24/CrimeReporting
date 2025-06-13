import React from 'react'

const JoinCommunity = () => {
  return (
    <div className="bg-gradient-to-r from-[#121212] to-[#2A2A2A] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#404040]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 p-5">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base/7 text-[#B0B0B0]">Crimes Reported</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">1000+</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base/7 text-[#B0B0B0]">Active Users</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">500+</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base/7 text-[#B0B0B0]">Reports Viewed</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">10,000+</dd>
          </div>
        </dl>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Join Our Crime Watch Network
        </h2>
        <p className="mt-4 text-lg leading-6 text-[#B0B0B0]">
          Be part of a community dedicated to making neighborhoods safer. Report incidents, stay informed, and help prevent crime in your area.
        </p>
        <div className="mt-8">
          <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#FF3B30] hover:bg-[#E0352B] transition duration-300">
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinCommunity