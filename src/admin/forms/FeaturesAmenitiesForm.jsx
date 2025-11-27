import React, { useState } from "react";

export default function FeaturesAmenitiesForm({ onSave }) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");

  const handleSubmit = () => {
    if (!heading.trim()) return alert("Heading is required");

    // Normalize video to array if present
    const formattedVideo = video ? [video] : [];

    onSave({
      heading,
      description,
      video: formattedVideo, // always array
    });

    // Optional: reset form
    setHeading("");
    setDescription("");
    setVideo("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-5">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        Features & Amenities
      </h3>

      {/* Heading */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Heading <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
          placeholder="Enter heading..."
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Description
        </label>
        <textarea
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
          rows={4}
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Video URL (optional)
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
          placeholder="Paste video URL..."
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
      >
        Add Step
      </button>
    </div>
  );
}
