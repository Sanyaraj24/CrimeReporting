"use client";
import Head from "next/head";
import {
  FiAlertTriangle,
  FiPhone,
  FiShield,
  FiUser,
  FiMapPin,
} from "react-icons/fi";

export default function EmergencyPage() {
  const emergencyNumbers = [
    {
      name: "Police",
      number: "100",
      icon: <FiShield className="text-[#E74C3C] text-xl" />,
    },
    {
      name: "Ambulance",
      number: "102",
      icon: <FiUser className="text-[#E74C3C] text-xl" />,
    },
    {
      name: "Women's Safety",
      number: "1091",
      icon: <FiUser className="text-[#E74C3C] text-xl" />,
    },
    {
      name: "Fire Brigade",
      number: "101",
      icon: <FiAlertTriangle className="text-[#E74C3C] text-xl" />,
    },
    {
      name: "Disaster Management",
      number: "108",
      icon: <FiMapPin className="text-[#E74C3C] text-xl" />,
    },
  ];

  const safetyTips = [
    {
      title: "Night Walks",
      content:
        "Stay in well-lit areas, avoid using your phone excessively, and walk confidently.",
      icon: "🌃",
    },
    {
      title: "ATMs",
      content:
        "Use ATMs in secure locations, shield your PIN, and be aware of your surroundings.",
      icon: "🏧",
    },
    {
      title: "Public Transport",
      content:
        "Sit near the driver or in crowded areas, keep your belongings close, and avoid isolated stops.",
      icon: "🚍",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#121212]">
      <Head>
        <title>Emergency Assistance | SafeStreet</title>
        <meta
          name="description"
          content="Immediate emergency contacts and safety resources"
        />
      </Head>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FiAlertTriangle className="text-[#E74C3C] text-2xl" />
            <h1 className="text-4xl font-bold text-white">
              Emergency Assistance
            </h1>
          </div>
          <div className="w-20 h-1 bg-[#E74C3C] mx-auto"></div>
          <p className="mt-4 text-[#B0B0B0]">
            Immediate help and safety resources when you need them most
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {emergencyNumbers.slice(0, 3).map((service) => (
            <button key={service.name}>
              {service.icon}
              {service.name} ({service.number})
            </button>
          ))}
        </div>

        {/* Safety Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <FiShield className="text-[#E74C3C]" />
            Safety Tips
          </h2>
          <div className="space-y-4">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] p-6 rounded-lg border border-[#404040]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-[#B0B0B0]">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <FiPhone className="text-[#E74C3C]" />
            Emergency Contacts
          </h2>
          <div className="bg-[#1E1E1E] p-6 rounded-lg border border-[#404040]">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emergencyNumbers.map((service) => (
                <li key={service.name} className="flex items-center gap-3">
                  {service.icon}
                  <span className="text-[#B0B0B0] flex-grow">
                    {service.name}:
                  </span>
                  <a
                    href={`tel:${service.number}`}
                    className="text-[#E74C3C] hover:text-[#C0392B] transition-colors font-medium"
                  >
                    {service.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Live Support */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <FiUser className="text-[#E74C3C]" />
            Immediate Assistance
          </h2>
          <div className="bg-[#1E1E1E] p-6 rounded-lg border border-[#404040]">
            <p className="text-[#B0B0B0] mb-4">
              Need to report a crime in progress or get immediate help? Our team
              is available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => alert("Connecting you to live support...")}
                className="bg-[#E74C3C] hover:bg-[#C0392B] text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium flex-1 text-center"
              >
                Live Chat
              </button>
              <button className="border border-[#E74C3C] text-[#E74C3C] hover:bg-[#2A2A2A] py-3 px-6 rounded-lg transition-colors duration-200 font-medium flex-1 text-center">
                Emergency Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
