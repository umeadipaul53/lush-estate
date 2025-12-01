import React, { useState } from "react";

export default function VirtualInspectionForm({ onSave }) {
  const [form, setForm] = useState({
    heading: "",
    description: "",
    videos: [""], // array of video URLs
    mapUrl: "",
  });

  /* ------------------- Handlers ------------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (value, index) => {
    const updated = [...form.videos];
    updated[index] = value;
    setForm({ ...form, videos: updated });
  };

  const addVideoField = () =>
    setForm({ ...form, videos: [...form.videos, ""] });

  const removeVideoField = (index) => {
    const updated = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, videos: updated });
  };

  const handleSubmit = () => {
    if (!form.heading.trim()) return alert("Heading is required");

    // Remove empty video URLs
    const cleanVideos = form.videos.filter((v) => v.trim() !== "");

    onSave({
      heading: form.heading,
      description: form.description,
      video: cleanVideos, // array, can be empty
      mapUrl: form.mapUrl.trim() ? form.mapUrl : undefined,
    });

    // Reset form
    setForm({ heading: "", description: "", videos: [""], mapUrl: "" });
  };

  return (
    <div className="w-full p-5 rounded-xl border bg-white shadow-sm mt-4">
      <h3 className="font-semibold text-lg mb-4">Virtual Inspection</h3>

      <div className="flex flex-col gap-3">
        {/* Heading */}
        <input
          name="heading"
          placeholder="Heading*"
          value={form.heading}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Video URLs */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Video URLs (optional)
          </label>
          {form.videos.map((vid, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                placeholder={`Video URL ${index + 1}`}
                value={vid}
                onChange={(e) => handleVideoChange(e.target.value, index)}
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {form.videos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVideoField(index)}
                  className="text-red-500 font-bold text-xl"
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
        <input
          name="mapUrl"
          placeholder="Map Image URL (optional)"
          value={form.mapUrl}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Step
      </button>
    </div>
  );
}
