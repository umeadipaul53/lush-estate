import React, { useState } from "react";

export default function TrustCredibilityForm({ onSave }) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [awards, setAwards] = useState([]);

  /* ------------------- Certificates ------------------- */
  const [certInput, setCertInput] = useState("");
  const addCertificate = () => {
    if (certInput.trim()) {
      setCertificates([...certificates, certInput.trim()]);
      setCertInput("");
    }
  };
  const removeCertificate = (i) =>
    setCertificates(certificates.filter((_, idx) => idx !== i));

  /* ------------------- Awards ------------------- */
  const [awardInput, setAwardInput] = useState("");
  const addAward = () => {
    if (awardInput.trim()) {
      setAwards([...awards, awardInput.trim()]);
      setAwardInput("");
    }
  };
  const removeAward = (i) => setAwards(awards.filter((_, idx) => idx !== i));

  /* ------------------- Past Projects ------------------- */
  const addPastProject = () =>
    setPastProjects([...pastProjects, { beforeImage: "", afterImage: "" }]);
  const updatePastProject = (i, field, val) => {
    const updated = [...pastProjects];
    updated[i][field] = val;
    setPastProjects(updated);
  };
  const removePastProject = (i) =>
    setPastProjects(pastProjects.filter((_, idx) => idx !== i));

  /* ------------------- Testimonials ------------------- */
  const addTestimonial = () =>
    setTestimonials([...testimonials, { name: "", text: "", video: "" }]);
  const updateTestimonial = (i, field, val) => {
    const updated = [...testimonials];
    updated[i][field] = val;
    setTestimonials(updated);
  };
  const removeTestimonial = (i) =>
    setTestimonials(testimonials.filter((_, idx) => idx !== i));

  /* ------------------- Submit ------------------- */
  const handleSubmit = () => {
    // Auto-add any unfinished certificate/award
    if (certInput.trim()) addCertificate();
    if (awardInput.trim()) addAward();

    // Validation
    if (!heading.trim()) return alert("Heading is required");
    if (certificates.length === 0) return alert("Add at least one certificate");
    if (awards.length === 0) return alert("Add at least one award");
    if (testimonials.length === 0) return alert("Add at least one testimonial");

    // Normalize testimonial videos to arrays (even if single URL)
    const normalizedTestimonials = testimonials.map((t) => ({
      ...t,
      video: t.video ? [t.video] : [],
    }));

    onSave({
      heading,
      description,
      certificates,
      pastProjects,
      testimonials: normalizedTestimonials,
      awards,
    });

    // Optional: reset form
    setHeading("");
    setDescription("");
    setCertificates([]);
    setPastProjects([]);
    setTestimonials([]);
    setAwards([]);
    setCertInput("");
    setAwardInput("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Trust & Credibility
      </h3>

      {/* Heading */}
      <input
        className="w-full px-4 py-3 border rounded-lg"
        placeholder="Heading*"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="w-full px-4 py-3 border rounded-lg"
        rows={3}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Certificates */}
      <div className="space-y-2">
        <h4 className="font-medium">Certificates*</h4>
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded-lg"
            placeholder="Enter certificate URL"
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
          />
          <button
            onClick={addCertificate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        {certificates.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
          >
            <span>{c}</span>
            <button
              onClick={() => removeCertificate(i)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="space-y-2">
        <h4 className="font-medium">Awards*</h4>
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded-lg"
            placeholder="Enter award URL"
            value={awardInput}
            onChange={(e) => setAwardInput(e.target.value)}
          />
          <button
            onClick={addAward}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        {awards.map((a, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
          >
            <span>{a}</span>
            <button onClick={() => removeAward(i)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Past Projects */}
      <section className="space-y-3">
        <h4 className="text-md font-semibold text-gray-700">Past Projects</h4>
        <button
          onClick={addPastProject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Add Project
        </button>

        {pastProjects.map((p, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-lg border space-y-3 relative"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Before Image URL"
                value={p.beforeImage}
                onChange={(e) =>
                  updatePastProject(i, "beforeImage", e.target.value)
                }
              />
              <input
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="After Image URL"
                value={p.afterImage}
                onChange={(e) =>
                  updatePastProject(i, "afterImage", e.target.value)
                }
              />
            </div>
            <button
              onClick={() => removePastProject(i)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="space-y-3">
        <h4 className="text-md font-semibold text-gray-700">Testimonials*</h4>
        <button
          onClick={addTestimonial}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Add Testimonial
        </button>

        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-lg border space-y-3 relative"
          >
            <input
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Name"
              value={t.name}
              onChange={(e) => updateTestimonial(i, "name", e.target.value)}
            />

            <input
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Text"
              value={t.text}
              onChange={(e) => updateTestimonial(i, "text", e.target.value)}
            />

            <input
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Video URL"
              value={t.video}
              onChange={(e) => updateTestimonial(i, "video", e.target.value)}
            />

            <button
              onClick={() => removeTestimonial(i)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
      >
        Add Step
      </button>
    </div>
  );
}
