import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import styles from "./DiscoveryFolder.module.css";

type DiscoveryItem = {
  numero: string;
  titulo: string;
  texto: string;
};

type DiscoveryFolderProps = {
  title: string;
  subtitle: string;
  /** Versión corta para móvil: la larga se encima con el titular del sobre. */
  subtitleShort?: string;
  items: DiscoveryItem[];
};

type PaperStyle = CSSProperties & {
  "--magnet-x": string;
  "--magnet-y": string;
  "--paper-delay": string;
};

export default function DiscoveryFolder({
  title,
  subtitle,
  subtitleShort,
  items,
}: DiscoveryFolderProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* SIN CANDADO DE ANCHO: también en escritorio.

       El observador estaba limitado a 900px, así que en escritorio la
       carpeta sólo abría con el cursor encima. Quien bajaba sin pasar
       por ella no veía nunca el despliegue ni el contenido.

       El deslizamiento hacia abajo ya existía —.open .folder lleva su
       translateY— y era lo único que faltaba disparar aquí. */

    /* SIGUE LA SECCIÓN EN AMBOS SENTIDOS.

       Antes abría al entrar en pantalla y se desconectaba, así que una vez
       abierta se quedaba abierta para siempre: al subir de nuevo, las fichas
       seguían desplegadas tapando lo que hay encima.

       Ahora el estado es la visibilidad: entra y se abre, sale y se cierra. El
       observador no se desconecta para poder oír las dos cosas. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setOpen(entry.isIntersecting);
      },
      {
        /* El margen de ARRIBA es el que hace que cierre antes al subir.

           Con 0 arriba, la sección seguía contando como visible mientras le
           quedara un hilo asomando por el canto superior: para entonces las
           fichas desplegadas ya se estaban cruzando con la ficha de contacto.

           Con -20% deja de contar cuando aún le queda una quinta parte de la
           ventana por recorrer, así que se repliega antes de llegar a tocarla.
           El de abajo se queda igual: ese decide cuándo ABRE al bajar, y eso
           no hacía falta cambiarlo. */
        rootMargin: "-20% 0px -18% 0px",
        threshold: [0.28, 0.45],
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);



  function openFolder() {
    setOpen(true);
  }

  function toggleFolder() {
    setOpen((current) => !current);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleFolder();
  }

  function handlePaperMouseMove(event: MouseEvent<HTMLElement>) {
    if (!open) return;

    const paper = event.currentTarget;
    const rect = paper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (event.clientX - centerX) * 0.08;
    const offsetY = (event.clientY - centerY) * 0.08;

    paper.style.setProperty("--magnet-x", `${offsetX}px`);
    paper.style.setProperty("--magnet-y", `${offsetY}px`);
  }

  function resetPaperMagnet(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  }

  function renderPaper(item: DiscoveryItem, index: number, isClone = false) {
    const paperStyle: PaperStyle = {
      "--magnet-x": "0px",
      "--magnet-y": "0px",
      "--paper-delay": `${index * 120}ms`,
    };

    return (
      <article
        key={`${isClone ? "clone-" : ""}${item.numero}`}
        className={`${styles.paper} ${styles[`paper${index + 1}`]}`}
        style={paperStyle}
        aria-hidden={isClone || undefined}
        onMouseMove={handlePaperMouseMove}
        onMouseLeave={resetPaperMagnet}
      >
        <span className={styles.paperNumber}>{item.numero}</span>
        <h3 className={styles.paperTitle}>{item.titulo}</h3>
        <p className={styles.paperText}>{item.texto}</p>
      </article>
    );
  }

  /*
   * ARRASTRE DEL CARRUSEL EN MÓVIL.
   *
   * Las fichas se desplazan solas con una animación de CSS. Aquí se le da al
   * visitante el control: al apoyar el dedo la animación se congela, al mover
   * el dedo el carril sigue la mano, y al soltar vuelve a correr sola.
   *
   * ── POR QUÉ SE LEE LA POSICIÓN ANTES DE CONGELAR ──
   *
   * La animación vive en CSS, así que el navegador conoce la posición real
   * pero el DOM no. Si se pausara sin más y luego se aplicara un transform
   * propio, el carril saltaría de golpe al punto de partida. Por eso se lee la
   * matriz con getComputedStyle y el arrastre parte de ahí.
   *
   * ── POR QUÉ SE DEVUELVE EL CONTROL AL SOLTAR ──
   *
   * Se borra el transform propio y la animación retoma. El desplazamiento
   * queda donde lo dejó la animación, no donde lo dejó el dedo: es el precio
   * de no reimplementar el bucle entero en JS, y a cambio el movimiento nunca
   * se detiene, que es lo que se pidió.
   *
   * Punteros y no touch: el mismo código sirve para dedo, ratón y lápiz.
   */
  useEffect(() => {
    const carril = trackRef.current;
    if (!carril) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    let arrastrando = false;
    let inicioX = 0;
    let base = 0;

    const leerX = () => {
      const t = getComputedStyle(carril).transform;
      if (!t || t === "none") return 0;
      return new DOMMatrixReadOnly(t).m41;
    };

    const bajar = (e: PointerEvent) => {
      arrastrando = true;
      inicioX = e.clientX;
      base = leerX();
      carril.style.animationPlayState = "paused";
      carril.style.transform = "translateX(" + base + "px)";
      carril.classList.add(styles.dragging);
    };

    const mover = (e: PointerEvent) => {
      if (!arrastrando) return;
      const dx = e.clientX - inicioX;
      carril.style.transform = "translateX(" + (base + dx) + "px)";
    };

    /* Se borra el transform propio para que vuelva a mandar la animación:
       dejarlo puesto la anularía, porque gana el estilo en línea. */
    const soltar = () => {
      if (!arrastrando) return;
      arrastrando = false;
      carril.style.transform = "";
      carril.style.animationPlayState = "";
      carril.classList.remove(styles.dragging);
    };

    carril.addEventListener("pointerdown", bajar);
    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);

    return () => {
      carril.removeEventListener("pointerdown", bajar);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
    };
  }, [open]);

  return (
    <section
      id="lo-que-vas-a-descubrir"
      ref={sectionRef}
      className={styles.discovery}
    >
      <div className={`${styles.stage} ${open ? styles.open : ""}`}>
        <div className={styles.paperLayer} aria-hidden={!open}>
          <div className={styles.paperTrack} ref={trackRef}>
            <div className={styles.paperSet}>
              {items.map((item, index) => renderPaper(item, index))}
            </div>
            <div
              className={`${styles.paperSet} ${styles.paperCloneSet}`}
              aria-hidden="true"
            >
              {items.map((item, index) => renderPaper(item, index, true))}
            </div>
            <div
              className={`${styles.paperSet} ${styles.paperCloneSet}`}
              aria-hidden="true"
            >
              {items.map((item, index) => renderPaper(item, index, true))}
            </div>
          </div>
        </div>

        <div
          className={styles.folder}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-label={open ? "Cerrar carpeta" : "Abrir carpeta"}
          onMouseEnter={openFolder}
          onFocus={openFolder}
          onClick={toggleFolder}
          onKeyDown={handleKeyDown}
        >
          <div className={styles.folderBack} />
          <div className={styles.folderGlow} aria-hidden="true" />
          <div className={`${styles.folderFront} ${styles.folderFrontLeft}`} />
          <div className={`${styles.folderFront} ${styles.folderFrontRight}`} />
          <div className={styles.folderContent}>
            <span className={styles.folderKicker}>LECTURA</span>
            <strong className={styles.folderTitle}>{title}</strong>
          </div>
        </div>
      </div>

      {/* ── EL PIE, FUERA DEL SOBRE ──

          Vivía dentro de la solapa y ahí no se leía: la tapa lleva
          backdrop-filter, que crea contexto de apilamiento propio, y las
          fichas suben al pasar el cursor. Pelear ese z-index era insistir en
          un sitio que no le corresponde.

          Fuera del sobre el texto no compite con nada y se lee siempre, que
          es lo único que se le pedía.

          Las DOS versiones van al DOM y el CSS decide cuál se ve: elegirlo
          en JS con un ancho medido se resolvería tras la hidratación, y el
          móvil vería un instante la frase larga. */}
      <p className={styles.folderBrief}>
        <span className={styles.folderBriefLong}>{subtitle}</span>
        <span className={styles.folderBriefShort}>
          {subtitleShort ?? subtitle}
        </span>
      </p>
    </section>
  );
}
