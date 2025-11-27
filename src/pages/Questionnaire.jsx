import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions as fetchQuestionsAction,
  answerQuestions,
} from "../reducers/questionaireReducer";
import { secheduleTour } from "../reducers/tourReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";

const Questionnaire = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { question: reduxQuestions, totalScore } = useSelector(
    (state) => state.questionaire
  );
  const estateId = useSelector((state) => state.estates.estateId);
  const { loading: tourLoading, error } = useSelector((state) => state.tour);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [tourForm, setTourForm] = useState({
    date: "",
    time: "",
    estateId: estateId,
  });

  // Fetch questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await dispatch(fetchQuestionsAction({ estateId })).unwrap();
        setQuestions(res?.data?.questions || []);
      } catch (err) {
        console.error("Failed to load questions:", err);
      } finally {
        setLoading(false);
      }
    };
    if (estateId) loadQuestions();
  }, [dispatch, estateId]);

  // Handle answer selection
  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { text: option.text, points: option.points },
    }));
  };

  // Submit questionnaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionsIdArray = questions.map((q) => q._id);
    const answersArray = questionsIdArray.map((id) => answers[id] || null);

    if (answersArray.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(
        answerQuestions({ questionsIdArray, answersArray, estateId })
      ).unwrap();
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
      showToast(
        typeof err === "string" ? err : err?.message || "Submission failed",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Tour form validation
  const validateTourForm = () => {
    const newErrors = {};
    if (!tourForm.date) newErrors.date = "Date is required.";
    if (!tourForm.time) newErrors.time = "Time is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeTourForm = (e) => {
    setTourForm({ ...tourForm, [e.target.name]: e.target.value });
  };

  const handleTourSchedule = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateTourForm()) return;

    const today = new Date().toISOString().split("T")[0];
    if (tourForm.date < today) {
      setErrors((prev) => ({ ...prev, date: "Please select a valid date." }));
      return;
    }

    try {
      const result = await dispatch(secheduleTour(tourForm)).unwrap();
      showToast(result.message, "success");
      setOpenModal(false);
      setTimeout(() => navigate("/user-dashboard"), 3000);
    } catch (err) {
      showToast(
        typeof err === "string"
          ? err
          : err?.message || "Tour scheduling failed",
        "error"
      );
      setOpenModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  // ---------------------------
  // Prepare submitted content
  // ---------------------------
  let submittedContent = null;
  if (submitted) {
    if (totalScore >= 16) {
      submittedContent = (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 text-lg mb-12 text-center px-6">
            Great news! You are fully approved for a physical inspection at Lush
            Estate. Please share your preferred inspection day and time.
          </p>
          <button
            onClick={() => setOpenModal(true)}
            className="w-2xl bg-black text-white py-3 rounded-xl font-semibold hover:bg-black transition"
          >
            Schedule for a Physical Inspection
          </button>
        </div>
      );
    } else if (totalScore >= 14) {
      submittedContent = (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 text-lg mb-12 text-center px-6">
            You qualify for a physical inspection. Kindly send your preferred
            inspection day and time.
          </p>
          <button
            onClick={() => setOpenModal(true)}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Schedule for a Physical Inspection
          </button>
        </div>
      );
    } else if (totalScore >= 10) {
      submittedContent = (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 text-lg mb-10 text-center px-6">
            Based on your responses, we cannot schedule a physical inspection.
            Below is the virtual inspection video of Lush Estate.
          </p>
          <div className="w-full sm:w-11/12 lg:w-full relative">
            <video width="100%" controls className="rounded-xl shadow-lg mb-6">
              <source src="/videos/IMG_7307.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      );
    } else {
      submittedContent = (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thank You for your responses!
          </h1>
          <p className="text-gray-600 text-lg text-center px-6">
            Based on your responses, you are not fit for physical inspection.
            Our team will reach out to you when necessary.
          </p>
        </div>
      );
    }
  }

  // ---------------------------
  // Main return
  // ---------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 md:px-20">
      {!submitted ? (
        <motion.div
          className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            📝 Questionnaire
          </h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            {questions.map((question, index) => (
              <motion.div
                key={question._id}
                className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                  {index + 1}. {question.questionText}
                </h3>

                <div className="grid gap-3">
                  {question.options.map((option, i) => (
                    <label
                      key={i}
                      className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all ${
                        answers[question._id]?.text === option.text
                          ? "bg-blue-50 border-blue-400 text-blue-700"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option.text}
                        checked={answers[question._id]?.text === option.text}
                        onChange={() =>
                          handleAnswerChange(question._id, option)
                        }
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="mt-12 text-center">
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.05 }}
                className={`px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg transition-all ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-blue-600 to-green-500 text-white hover:shadow-2xl"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Answers"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      ) : (
        submittedContent
      )}

      {/* Modal for tour schedule */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-green-900 mb-4 text-center">
              Schedule for a Physical Inspection
            </h2>

            <form
              onSubmit={handleTourSchedule}
              className="space-y-4"
              noValidate
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={tourForm.date}
                  onChange={(e) => {
                    const { value } = e.target;
                    const today = new Date().toISOString().split("T")[0];
                    if (value < today) {
                      setErrors((prev) => ({
                        ...prev,
                        date: "You cannot select a past date.",
                      }));
                    } else {
                      setErrors((prev) => ({ ...prev, date: "" }));
                      handleChangeTourForm(e);
                    }
                  }}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.date
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-500"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={tourForm.time}
                  onChange={handleChangeTourForm}
                  required
                  className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.time
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-500"
                  }`}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                {tourLoading ? "Confirming ..." : "Confirm Schedule"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
