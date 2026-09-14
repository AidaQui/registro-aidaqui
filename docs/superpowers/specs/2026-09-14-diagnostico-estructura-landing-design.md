# /diagnostico — réplica estructural de la landing de referencia

Fecha: 2026-09-14

## Qué se persigue

Reorganizar la landing de `/diagnostico` para que siga el mismo esqueleto que la
landing equivalente del proyecto "volver al origen" (Pilar Sousa), conservando
la identidad visual de AidaQui: violeta `#290066` sobre crema, dorado reservado
a la palabra "ADN", Fraunces para titulares y Jost para texto.

Se replica **la estructura**, no la estética: nada de paleta verde/crema,
GridScan ni bordes giratorios.

## Estructura

Hoy la página entera cuelga de `.dg-page__shell` (860 px centrados) en una
columna plana. Pasa a:

    .dg-page                  fondo bg-2.jpg — sin cambios
    |
    +- HERO .dg-hero          sangra de canto a canto, fondo = HelixCanvas
    |    AcademiaBadge
    |    h1 "Radiografía de tu ADN"   (dorado en ADN, ya existía)
    |    subtítulo
    |    promesa
    |
    +- PANEL .dg-panel        sube sobre el hero, esquinas sup. redondeadas
    |    FormularioContacto
    |    tarjeta .dg-card
    |      bloqueTitulo + bloqueSubtitulo
    |      4 puntos (01–04)
    |      hueco reservado .dg-adn-slot
    |
    +- FOOTER                 copyright — sin cambios

El shell de 860 px deja de envolver la página y pasa a ser el ancho interno de
cada bloque. Eso es justo lo que permite que hero y panel sangren.

Las otras tres fases (quiz, escaneando, resultado) **siguen dentro del shell**,
centradas exactamente como antes.

## Atmósfera

**Hero** — `HelixCanvas` de fondo, `aria-hidden` y sin captura de puntero.
Lleva `min-height` propio porque el lienzo se mide con `getBoundingClientRect`:
sin alto suficiente la espiral sale aplastada. Se rebaja con `opacity` y se
ralentiza para que sea atmósfera y no el asunto de la sección. Máscara radial
para que no corte en seco contra los bordes.

**Panel** — esquinas superiores redondeadas (2.5 rem en móvil, 5 rem desde
768 px) y fondo propio: el degradado `#fdfaf5 → #f4ecfa` que ya existía en
`.dg-intro__locked`, con borde `rgba(155,126,200,.25)`. Se siente elevado sin
introducir un solo color nuevo.

**Descartado**: Lenis y el desenfoque de viewport. La referencia los monta
porque su landing es un recorrido largo de scroll; ésta cabe casi en una
pantalla.

## El hueco del ADN

`.dg-adn-slot`: contenedor vacío con proporción 16:9 dentro de la tarjeta, bajo
los 4 puntos. Reutiliza el marco y el degradado de `.dg-intro__locked`, que
estaba huérfano desde el revert `e7d0fd6`.

Va **vacío a propósito**. Fija el sitio y la proporción para que montar la
animación después no desplace nada de lo que tiene encima.

## Contenido

`LANDING` en `components/diagnostico/resultados.ts` no necesita campos nuevos:
`titulo`, `subtitulo`, `promesa`, `bloqueTitulo`, `bloqueSubtitulo` y `puntos`
cubren toda la estructura.

El footer de la referencia lleva un tagline de marca. AidaQui no tiene uno, así
que el pie se queda sólo con el copyright.

## Qué no cambia

- Las cuatro fases en una sola ruta y el porqué de esa decisión.
- La lógica: cálculo del patrón, `/api/diagnostico`, validaciones del
  formulario, `Cuestionario`, `Escaneando` y `Resultado`.
- Las otras cuatro landings. Todo el CSS nuevo va bajo prefijo `dg-` y se
  añade al final de `styles/globals.css`, donde ya vive el bloque del
  diagnóstico (8462–9661).

## Riesgo conocido

`styles/globals.css` son 9.661 líneas para las cinco landings. Las reglas
nuevas se añaden al final, sin tocar ninguna existente salvo las que la propia
reorganización deja sin uso.
