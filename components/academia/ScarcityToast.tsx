"use client";
import { useEffect, useRef, useState } from "react";

interface Toast {
  id: number;
  name: string;
  country: string;
  order: string;
  seats: number;
}

const NAMES = [
  "Valentina M.", "Sofía R.", "Lucía G.", "Camila T.", "Martina F.",
  "Isabella C.", "Daniela P.", "Fernanda A.", "Carolina S.", "Natalia V.",
  "Gabriela L.", "Romina B.", "Florencia N.", "Paola E.", "Adriana K.",
];
const COUNTRIES = ["🇦🇷", "🇲🇽", "🇨🇱", "🇨🇴", "🇪🇸", "🇺🇾", "🇵🇪", "🇻🇪"];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomOrder() {
  return String(Math.floor(Math.random() * 90000) + 10000);
}

interface Props {
  currentSeats: number;
  active: boolean;
}

export default function ScarcityToast({ currentSeats, active }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);
  const seatsRef = useRef(currentSeats);

  useEffect(() => { seatsRef.current = currentSeats; }, [currentSeats]);

  useEffect(() => {
    if (!active) return;

    function spawnToast() {
      const id = ++counterRef.current;
      const toast: Toast = {
        id,
        name: random(NAMES),
        country: random(COUNTRIES),
        order: randomOrder(),
        seats: seatsRef.current,
      };

      setToasts((prev) => [toast, ...prev].slice(0, 3));

      // Auto-remove after 4s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);

      // Next toast in 18–35s
      const delay = 18000 + Math.random() * 17000;
      setTimeout(spawnToast, delay);
    }

    // First toast after 6–12s
    const init = setTimeout(spawnToast, 6000 + Math.random() * 6000);
    return () => clearTimeout(init);
  }, [active]);

  if (toasts.length === 0) return null;

  return (
    <div className="scarcity-toasts" aria-live="polite" aria-label="Nuevas inscripciones">
      {toasts.map((t) => (
        <div key={t.id} className="scarcity-toast">
          <div className="scarcity-toast__stripe">
            {/* Stripe wordmark SVG */}
            <svg viewBox="0 0 60 25" aria-label="Stripe" role="img" className="scarcity-toast__stripe-logo">
              <path
                fill="#635BFF"
                d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a10.16 10.16 0 0 1-4.56 1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.43 0 .44-.04 1.1-.06 1.65zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.92-1.04l-.02 4.63-4.45.94V5.86h3.96l.19 1.05c.58-.7 1.7-1.33 3.23-1.33 3.22 0 6.01 2.86 6.01 7.4 0 5.21-2.91 7.32-6 7.32zm-1.06-11.3c-.86 0-1.51.35-1.88.8l.03 5.88c.35.44.99.8 1.85.8 1.56 0 2.54-1.44 2.54-3.75 0-2.14-.98-3.73-2.54-3.73zM28.24 5.86h4.46v14.2h-4.46V5.86zm0-4.74 4.46-.95v3.56l-4.46.94V1.12zm-2.75 8.36-.28-1.48h-3.84v12.8h4.45v-8.5c1.05-1.37 2.83-1.12 3.38-.94V5.86c-.56-.19-2.69-.51-3.71 1.62zm-9.76-3.22 4.39-.93V5.8l-4.39.94V6.26zm0 1.57h4.39v12.23h-4.39V7.83zM4.85 9.01c0-.62.52-.87 1.38-.87 1.23 0 2.78.38 4.01 1.05V5.14a13.3 13.3 0 0 0-4.01-.61C2.62 4.53 0 6.37 0 9.29c0 4.5 6.16 3.77 6.16 5.71 0 .73-.64 1-1.56 1-1.36 0-3.08-.56-4.44-1.31v4.11a11.26 11.26 0 0 0 4.44.93c3.35 0 5.65-1.66 5.65-4.62-.01-4.86-6.4-3.98-6.4-6.1z"
              />
            </svg>
          </div>
          <div className="scarcity-toast__body">
            <p className="scarcity-toast__name">
              {t.country} {t.name} acaba de inscribirse
            </p>
            <p className="scarcity-toast__detail">
              Orden #{t.order} · Quedan <strong>{t.seats}</strong> cupos
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
