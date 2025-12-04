import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Plus, Trash2 } from "lucide-react";
import { addQuestion } from "../reducers/questionaireReducer";
import { useToast } from "../toastContext/useToast";

function CreateQuestionaire() {
  const { estateId } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // if you want to update Redux after adding
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([{ text: "", points: 0 }]);
  const [loading, setLoading] = useState(false);

  // Add new option row
  const addOption = () => setOptions([...options, { text: "", points: 0 }]);

  // Remove option row
  const removeOption = (index) =>
    setOptions(options.filter((_, i) => i !== index));

  // Update option
  const updateOption = (index, key, value) => {
    const updated = [...options];
    updated[index][key] = key === "points" ? Number(value) : value;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText.trim()) {
      return toast.error("Question text is required");
    }

    const filteredOptions = options.filter((opt) => opt.text.trim() !== "");
    if (filteredOptions.length === 0) {
      return toast.error("At least one option is required");
    }

    const payload = {
      estateId,
      questionText,
      options: filteredOptions,
    };

    try {
      setLoading(true);
      const response = await dispatch(addQuestion(payload)).unwrap();

      showToast(response.message, "success");
      navigate("/admin/manage-questionaire"); // go back to list
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-950 mb-4">
        Add Questionaire
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-100"
      >
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Text
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
            placeholder="Enter your question here..."
            required
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="space-y-3">
            {options.map((opt, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Option text"
                  value={opt.text}
                  onChange={(e) => updateOption(index, "text", e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="w-20 border rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Points"
                  value={opt.points}
                  min={0}
                  onChange={(e) =>
                    updateOption(index, "points", e.target.value)
                  }
                  required
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-2 rounded bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addOption}
            className="mt-2 flex items-center gap-1 text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded"
          >
            <Plus size={14} /> Add Option
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
        >
          {loading ? "Saving..." : "Add Question"}
        </button>
      </form>
    </section>
  );
}

export default CreateQuestionaire;
