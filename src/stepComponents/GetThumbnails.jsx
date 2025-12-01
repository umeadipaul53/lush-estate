export function getCloudinaryThumbnail(url) {
  if (!url.includes("res.cloudinary.com")) return null;

  // Extract everything after /upload/
  const parts = url.split("/upload/");
  const publicIdMP4 = parts[1];

  // Convert video.mp4 → video.jpg
  const publicIdJPG = publicIdMP4.replace(".mp4", ".jpg");

  // Generate thumbnail from the 1-second mark
  const thumbURL = `${parts[0]}/upload/so_1/${publicIdJPG}`;

  return thumbURL;
}
