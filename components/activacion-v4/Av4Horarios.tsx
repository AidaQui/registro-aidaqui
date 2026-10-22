import { Clock } from "lucide-react";
import { BANDERAS } from "@/components/activacion/Banderas";
import { HORARIOS } from "@/components/activacion-v4/config";

/**
 * Horarios por país como texto real. Reutiliza las banderas SVG de
 * /activacion (sólo se importan, no se modifican).
 */
export default function Av4Horarios() {
  return (
    <ul className="av4-horarios" aria-label="Horarios por país">
      {HORARIOS.map(({ pais, hora }) => {
        const Bandera = BANDERAS[pais];
        return (
          <li key={pais} className="av4-horario">
            {Bandera && <Bandera className="av4-horario__flag" />}
            <span className="av4-horario__pais">{pais}</span>
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
