"use client";

import React, { useState, useEffect } from "react";
import CrimeLocation from "./CrimeLocation";
import UploadImage from "./FileUpload";
import Spinner from "../Spinner.js";
//NOTE:Pass a callback from page.js to UploadImage to get those URLs and store them in page.js's state.

const CrimeReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    incident_date: "",
    address: "",
    district: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    crime_type: "",
    severity_level: "",
    weapon_used: "",
    estimated_loss: "",
    num_victims: 1,
    victim_injury_level: "",
    victim_age_range: "",
    victim_gender: "",
    num_suspects: "",
    suspect_description: "",
    suspect_vehicle_description: "",
    suspect_direction_of_travel: "",
    num_witnesses: "",
    physical_evidence_description: "",
    reporter_contact: "",
    is_anonymous: 0,
    image_urls: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitMessage, setSubmitMessage] = useState(null);
  const [resetImages, setResetImages] = useState(false);
  const [loading, setLoading] = useState(false);
  //IMAGE URLS
  const handleImageUploaded = (urls) => {
    setFormData((prev) => ({ ...prev, image_urls: urls }));
  };

  const handleLocationSelect = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };
  //USEEFFECT
  useEffect(() => {
    setLoading(false);
    if (resetImages) {
      setResetImages(false);
    }
  }, [resetImages]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Format date to match expected format && URLS
      const formattedData = {
        ...formData,
        incident_date: formData.incident_date.split("T")[0], // Convert to YYYY-MM-DD format
        image_urls: formData.image_urls || [],
      };

      const response = await fetch(
        "https://d1-tutorial.crimereporting.workers.dev/submit-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          mode: "cors",
          body: JSON.stringify(formattedData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Crime report submitted successfully!",
        });
        alert("Form submiteed successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          incident_date: "",
          address: "",
          district: "",
          pincode: "",
          landmark: "",
          latitude: "",
          longitude: "",
          crime_type: "",
          severity_level: "",
          weapon_used: "",
          estimated_loss: "",
          num_victims: 1,
          victim_injury_level: "",
          victim_age_range: "",
          victim_gender: "",
          num_suspects: "",
          suspect_description: "",
          suspect_vehicle_description: "",
          suspect_direction_of_travel: "",
          num_witnesses: "",
          physical_evidence_description: "",
          reporter_contact: "",
          is_anonymous: 0,
          image_urls: [],
        });
        setResetImages(true);
      } else {
        throw new Error(result.error || "Failed to submit report");
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: error.message || "Failed to submit report. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const crimeTypes = [
    "Theft",
    "Burglary",
    "Robbery",
    "Assault",
    "Battery",
    "Vandalism",
    "Fraud",
    "Harassment",
    "Domestic Violence",
    "Drug-related",
    "Homicide",
    "Traffic Violation",
    "Other",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-200 min-h-screen py-8">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-800 py-4 px-6">
              <h1 className="text-white text-2xl font-bold">
                Community Crime Report Form
              </h1>
              <p className="text-blue-100 mt-1">
                Report incidents to help keep our community safe
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Submit Message */}
              {submitMessage && (
                <div
                  className={`p-4 mb-4 rounded ${
                    submitMessage.type === "success"
                      ? "bg-green-100 border border-green-400 text-green-700"
                      : "bg-red-100 border border-red-400 text-red-700"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
              {/* Form divided into logical sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section 1: Basic Information */}
                <div className="md:col-span-2 border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="title"
                      >
                        Report Title <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief title describing the incident"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="incident_date"
                      >
                        Incident Date & Time{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        id="incident_date"
                        name="incident_date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.incident_date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="description"
                      >
                        Detailed Description{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please provide a detailed account of what happened"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Location Details */}
                <div className="md:col-span-2 border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Location Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="district"
                      >
                        District
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="District or neighborhood name"
                        value={formData.district}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="landmark"
                      >
                        Nearby Landmark
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any notable landmark nearby"
                        value={formData.landmark}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="pincode"
                      >
                        Pincode
                      </label>
                      <input
                        type="number"
                        id="pincode"
                        name="pincode"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <CrimeLocation onLocationSelect={handleLocationSelect} />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="latitude"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.00000001"
                  id="latitude"
                  name="latitude"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="GPS latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="longitude"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.00000001"
                  id="longitude"
                  name="longitude"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="GPS longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section 3: Incident Details */}
                <div className="md:col-span-2 border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Incident Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="crime_type"
                      >
                        Crime Type <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="crime_type"
                        name="crime_type"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.crime_type}
                        onChange={handleChange}
                      >
                        <option value="">Select crime type</option>
                        {crimeTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="severity_level"
                      >
                        Severity Level <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="severity_level"
                        name="severity_level"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.severity_level}
                        onChange={handleChange}
                      >
                        <option value="">Select severity</option>
                        <option value="minor">Minor</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="weapon_used"
                      >
                        Weapon/Tool Used (if any)
                      </label>
                      <input
                        type="text"
                        id="weapon_used"
                        name="weapon_used"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe any weapons or tools used"
                        value={formData.weapon_used}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="estimated_loss"
                      >
                        Estimated Loss (Rs.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        id="estimated_loss"
                        name="estimated_loss"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Approximate value of stolen/damaged property"
                        value={formData.estimated_loss}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Victim Information */}
                <div className="md:col-span-2 border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Victim Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="num_victims"
                      >
                        Number of Victims
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        id="num_victims"
                        name="num_victims"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.num_victims}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="victim_injury_level"
                      >
                        Injury Level
                      </label>
                      <select
                        id="victim_injury_level"
                        name="victim_injury_level"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.victim_injury_level}
                        onChange={handleChange}
                      >
                        <option value="">Select injury level</option>
                        <option value="none">None</option>
                        <option value="minor">Minor</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                        <option value="critical">Critical</option>
                        <option value="fatal">Fatal</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="victim_age_range"
                      >
                        Age Range
                      </label>
                      <select
                        id="victim_age_range"
                        name="victim_age_range"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.victim_age_range}
                        onChange={handleChange}
                      >
                        <option value="">Select age range</option>
                        <option value="child">Child (0-12)</option>
                        <option value="teen">Teen (13-17)</option>
                        <option value="young_adult">Young Adult (18-25)</option>
                        <option value="adult">Adult (26-40)</option>
                        <option value="middle_aged">Middle Aged (41-60)</option>
                        <option value="senior">Senior (61+)</option>
                        <option value="unknown">Unknown</option>
                        <option value="mixed">Mixed (Multiple Victims)</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="victim_gender"
                      >
                        Gender
                      </label>
                      <select
                        id="victim_gender"
                        name="victim_gender"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.victim_gender}
                        onChange={handleChange}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non_binary">Non-binary</option>
                        <option value="unknown">Unknown</option>
                        <option value="mixed">Mixed (Multiple Victims)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 5: Suspect Information */}
                <div className="md:col-span-2 border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Suspect Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="num_suspects"
                      >
                        Number of Suspects
                      </label>
                      <input
                        type="number"
                        min="0"
                        id="num_suspects"
                        name="num_suspects"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="If known"
                        value={formData.num_suspects}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="suspect_description"
                      >
                        Suspect Description
                      </label>
                      <textarea
                        id="suspect_description"
                        name="suspect_description"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Physical description, clothing, distinguishing features, etc."
                        value={formData.suspect_description}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="suspect_vehicle_description"
                      >
                        Vehicle Description
                      </label>
                      <input
                        type="text"
                        id="suspect_vehicle_description"
                        name="suspect_vehicle_description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Make, model, color, license plate, etc."
                        value={formData.suspect_vehicle_description}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="suspect_direction_of_travel"
                      >
                        Direction of Travel
                      </label>
                      <input
                        type="text"
                        id="suspect_direction_of_travel"
                        name="suspect_direction_of_travel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Direction suspect fled"
                        value={formData.suspect_direction_of_travel}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 6: Evidence and Witnesses */}
                <div className="md:col-span-2 border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Evidence and Witnesses
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="num_witnesses"
                      >
                        Number of Witnesses
                      </label>
                      <input
                        type="number"
                        min="0"
                        id="num_witnesses"
                        name="num_witnesses"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="If any"
                        value={formData.num_witnesses}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="physical_evidence_description"
                      >
                        Physical Evidence
                      </label>
                      <textarea
                        id="physical_evidence_description"
                        name="physical_evidence_description"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description of any physical evidence at the scene"
                        value={formData.physical_evidence_description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/** <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="image_url">
                    Upload Photo Evidence
                  </label>
                  <input
                    type="file"
                    id="image_upload"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="video_url">
                    Upload Video Evidence
                  </label>
                  <input
                    type="file"
                    id="video_upload"
                    accept="video/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
                */}
                {/* Section 7: Reporter Information */}
                <div className="md:col-span-2 border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Reporter Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="reporter_contact"
                      >
                        Contact Information
                      </label>
                      <input
                        type="text"
                        id="reporter_contact"
                        name="reporter_contact"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone number or email"
                        value={formData.reporter_contact}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center">
                      <input
                        type="checkbox"
                        id="is_anonymous"
                        name="is_anonymous"
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData.is_anonymous}
                        onChange={handleChange}
                      />
                      <label
                        className="ml-2 block text-gray-700"
                        htmlFor="is_anonymous"
                      >
                        Submit this report anonymously
                      </label>
                    </div>
                  </div>
                </div>
                <UploadImage
                  onImagesUploaded={handleImageUploaded}
                  resetImages={resetImages}
                />

                {/* Form submission */}
                <div className="md:col-span-2 mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="text-red-600">*</span> Required fields
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => {
                        if (window !== undefined) window.location.reload();
                      }}
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Report"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CrimeReportForm;
