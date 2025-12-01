import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

export default function FaqDisplay({ data, stepNumber, setIsNextEnabled }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Enable next immediately
    setIsNextEnabled(true);

    // Mark the step as completed in Redux so StepLayout allows navigation
    dispatch(
      markStepWatched({ stepNumber, videosWatched: [], completed: true })
    );
  }, [setIsNextEnabled, dispatch, stepNumber]);

  const questions = Array.isArray(data?.questions) ? data.questions : [];

  const transformCloudinaryVideo = (url) => {
    if (!url || typeof url !== "string") return { video: "", poster: "" };
    const parts = url.split("/upload/");
    if (parts.length !== 2) return { video: url, poster: "" };
    const publicId = parts[1].replace(".mp4", "");
    return {
      video: `${parts[0]}/upload/q_auto:good,f_auto/${publicId}.mp4`, // <-- keep .mp4
      poster: `${parts[0]}/upload/so_0/${publicId}.jpg`,
    };
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">
        {data?.heading || "FAQ"}
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        {data?.description || ""}
      </p>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const qVideos = !q.video
            ? []
            : Array.isArray(q.video)
            ? q.video
            : [q.video];

          return (
            <div key={qIdx} className="bg-white rounded-xl p-4 shadow">
              <h4 className="font-semibold mb-2">{q.heading || ""}</h4>
              <p className="text-gray-600 mb-3">{q.description || ""}</p>

              {qVideos.map((vid, vIdx) => {
                const { video, poster } = transformCloudinaryVideo(vid);
                if (!video) return null;

                return (
                  <video
                    key={vIdx}
                    controls
                    preload="metadata"
                    poster={poster}
                    className="w-full rounded-lg mb-3 bg-black"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
