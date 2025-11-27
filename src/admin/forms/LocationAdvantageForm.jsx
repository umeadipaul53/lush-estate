import React, { useState } from "react";

export default function LocationAdvantageForm({ onSave }) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([""]); // array of video URLs
  const [mapUrl, setMapUrl] = useState("");

  const handleVideoChange = (value, index) => {
    const updated = [...videos];
    updated[index] = value;
    setVideos(updated);
  };

  const addVideoField = () => {
    setVideos([...videos, ""]);
  };

  const removeVideoField = (index) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
  };

  const handleSubmit = () => {
    if (!heading.trim()) return alert("Heading is required");

    // Filter out empty video strings
    const cleanVideos = videos.filter((v) => v.trim() !== "");

    onSave({
      heading,
      description,
      video: cleanVideos, // array, can be empty
      mapUrl: mapUrl.trim() ? mapUrl : undefined,
    });

    // Optional: reset form
    setHeading("");
    setDescription("");
    setVideos([""]);
    setMapUrl("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-5">
      <h3 className="text-lg font-semibold text-gray-800">
        Location Advantage
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

      {/* Video URLs */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Video URLs (optional, add multiple)
        </label>
        {videos.map((vid, index) => (
          <div key={index} className="flex items-center gap-3 mb-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
              placeholder={`Video URL ${index + 1}`}
              value={vid}
              onChange={(e) => handleVideoChange(e.target.value, index)}
            />
            {videos.length > 1 && (
              <button
                type="button"
                onClick={() => removeVideoField(index)}
                className="text-red-500 hover:text-red-700 font-bold text-xl"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addVideoField}
          className="text-blue-600 font-medium hover:underline"
        >
          + Add another video
        </button>
      </div>

      {/* Map URL */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Map URL (optional)
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
          placeholder="Embed or share map link..."
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
      >
        Add Step
      </button>
    </div>
  );
}
