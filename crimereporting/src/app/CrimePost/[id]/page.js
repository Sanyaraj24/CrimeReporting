"use client";
import {
  MapPinIcon,
  CalendarIcon,
  ScaleIcon,
  UserIcon,
  IdentificationIcon,
  TruckIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/app/Spinner";

const SectionCard = ({ title, children }) => (
  <div className="bg-[#1E1E1E] rounded-lg shadow-md p-6 mb-6 border border-[#333]">
    <h2 className="text-xl font-semibold text-[#E74C3C] mb-4 border-b pb-2 border-[#333]">
      {title}
    </h2>
    {children}
  </div>
);

const DetailItem = ({ icon, title, children }) => (
  <div className="mb-4">
    <div className="flex items-center text-[#B0B0B0] mb-1">
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{title}</span>
    </div>
    <div className="ml-7 text-white">{children}</div>
  </div>
);

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [crimeData, setCrimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://d1-tutorial.crimereporting.workers.dev/get-crime/${id}`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? `Crime report with ID ${id} not found`
              : `Server error: ${response.status}`
          );
        }

        const result = await response.json();
        console.log(result);
        if (!result.success) {
          throw new Error(result.error || "Failed to load crime data");
        }

        if (!result.data) {
          throw new Error("No data received from API");
        }

        setCrimeData(result.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCrimeData();
    }
  }, [id]);

  // Development fallback
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && error && !crimeData) {
      console.warn("Using mock data in development mode");
      setCrimeData({
        id: id,
        title: "Sample Crime Report (Mock Data)",
        description:
          "This is mock data used because the API failed to return real data.",
        incident_date: new Date().toISOString(),
        address: "123 Test Street",
        district: "Test District",
        landmark: "Near Test Landmark",
        pincode: "123456",
        crime_type: "Test Crime",
        severity_level: "moderate",
        weapon_used: "Test weapon",
        estimated_loss: 1000,
        num_victims: 1,
        victim_injury_level: "none",
        victim_age_range: "adult",
        victim_gender: "unknown",
        num_suspects: 1,
        suspect_description: "Test suspect",
        suspect_vehicle_description: "Test vehicle",
        suspect_direction_of_travel: "North",
        num_witnesses: 1,
        physical_evidence_description: "Test evidence",
        reporter_contact: "test@example.com",
        is_anonymous: 0,
        image_urls: JSON.stringify(["mock-image.jpg"]),
        latitude: 0,
        longitude: 0,
      });
      setError("");
      setLoading(false);
    }
  }, [error, crimeData, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <Spinner />
      </div>
    );
  }

  if (error || !crimeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center p-8 max-w-md bg-[#1E1E1E] rounded-lg border border-[#333]">
          <h2 className="text-2xl font-bold text-[#E74C3C] mb-4">Error</h2>
          <p className="text-[#B0B0B0] mb-6">
            {error || "Crime report not found"}
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#E74C3C] text-white rounded hover:bg-[#C0392B] transition"
          >
            <ArrowLeftIcon className="h-5 w-5 inline mr-2" />
            Back to Crime Feed
          </button>
        </div>
      </div>
    );
  }

  // Parse image URLs safely
  const parsedImages =
    typeof crimeData.image_urls === "string"
      ? JSON.parse(crimeData.image_urls)
      : Array.isArray(crimeData.image_urls)
      ? crimeData.image_urls
      : [];

  // Format Cloudinary image URLs
  const cloudinaryBaseUrl =
    "https://res.cloudinary.com/dzxhgjre3/image/upload/";
  const formattedImages = parsedImages.map(
    (img) => `${cloudinaryBaseUrl}${img}`
  );

  // Format severity level for display
  const formatSeverity = (level) => {
    switch (level?.toLowerCase()) {
      case "severe":
        return "High";
      case "moderate":
        return "Medium";
      case "low":
        return "Low";
      default:
        return level || "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#E74C3C] hover:text-[#C0392B] mb-4 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Crime Feed
        </button>

        {/* Header */}
        <div className="mb-8 bg-[#1E1E1E] p-6 rounded-lg shadow-md border border-[#333]">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {crimeData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#B0B0B0]">
            <span className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1 text-[#E74C3C]" />
              {crimeData.district}, {crimeData.pincode || "N/A"}
            </span>
            <span className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-[#E74C3C]" />
              {new Date(crimeData.incident_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center">
              <ScaleIcon className="h-4 w-4 mr-1 text-[#E74C3C]" />
              <span className="font-medium">Severity:</span>{" "}
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                  crimeData.severity_level?.toLowerCase() === "severe"
                    ? "bg-red-900 text-red-100"
                    : crimeData.severity_level?.toLowerCase() === "moderate"
                    ? "bg-yellow-900 text-yellow-100"
                    : "bg-green-900 text-green-100"
                }`}
              >
                {formatSeverity(crimeData.severity_level)}
              </span>
            </span>
            <span className="flex items-center">
              <ShieldCheckIcon className="h-4 w-4 mr-1 text-[#E74C3C]" />
              {crimeData.crime_type || "Unknown"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Incident Details">
              <p className="text-[#B0B0B0] mb-6 leading-relaxed whitespace-pre-line">
                {crimeData.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem
                  icon={<MapPinIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Address"
                >
                  {crimeData.address || "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={<MapPinIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Landmark"
                >
                  {crimeData.landmark || "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={<BanknotesIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Estimated Loss"
                >
                  {crimeData.estimated_loss
                    ? `₹${crimeData.estimated_loss.toLocaleString()}`
                    : "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={<DocumentTextIcon className="h-5 w-5 text-[#B0B0B0]" />}
                  title="Physical Evidence"
                >
                  {crimeData.physical_evidence_description || "Not specified"}
                </DetailItem>
              </div>
            </SectionCard>

            <SectionCard title="Victim Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem
                  icon={<UserIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Number of Victims"
                >
                  {crimeData.num_victims || "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={<UserIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Injury Level"
                >
                  <span className="capitalize">
                    {crimeData.victim_injury_level?.replace("_", " ") ||
                      "Not specified"}
                  </span>
                </DetailItem>
                <DetailItem
                  icon={<UserIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Age Range"
                >
                  {crimeData.victim_age_range?.replace("_", " ") ||
                    "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={<UserIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Gender"
                >
                  {crimeData.victim_gender?.replace("_", " ") ||
                    "Not specified"}
                </DetailItem>
              </div>
            </SectionCard>

            <SectionCard title="Suspect Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem
                  icon={<UserIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Number of Suspects"
                >
                  {crimeData.num_suspects || "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={
                    <IdentificationIcon className="h-5 w-5 text-[#E74C3C]" />
                  }
                  title="Description"
                >
                  {crimeData.suspect_description || "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={<TruckIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Vehicle"
                >
                  {crimeData.suspect_vehicle_description || "Not specified"}
                </DetailItem>
                <DetailItem
                  icon={<MapPinIcon className="h-5 w-5 text-[#E74C3C]" />}
                  title="Direction of Travel"
                >
                  {crimeData.suspect_direction_of_travel || "Not specified"}
                </DetailItem>
              </div>
            </SectionCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SectionCard title="Incident Location">
              <div className="h-64 bg-[#2A2A2A] rounded-lg flex items-center justify-center border border-[#333]">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-[#333] rounded-full flex items-center justify-center mb-2">
                    <MapPinIcon className="h-8 w-8 text-[#E74C3C]" />
                  </div>
                  <p className="font-medium text-white">Map View</p>
                  <p className="text-xs text-[#B0B0B0] mt-2">
                    {crimeData.latitude && crimeData.longitude ? (
                      <>
                        Coordinates: {crimeData.latitude.toFixed(6)},{" "}
                        {crimeData.longitude.toFixed(6)}
                      </>
                    ) : (
                      "Location data not available"
                    )}
                  </p>
                </div>
              </div>
            </SectionCard>

            {crimeData.weapon_used && (
              <SectionCard title="Weapon Used">
                <div className="flex items-start">
                  <span className="bg-[#333] text-[#E74C3C] p-2 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                  <p className="text-white mt-1">{crimeData.weapon_used}</p>
                </div>
              </SectionCard>
            )}

            <SectionCard title="Witness Information">
              <DetailItem
                icon={<UserIcon className="h-5 w-5 text-[#E74C3C]" />}
                title="Number of Witnesses"
              >
                {crimeData.num_witnesses || "Not specified"}
              </DetailItem>
            </SectionCard>

            <SectionCard title="Reporter Information">
              <DetailItem
                icon={
                  crimeData.is_anonymous ? (
                    <ShieldCheckIcon className="h-5 w-5 text-[#E74C3C]" />
                  ) : (
                    <UserIcon className="h-5 w-5 text-[#E74C3C]" />
                  )
                }
                title={
                  crimeData.is_anonymous
                    ? "Reported Anonymously"
                    : "Reporter Contact"
                }
              >
                {crimeData.is_anonymous
                  ? "Anonymous report"
                  : crimeData.reporter_contact || "Not specified"}
              </DetailItem>
            </SectionCard>

            <SectionCard title="Report Details">
              <DetailItem
                icon={<DocumentTextIcon className="h-5 w-5 text-[#B0B0B0]" />}
                title="Case ID"
              >
                <span className="font-mono bg-[#333] px-2 py-1 rounded text-white">
                  #{crimeData.id}
                </span>
              </DetailItem>
              <DetailItem
                icon={<CalendarIcon className="h-5 w-5 text-[#B0B0B0]" />}
                title="Reported On"
              >
                {new Date(crimeData.incident_date).toLocaleDateString()}
              </DetailItem>
            </SectionCard>
          </div>
        </div>

        {/* Images Section */}
        {formattedImages.length > 0 && (
          <SectionCard title="Crime Scene Images">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formattedImages.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#333]"
                >
                  <img
                    src={img}
                    alt={`Crime scene evidence ${index + 1}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/crime-placeholder.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center"></div>
                  <div className="absolute bottom-2 right-2 bg-[#333] text-white text-xs px-2 py-1 rounded">
                    {index + 1}/{formattedImages.length}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
};

export default page;
