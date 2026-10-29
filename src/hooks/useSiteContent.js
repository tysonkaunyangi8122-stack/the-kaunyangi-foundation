import { useEffect, useState } from "react";
import defaults from "../content/site.json";

export function useSiteContent() {
  const [content, setContent] = useState(defaults);

  useEffect(() => {
    let active = true;
    fetch("/api/site-content", { headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error("Content service is not available");
        return response.json();
      })
      .then((savedContent) => {
        if (active && savedContent && typeof savedContent === "object") setContent(savedContent);
      })
      .catch(() => {
        // The bundled, reviewed content remains the local and offline fallback.
      });

    return () => { active = false; };
  }, []);

  return content;
}
