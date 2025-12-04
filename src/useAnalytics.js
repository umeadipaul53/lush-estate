import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-3374EQEWTW", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};
