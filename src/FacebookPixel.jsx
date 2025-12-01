import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView'); // Track every page change
    }
  }, [location]);

  return null;
}