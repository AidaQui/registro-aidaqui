import { useState } from "react";
import { Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const videoIds = [
  "yDlrPtgySAk",
  "yWcKJpUuFos",
  "W_qVZrf_Ff0",
  "xA9vpFkdL4Y",
  "EBq8Z5dOkb8",
  "VnP3niC6ouo",
];

export default function VideoTestimonialsSection() {
  const ref = useScrollReveal<HTMLElement>();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section ref={ref} className="vtesti" aria-labelledby="vtesti-title">
      <div className="vtesti-bg" aria-hidden="true" />

      <div className="vtesti-shell">
        <h2 id="vtesti-title" className="vtesti-title" data-reveal="title">
          Testimonios <em>en video</em>
        </h2>

        <ul className="vtesti-grid" data-reveal-group data-reveal-fade>
          {videoIds.map((id) => (
            <li key={id} className="vtesti-card">
              {playing === id ? (
                <iframe
                  className="vtesti-frame"
                  src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                  title="Testimonio en video sobre la Academia ADN"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="vtesti-thumb"
                  onClick={() => setPlaying(id)}
                  aria-label="Reproducir testimonio en video"
                  style={{
                    backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`,
                  }}
                >
                  <span className="vtesti-play" aria-hidden="true">
                    <Play size={26} strokeWidth={2.4} fill="currentColor" />
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
