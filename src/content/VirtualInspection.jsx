import { useState } from "react";

const VirtualInspection = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  // Cloudinary video URL
  const videoUrl =
    "https://res.cloudinary.com/dow1r4ph8/video/upload/v1764247852/Virtual_inspection_to_Lush_Estate_Phase_3_uk42am.mp4";

  // Generate thumbnail automatically from Cloudinary
  // Transformation: take frame at 1 second (so_1)
  const thumbnailUrl =
    "https://res.cloudinary.com/dow1r4ph8/video/upload/so_1/v1764247852/Virtual_inspection_to_Lush_Estate_Phase_3_uk42am.jpg";

  return (
    <section className="relative py-32 bg-zinc-900 overflow-hidden text-center">
      {/* Light subtle radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.02),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="uppercase tracking-widest text-sm text-white mb-2">
            Virtual Estate Tour
          </p>

          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            60-Second Virtual Inspection
          </h2>

          <p className="text-white text-lg">
            Road network • Perimeter fencing • Drone flyover • Soil type
          </p>
        </div>

        {/* Video Thumbnail Card */}
        <div
          onClick={() => setActiveVideo(videoUrl)}
          className="max-w-4xl mx-auto relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Light glass overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm transition group-hover:bg-white/20" />

          {/* Thumbnail generated from Cloudinary */}
          <img
            src={thumbnailUrl}
            alt="Virtual Inspection"
            className="w-full rounded-2xl object-cover"
          />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black text-3xl font-bold shadow-lg transition group-hover:scale-110">
              ▶
            </div>
          </div>
        </div>

        {/* CTA */}
        {/* <div className="mt-12">
          <button className="px-12 py-4 bg-white text-black font-semibold rounded-xl hover:scale-105 transition">
            Start Virtual Inspection
          </button>
        </div> */}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-yellow-500 transition"
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

export default VirtualInspection;
