import { createContext, useContext, type ReactNode } from "react";
import { CONTENIDO_V4, type Contenido } from "@/components/activacion-v4/contenido";

/* El default es el copy de v4: las páginas que no envuelven nada (v4 y su
   gracias) siguen igual. Las variantes pasan su propio Contenido. */
const Av4ContenidoContext = createContext<Contenido>(CONTENIDO_V4);

export function Av4ContenidoProvider({
  contenido,
  children,
}: {
  contenido: Contenido;
  children: ReactNode;
}) {
  return (
    <Av4ContenidoContext.Provider value={contenido}>
      {children}
    </Av4ContenidoContext.Provider>
  );
}

export function useContenido(): Contenido {
  return useContext(Av4ContenidoContext);
}
