import { useEffect, useRef, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Datos = { nombre: string; email: string; telefono: string };

type Props = {
  /** Datos que llegan por la URL cuando se viene del registro */
  iniciales?: Datos;
  onListo: (datos: Datos) => void;
};

/*
 * Los tres datos de contacto, UN CAMPO POR VEZ Y SIN SALIR DE LA HERO.
 *
 * ── LOS PASOS OCURREN DENTRO DE LA PORTADA ──
 *
 * El titular, el subtítulo y la promesa NO se van: lo único que cambia entre
 * un paso y el siguiente es el campo. Eso es deliberado. Mandar cada paso a
 * una pantalla propia rompe tres veces el contexto que justifica rellenarlo,
 * y en cada corte se pierde gente que ya había empezado.
 *
 * La página solo cambia de verdad una vez: al pasar al diagnóstico. Ese corte
 * sí está ganado, porque marca que empieza otra cosa.
 *
 * ── UN CAMPO POR VEZ Y NO LOS TRES A LA VISTA ──
 *
 * Tres campos juntos se leen como un trámite y se evalúan antes de empezar;
 * uno solo se responde sin pensarlo, y cada respuesta dada aumenta la
 * probabilidad de dar la siguiente.
 *
 * ── ES UN <form> DE VERDAD ──
 *
 * Y no un div con un botón. Eso da gratis dos cosas que a mano cuestan
 * trabajo: la tecla Intro avanza —que es como se rellena un campo suelto— y
 * el teclado de los móviles muestra "Ir" en vez de un salto de línea.
 * `noValidate` desactiva los globos del navegador, cuyos mensajes salen en el
 * idioma del sistema y con un tono que no es el de la página.
 */

/* El compás de la entrada de cada paso, en milisegundos. Cambiando estos
   números se cambia el ritmo entero sin tocar el montaje. */
const RITMO = {
  distintivo: 0,
  etiqueta: 60,
  campo: 130,
  boton: 200,
} as const;

/* Cada paso dice para qué sirve el dato ANTES de pedirlo: nadie deja su
   teléfono sin saber a dónde va, y ese distintivo es lo que separa una
   conversación de un formulario. */
const PASOS = [
  {
    id: "nombre",
    distintivo: "Para personalizar tu lectura",
    etiqueta: "¿Cómo te llamas?",
    placeholder: "Tu nombre",
    boton: "CONTINUAR",
  },
  {
    id: "email",
    distintivo: "Aquí recibirás tu radiografía",
    etiqueta: "¿A qué correo te la enviamos?",
    placeholder: "tucorreo@ejemplo.com",
    boton: "CONTINUAR",
  },
  {
    id: "telefono",
    distintivo: "Solo para avisarte cuando esté lista",
    etiqueta: "¿Y tu WhatsApp?",
    placeholder: "Tu número",
    boton: "EMPEZAR MI RADIOGRAFÍA",
  },
] as const;

export default function FormularioContacto({ iniciales, onListo }: Props) {
  const [paso, setPaso] = useState(0);
  const [nombre, setNombre] = useState(iniciales?.nombre ?? "");
  const [email, setEmail] = useState(iniciales?.email ?? "");
  const [telefono, setTelefono] = useState<string | undefined>(
    iniciales?.telefono || undefined
  );
  const [error, setError] = useState("");
  const campoRef = useRef<HTMLInputElement>(null);
  /* El primer paso NO roba el foco al cargar: hacerlo desplazaría la página
     hasta el campo —saltándose el titular que justifica rellenarlo— y abriría
     el teclado en un móvil antes de que nadie lo haya pedido. A partir del
     segundo sí, porque ahí ya se está escribiendo. */
  const montado = useRef(false);

  const actual = PASOS[paso];

  useEffect(() => {
    if (!montado.current) {
      montado.current = true;
      return;
    }

    /* preventScroll: en móvil, enfocar un campo desplaza la página para
       dejarlo sobre el teclado. Como aquí el campo ya está donde tiene que
       estar, ese desplazamiento solo produce un salto.

       El teléfono se enfoca POR ID y no por ref: el ref de PhoneInput apunta
       a la instancia del componente de la librería, no al <input> de dentro. */
    if (actual.id === "telefono") {
      const elemento = document.getElementById("lm-telefono");
      if (elemento instanceof HTMLInputElement) {
        elemento.focus({ preventScroll: true });
      }
      return;
    }
    campoRef.current?.focus({ preventScroll: true });
  }, [actual.id]);

  function avanzar(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (paso === 0) {
      if (nombre.trim().length < 2) {
        setError("Escribe tu nombre para continuar.");
        return;
      }
      setPaso(1);
      return;
    }

    if (paso === 1) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError("Revisa el correo.");
        return;
      }
      setPaso(2);
      return;
    }

    if (!telefono || !isValidPhoneNumber(telefono)) {
      setError("Revisa el número de WhatsApp.");
      return;
    }

    onListo({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono,
    });
  }

  const idError = `lm-${actual.id}-error`;

  return (
    <div className="lm-pasos">
      {/* La barra dice cuánto queda: tres pasos cortos se sostienen; tres
          pasos sin final visible, no. */}
      <div className="lm-pasos__barra" aria-hidden="true">
        {PASOS.map((_, i) => (
          <span
            key={i}
            className={`lm-pasos__marca${i <= paso ? " is-on" : ""}`}
          />
        ))}
      </div>

      {/* La clave por paso reinicia la cascada de entrada en cada campo */}
      <form noValidate className="lm-form" onSubmit={avanzar} key={paso}>
        <p
          className="lm-form__badge dg-sube"
          style={{ animationDelay: `${RITMO.distintivo}ms` }}
        >
          {actual.distintivo}
        </p>

        <label
          className="lm-form__label dg-sube"
          style={{ animationDelay: `${RITMO.etiqueta}ms` }}
          htmlFor={`lm-${actual.id}`}
        >
          {actual.etiqueta}
        </label>

        <div
          className="lm-form__field dg-sube"
          style={{ animationDelay: `${RITMO.campo}ms` }}
        >
          {paso === 0 && (
            <input
              ref={campoRef}
              id="lm-nombre"
              name="nombre"
              type="text"
              inputMode="text"
              autoComplete="name"
              placeholder={actual.placeholder}
              className="lm-input"
              value={nombre}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? idError : undefined}
              onChange={(ev) => {
                setNombre(ev.target.value);
                if (error) setError("");
              }}
            />
          )}

          {paso === 1 && (
            <input
              ref={campoRef}
              id="lm-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={actual.placeholder}
              className="lm-input"
              value={email}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? idError : undefined}
              onChange={(ev) => {
                setEmail(ev.target.value);
                if (error) setError("");
              }}
            />
          )}

          {paso === 2 && (
            <PhoneInput
              id="lm-telefono"
              name="telefono"
              international
              countryCallingCodeEditable={false}
              defaultCountry="ES"
              placeholder={actual.placeholder}
              className="espera-phone lm-phone"
              value={telefono}
              onChange={(v) => {
                setTelefono(v ?? undefined);
                if (error) setError("");
              }}
            />
          )}
        </div>

        {/* role="alert" para que el error se lea en cuanto aparece, sin
            esperar a que el visitante navegue hasta él. */}
        {error && (
          <p id={idError} className="lm-form__error" role="alert">
            {error}
          </p>
        )}

        {/* El botón de atrás es cuadrado y el de avanzar ocupa lo que sobra:
            si midieran lo mismo, retroceder y avanzar pesarían igual, y solo
            uno de los dos es el camino. En el primer paso no se dibuja,
            porque desde ahí no hay a dónde volver. */}
        <div
          className="lm-form__row dg-sube"
          style={{ animationDelay: `${RITMO.boton}ms` }}
        >
          {paso > 0 && (
            <button
              type="button"
              className="lm-form__back"
              onClick={() => {
                setError("");
                setPaso((previo) => previo - 1);
              }}
              aria-label="Volver al paso anterior"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <button type="submit" className="pearl-btn espera-cta lm-form__cta">
            <div className="pearl-wrap">
              <p>
                <span className="pearl-star" aria-hidden="true">
                  ✦
                </span>
                {actual.boton}
                <span className="pearl-star" aria-hidden="true">
                  ✦
                </span>
              </p>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
