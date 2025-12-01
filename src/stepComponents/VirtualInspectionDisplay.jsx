import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

export default function VirtualInspectionDisplay({
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

  // Enable next if completed or no videos
  useEffect(() => {
    setIsNextEnabled(watchedState?.completed || videos.length === 0);
  }, [watchedState, videos.length, setIsNextEnabled]);

  const handleVideoEnd = (idx) => {
    const updated = [...watched];
    updated[idx] = true;
    setWatched(updated);

    dispatch(markStepWatched({ stepNumber, videosWatched: updated }));

    if (updated.some((v) => v)) {
      setIsNextEnabled(true);
    }
  };

  // ===============================
  // Cloudinary optimized video + poster
  // ===============================
  const transformCloudinaryVideo = (url) => {
    if (!url) return { video: url, poster: "" };
    const parts = url.split("/upload/");
    if (parts.length !== 2) return { video: url, poster: "" };
    const publicId = parts[1].replace(".mp4", "");
    return {
      video: `${parts[0]}/upload/q_auto:good,f_auto/${publicId}`,
      poster: `${parts[0]}/upload/so_0/${publicId}.jpg`,
    };
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">{data.heading}</h1>

      <p className="text-gray-600 mb-6 text-center">{data.description}</p>

      {/* Disclaimer */}
      {videos.length > 0 && (
        <p className="text-red-600 font-semibold text-center mb-6">
          ⚠️ Please watch the video fully to proceed to the next step.
        </p>
      )}

      {/* Videos */}
      {videos.map((url, idx) => {
        const { video, poster } = transformCloudinaryVideo(url);
        return (
          <video
            key={idx}
            controls
            preload="metadata"
            poster={poster}
            className="w-full rounded-xl shadow-lg mb-6 bg-black"
            onEnded={() => handleVideoEnd(idx)}
          >
            <source src={video} type="video/mp4" />
          </video>
        );
      })}

      {/* Map */}
      {data.mapUrl && (
        <div className="mb-6 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <img
            src={data.mapUrl} // new prop for image URL
            alt="location map"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
