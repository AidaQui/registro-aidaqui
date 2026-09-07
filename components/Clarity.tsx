import { useEffect } from "react";

const PROJECT_ID = "yeqib8abj0";

/**
 * Microsoft Clarity: mapas de calor y grabaciones de sesión.
 *
 * Solo corre en producción para que las visitas locales no ensucien los
 * datos del proyecto. NEXT_PUBLIC_CLARITY_PROJECT_ID permite apuntar a
 * otro proyecto sin tocar el código.
 */
export default function Clarity() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const projectId =
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || PROJECT_ID;

    // Import dinámico: la librería toca window al cargarse
    import("@microsoft/clarity").then(({ default: clarity }) => {
      clarity.init(projectId);
    });
  }, []);

  return null;
}
