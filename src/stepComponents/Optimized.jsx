// cloudinaryOptimizer.js
export function getCloudinaryHLS(url) {
  if (!url.includes("res.cloudinary.com")) return { hls: null, mp4: url };

  // Extract public ID ("folder/name" without extension)
  const parts = url.split("/upload/");
  const publicId = parts[1].replace(".mp4", "");

  // HLS stream
  const hlsUrl = `${parts[0]}/upload/f_auto,vc_auto,br_auto/${publicId}.m3u8`;

  // Optimized MP4 fallback
  const mp4Url = url.replace("/upload/", "/upload/q_auto:eco,f_auto,vc_auto/");

  return { hls: hlsUrl, mp4: mp4Url };
}
