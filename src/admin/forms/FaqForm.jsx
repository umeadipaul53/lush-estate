import React, { useState } from "react";

export default function FaqForm({ onSave }) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(""); // optional step-level video
  const [questions, setQuestions] = useState([]);

  const addQuestion = () =>
    setQuestions([...questions, { heading: "", description: "", video: "" }]);

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));

  const handleSubmit = () => {
    // Normalize step-level video to array if present
    const stepVideo = video ? [video] : [];

    // Normalize question videos to array if present
    const formattedQuestions = questions.map((q) => ({
      ...q,
      video: q.video ? [q.video] : [],
    }));

    onSave({
      heading,
      description,
      video: stepVideo, // optional
      questions: formattedQuestions,
    });
  };

  return (
    <div className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">FAQ Section</h3>

      {/* FAQ Main Heading */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Section Heading
        </label>
        <input
          type="text"
          placeholder="Enter section title..."
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* FAQ Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Section Description
        </label>
        <textarea
          placeholder="Describe this FAQ section..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Optional Step-level Video */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">
          Section Video (optional)
        </label>
        <input
          type="url"
          placeholder="https://youtube.com/..."
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {questions.map((q, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg bg-gray-50"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">
                Question {index + 1}
              </h4>
              <button
                onClick={() => removeQuestion(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>

            {/* Question Heading */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">
                Question Title
              </label>
              <input
                type="text"
                placeholder="e.g. What documents do I need?"
                value={q.heading}
                onChange={(e) =>
                  updateQuestion(index, "heading", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Question Description */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">
                Question Description
              </label>
              <textarea
                placeholder="Provide a detailed answer..."
                value={q.description}
                onChange={(e) =>
                  updateQuestion(index, "description", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Question Video */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Video URL (optional)
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/..."
                value={q.video}
                onChange={(e) => updateQuestion(index, "video", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <button
        onClick={addQuestion}
        className="w-full mt-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        + Add Question
      </button>

      {/* Save FAQ */}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        Save FAQ Step
      </button>
    </div>
  );
}
