import { useState } from "react";

/**
 * Generates Cloudinary thumbnail from video URL
 * @param {string} videoUrl
 */
const getCloudinaryThumbnail = (videoUrl) => {
  return videoUrl.replace("/video/upload/", "/video/upload/so_2,f_jpg/");
};

const testimonials = [
  {
    name: "Mr. Chinedu Okafor",
    role: "Early Investor",
    videoUrl:
      "https://res.cloudinary.com/dow1r4ph8/video/upload/v1764252169/a_client_testimonial_edyrzp.mp4",
  },
  {
    name: "Mrs. Blessing Uche",
    role: "Land Owner",
    videoUrl:
      "https://res.cloudinary.com/dow1r4ph8/video/upload/v1764252178/client_testimonials_my9kan.mp4",
  },
  {
    name: "Engr. Samuel Eze",
    role: "Property Investor",
    videoUrl:
      "https://res.cloudinary.com/dow1r4ph8/video/upload/v1764252165/client_testimonialss_hkbvel.mp4",
  },
];

const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-14">
          Hear From Verified Investors
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => {
            const thumbnail = getCloudinaryThumbnail(t.videoUrl);

            return (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
                onClick={() => setActiveVideo(t.videoUrl)}
              >
                {/* Thumbnail */}
                <img
                  src={thumbnail}
                  alt={t.name}
                  className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold shadow-lg">
                    ▶
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-left bg-black/80 backdrop-blur">
                  <h4 className="font-semibold text-lg">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-white transition"
            >
              ✕
            </button>

            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
