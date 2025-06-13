"use client"
import { useState } from 'react';

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index); 
  };

  return (
    <div className="w-full bg-[#121212] p-10 border-t border-[#404040]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-6 text-white">Frequently Asked Questions</h2>

        <div className="space-y-1 text-md">
          {/* FAQ 1 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(1)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              How do I report a crime on this website?
            </button>
            {open === 1 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                Click on the "Report a Crime" button, fill out the form with details (crime type, location, description, and evidence), and submit.
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(2)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              Can I report a crime anonymously?
            </button>
            {open === 2 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                Yes, there is an option to report anonymously. We do not store personal details for anonymous reports.
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(3)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              What happens after I submit a crime report?
            </button>
            {open === 3 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                Your report is reviewed by our moderation team and forwarded to the relevant authorities if verified.
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(4)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              Can I edit or delete my submitted report?
            </button>
            {open === 4 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                You can edit or delete reports from your dashboard unless the report is already under investigation.
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(5)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              Will I be contacted after I submit a report?
            </button>
            {open === 5 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                If you choose to provide contact details, authorities may reach out for additional information.
              </div>
            )}
          </div>

          {/* FAQ 6 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(6)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              How can I find the nearest police station?
            </button>
            {open === 6 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                Visit the Emergency Contacts page to view a map of nearby police stations.
              </div>
            )}
          </div>

          {/* FAQ 7 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(7)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              Can I report a crime if I'm not sure about all the details?
            </button>
            {open === 7 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                Yes, report as much information as possible. Authorities can investigate further.
              </div>
            )}
          </div>

          {/* FAQ 8 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(8)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              What if I'm falsely accused of a crime on this platform?
            </button>
            {open === 8 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                Contact our support team through the Help Desk to dispute the claim with proof.
              </div>
            )}
          </div>

          {/* FAQ 9 */}
          <div className="border-b border-[#404040]">
            <button
              onClick={() => toggleFAQ(9)}
              className="w-full text-left py-4 px-4 font-medium text-white hover:bg-[#2A2A2A] focus:outline-none transition-colors duration-200"
            >
              Can I track the status of my reported crime?
            </button>
            {open === 9 && (
              <div className="px-4 py-3 text-[#B0B0B0] bg-[#1E1E1E]">
                Yes, registered users can check report status from their dashboard.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}