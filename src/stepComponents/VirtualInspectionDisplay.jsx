import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

export default function VirtualInspectionDisplay({
  data,
  stepNumber,
  setIsNextEnabled,
}) {
  const dispatch = useDispatch();

  // Get previously watched state from Redux
  const watchedState = useSelector(
    (state) => state.steps.watchedSteps[stepNumber]
  );

  const videos = !data.video
    ? []
    : Array.isArray(data.video)
    ? data.video
    : [data.video];

  // Initialize watched array from Redux or all false
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

  const handleVideoEnd = (idx) => {
    const updated = [...watched];
    updated[idx] = true;
    setWatched(updated);

    // Update Redux store
    dispatch(markStepWatched({ stepNumber, videosWatched: updated }));

    // Enable next if at least one video watched
    if (updated.some((v) => v)) {
      setIsNextEnabled(true);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">{data.heading}</h1>
      <p className="text-gray-600 mb-6 text-center">{data.description}</p>

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

      {data.mapUrl && (
        <div className="mb-6 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            title="map"
            src={data.mapUrl}
            width="100%"
            height="350"
            className="border-0"
          />
        </div>
      )}
    </div>
  );
}
