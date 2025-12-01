import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

export default function WhyEstateDisplay({
  data,
  stepNumber,
  setIsNextEnabled,
}) {
  const dispatch = useDispatch();

  const watchedState = useSelector(
    (state) => state.steps.watchedSteps[stepNumber]
  );

  const videos = !data.video
    ? []
    : Array.isArray(data.video)
    ? data.video
    : [data.video];

  const [watched, setWatched] = useState(
    watchedState?.videosWatched || Array(videos.length).fill(false)
  );

  // Enable next if step already completed or no videos
  useEffect(() => {
    if (watchedState?.completed || videos.length === 0) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [watchedState, videos.length, setIsNextEnabled]);

  const handleVideoEnd = (index) => {
    const updated = [...watched];
    updated[index] = true;
    setWatched(updated);

    // Update Redux
    dispatch(markStepWatched({ stepNumber, videosWatched: updated }));

    // At least one video watched → enable next
    if (updated.some((w) => w)) {
      setIsNextEnabled(true);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
        {data.heading}
      </h1>
      <p className="text-gray-600 text-lg text-center mb-8">
        {data.description}
      </p>

      {videos.map((url, idx) => (
        <video
          key={idx}
          controls
          className="w-full rounded-xl shadow-lg mb-6"
          onEnded={() => handleVideoEnd(idx)}
        >
          <source src={url} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
