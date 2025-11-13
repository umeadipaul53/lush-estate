import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

const faqs = [
  {
    id: 1,
    question: "Is Lush Estate secure?",
    videoSrc: "/videos/IMG_7307.mp4",
    summary: "Learn about our 24/7 security measures and surveillance.",
  },
  {
    id: 2,
    question: "How can I resell my plot?",
    videoSrc: "/videos/IMG_7307.mp4",
    summary: "Understand the process for reselling within our estate.",
  },
  {
    id: 3,
    question: "Is it government-approved?",
    videoSrc: "/videos/IMG_7307.mp4",
    summary: "See how we comply with all government regulations.",
  },
  {
    id: 4,
    question: "Are there recreational facilities?",
    videoSrc: "/videos/IMG_7307.mp4",
    summary: "Explore our parks, playgrounds, and leisure areas.",
  },
  // Add more FAQ videos as needed
];

const Step5 = ({ setIsNextEnabled }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const currentStep = 5; // Or pass as prop if dynamic

  // Get watchedSteps from Redux
  const watchedSteps = useSelector((state) => state.steps.watchedSteps);

  const [searchQuery, setSearchQuery] = useState("");
  const [watchedVideos, setWatchedVideos] = useState({});

  // Enable Next if all FAQ videos watched
  useEffect(() => {
    const allWatched = faqs.every((faq) => watchedVideos[faq.id]);
    if (allWatched) {
      setIsNextEnabled(true);
      dispatch(markStepWatched(currentStep));
    }
  }, [watchedVideos, currentStep, dispatch, setIsNextEnabled]);

  // Pre-fill if step already watched
  useEffect(() => {
    if (watchedSteps[currentStep]) {
      setIsNextEnabled(true);
      const watchedObj = {};
      faqs.forEach((faq) => (watchedObj[faq.id] = true));
      setWatchedVideos(watchedObj);
    }
  }, [watchedSteps, currentStep, setIsNextEnabled]);

  const handleVideoEnd = (id) => {
    setWatchedVideos((prev) => ({ ...prev, [id]: true }));
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-6">
        FAQ <span className="text-blue-600">Video Section</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg sm:text-xl text-center mb-10 leading-relaxed">
        Watch our short FAQ videos to answer your questions, clear doubts, and
        build trust. Use the search bar to quickly find answers!
      </p>

      {/* Search Bar */}
      <div className="w-full sm:w-3/4 mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQ..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* FAQ Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className={`flex flex-col items-center bg-white rounded-3xl shadow-lg p-4 transition-transform hover:scale-[1.02] duration-300 ${
              watchedVideos[faq.id] ? "border-4 border-green-500" : ""
            }`}
          >
            <h3 className="font-bold text-lg mb-2 text-center">
              {faq.question}
            </h3>
            <video
              controls
              onEnded={() => handleVideoEnd(faq.id)}
              className="w-full rounded-2xl shadow-md mb-2"
            >
              <source src={faq.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-500 text-sm text-center">{faq.summary}</p>
          </div>
        ))}
      </div>

      {/* <p className="mt-6 text-gray-500 text-sm">
        🔹 Watch all videos to unlock the next step.
      </p> */}
    </div>
  );
};

export default Step5;
