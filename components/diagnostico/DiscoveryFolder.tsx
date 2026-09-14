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
  items,
}: DiscoveryFolderProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
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

  return (
    <section
      id="lo-que-vas-a-descubrir"
      ref={sectionRef}
      className={styles.discovery}
    >
      <div className={`${styles.stage} ${open ? styles.open : ""}`}>
        <div className={styles.paperLayer} aria-hidden={!open}>
          <div className={styles.paperTrack}>
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
            <p className={styles.folderBrief}>{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
