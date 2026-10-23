import { Clock } from "lucide-react";
import { BANDERAS } from "@/components/activacion/Banderas";
import { HORARIOS } from "@/components/activacion-v4/config";

type Props = {
  /** Versión pequeña, alineada a la izquierda (hero). */
  compacto?: boolean;
  /** Sobre fondo oscuro (tarjeta final). */
  oscuro?: boolean;
  /** Omite el primer país (el que ya se muestra aparte). */
  sinPrimero?: boolean;
  /** Sustituye el nombre mostrado de un país. */
  nombres?: Record<string, string>;
};

/**
 * Horarios por país como texto real. Reutiliza las banderas SVG de
 * /activacion (sólo se importan, no se modifican).
 */
export default function Av4Horarios({
  compacto = false,
  oscuro = false,
  sinPrimero = false,
  nombres = {},
}: Props) {
  const clases = [
    "av4-horarios",
    compacto ? "av4-horarios--compacto" : "",
    oscuro ? "av4-horarios--oscuro" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={clases} aria-label="Horarios por país">
      {(sinPrimero ? HORARIOS.slice(1) : HORARIOS).map(({ pais, hora }) => {
        const Bandera = BANDERAS[pais];
        return (
          <li key={pais} className="av4-horario">
            {Bandera && <Bandera className="av4-horario__flag" />}
            <span className="av4-horario__pais">{nombres[pais] ?? pais}</span>
            <span className="av4-horario__hora">
              <Clock size={13} strokeWidth={2} aria-hidden="true" />
              {hora}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
