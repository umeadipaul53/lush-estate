import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

export default function FaqDisplay({ data, stepNumber, setIsNextEnabled }) {
  const dispatch = useDispatch();

  const watchedState = useSelector(
    (state) => state.steps.watchedSteps[stepNumber]
  );

  const questions = data.questions || [];

  // Flatten all videos across questions
  const videos = questions.flatMap((q) =>
    !q.video ? [] : Array.isArray(q.video) ? q.video : [q.video]
  );

  const [watchedVideos, setWatchedVideos] = useState(
    watchedState?.videosWatched || Array(videos.length).fill(false)
  );

  // Enable next if all videos already watched or no videos
  useEffect(() => {
    if (watchedState?.completed || videos.length === 0) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(watchedVideos.some((v) => v));
    }
  }, [watchedState, videos.length, watchedVideos, setIsNextEnabled]);

  const handleVideoEnd = (index) => {
    const updated = [...watchedVideos];
    updated[index] = true;
    setWatchedVideos(updated);

    // Update Redux store
    dispatch(markStepWatched({ stepNumber, videosWatched: updated }));

    if (updated.some((v) => v)) {
      setIsNextEnabled(true);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">{data.heading}</h1>
      <p className="text-gray-600 mb-6 text-center">{data.description}</p>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const qVideos = !q.video
            ? []
            : Array.isArray(q.video)
            ? q.video
            : [q.video];

          return (
            <div key={qIdx} className="bg-white rounded-xl p-4 shadow">
              <h4 className="font-semibold mb-2">{q.heading}</h4>
              <p className="text-gray-600 mb-3">{q.description}</p>

              {qVideos.map((vid, vIdx) => {
                // Calculate flat index for Redux state
                const flatIndex =
                  questions
                    .slice(0, qIdx)
                    .reduce(
                      (acc, item) =>
                        acc +
                        (!item.video
                          ? 0
                          : Array.isArray(item.video)
                          ? item.video.length
                          : 1),
                      0
                    ) + vIdx;

                return (
                  <video
                    key={vIdx}
                    controls
                    className="w-full rounded-lg mb-3"
                    onEnded={() => handleVideoEnd(flatIndex)}
                  >
                    <source src={vid} type="video/mp4" />
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
