import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions as fetchQuestionsAction,
  answerQuestions,
} from "../reducers/questionaireReducer";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { question, error } = useSelector((state) => state.questionaire);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await dispatch(fetchQuestionsAction()).unwrap();
        // make sure you access the right field depending on your backend response
        setQuestions(res?.data?.questions || res || []);
      } catch (err) {
        console.error("Failed to load questions:", err);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [dispatch]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevents default form behavior

    const questionsIdArray = questions.map((q) => q._id);
    const answersArray = questionsIdArray.map((id) => answers[id] || null);

    if (answersArray.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(
        answerQuestions({
          questionsIdArray,
          answersArray,
        })
      ).unwrap();
      setSubmitted(true);
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 3000);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit your answers. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------
  // Loading State
  // -------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  // -------------------
  // Submitted State
  // -------------------
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 text-lg ml-5 mr-5">
          Your responses have been successfully submitted. we will contact you
          soon. You can still reach us via whatsapp (+234) 8160754183
        </p>
      </div>
    );
  }

  // -------------------
  // Main Form
  // -------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 md:px-20">
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
                      answers[question._id] === option
                        ? "bg-blue-50 border-blue-400 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span>{option}</span>
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
    </div>
  );
};

export default Questionnaire;
