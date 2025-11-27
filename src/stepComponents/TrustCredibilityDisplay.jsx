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
    // Enable next immediately
    setIsNextEnabled(true);

    // Mark step as completed in Redux if not already
    if (!watchedState?.completed) {
      dispatch(markStepWatched({ stepNumber, videosWatched: [] }));
    }
  }, [setIsNextEnabled, dispatch, stepNumber, watchedState]);

  return (
    <div>
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
                  />
                  <img
                    src={p.afterImage}
                    alt="after"
                    className="w-1/2 rounded"
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
            {data.testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow">
                <h5 className="font-medium">{t.name}</h5>
                <p className="text-gray-600 mb-2">{t.text}</p>
                {t.video && (
                  <video controls className="w-full rounded-md">
                    <source src={t.video} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
