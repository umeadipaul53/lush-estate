import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

export default function TrustCredibilityDisplay({
  data,
  stepNumber,
  setIsNextEnabled,
}) {
  const dispatch = useDispatch();
  const watchedState = useSelector(
    (state) => state.steps.watchedSteps[stepNumber]
  );

  useEffect(() => {
    // Next button should always be active for this step
    setIsNextEnabled(true);

    // Mark step as completed in Redux if not already
    dispatch(
      markStepWatched({ stepNumber, videosWatched: [], completed: true })
    );
  }, [setIsNextEnabled, dispatch, stepNumber]);

  // Cloudinary optimized video + poster
  const transformCloudinaryVideo = (url) => {
    if (!url) return { video: null, poster: null };

    // If the video is an array, use the first one
    const videoUrl = Array.isArray(url) ? url[0] : url;

    if (typeof videoUrl !== "string") return { video: null, poster: null };

    const parts = videoUrl.split("/upload/");
    if (parts.length !== 2) return { video: videoUrl, poster: null };

    const publicId = parts[1].replace(".mp4", "");
    return {
      video: `${parts[0]}/upload/q_auto:good,f_auto/${publicId}.mp4`, // Keep .mp4
      poster: `${parts[0]}/upload/so_0/${publicId}.jpg`,
    };
  };

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4 text-center">{data.heading}</h1>
      <p className="text-gray-600 mb-6 text-center">{data.description}</p>

      {/* Certificates */}
      {data.certificates?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Certificates</h4>
          <div className="flex flex-wrap gap-4">
            {data.certificates.map((c, idx) => (
              <img
                key={idx}
                src={c}
                alt={`certificate-${idx}`}
                className="w-32 h-20 object-cover rounded"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}

      {/* Past Projects */}
      {data.pastProjects?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Past Projects</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.pastProjects.map((p, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border p-2 bg-white"
              >
                <div className="flex gap-2">
                  <img
                    src={p.beforeImage}
                    alt="before"
                    className="w-1/2 rounded"
                    loading="lazy"
                  />
                  <img
                    src={p.afterImage}
                    alt="after"
                    className="w-1/2 rounded"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {data.testimonials?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Testimonials</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.testimonials.map((t, idx) => {
              const { video, poster } = transformCloudinaryVideo(t.video);

              return (
                <div key={idx} className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-medium">{t.name}</h5>
                  <p className="text-gray-600 mb-2">{t.text}</p>

                  {video && (
                    <div className="rounded-md overflow-hidden">
                      <video
                        controls
                        preload="metadata"
                        poster={poster}
                        className="w-full rounded-md"
                      >
                        <source src={video} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Awards */}
      {data.awards?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Awards</h4>
          <div className="flex gap-4 flex-wrap">
            {data.awards.map((a, idx) => (
              <img
                key={idx}
                src={a}
                alt={`award-${idx}`}
                className="w-24 h-24 object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
