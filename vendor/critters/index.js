/*
 * `experimental.optimizeCss` hace `require('critters')` (ver
 * next/dist/server/post-process.js). Este paquete local cumple ese nombre:
 *
 *  - Usa beasties, el fork mantenido de critters, con la misma API.
 *  - En Vercel los <link> de CSS llevan `?dpl=<deployment>` (skew protection).
 *    Critters/beasties buscan el archivo con ese query en el nombre, no lo
 *    encuentran y no inlinean nada. Acá se quita el query antes de leerlo.
 *  - Inlinea TODOS los @font-face de las hojas diferidas. Beasties sólo deja
 *    los de familias que ve en `font-family`, y next/font las usa vía
 *    `var(--font-…)`, que no resuelve: sin esto las fuentes empezaban a bajar
 *    recién con el CSS diferido y el JS que mide texto medía con la fuente de
 *    respaldo. Un @font-face no descarga nada hasta que la fuente se usa.
 */
const fs = require("fs");
const path = require("path");
const Beasties = require("beasties");

const sinQuery = (href) => href.replace(/[?#].*$/, "");

class Critters extends Beasties {
  getCssAsset(href, style) {
    return super.getCssAsset(sinQuery(href), style);
  }

  async process(html) {
    const out = await super.process(html);
    const { path: distDir, publicPath = "/_next/" } = this.options;
    const prefix = publicPath.replace(/\/?$/, "/");
    const hojas = new Set();
    for (const m of out.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)) {
      const href = (m[0].match(/href="([^"]+)"/) || [])[1];
      if (href && href.startsWith(prefix)) hojas.add(sinQuery(href));
    }
    const caras = [];
    for (const href of hojas) {
      let css;
      try {
        css = fs.readFileSync(path.join(distDir, href.slice(prefix.length)), "utf8");
      } catch {
        continue;
      }
      const dir = path.posix.dirname(href);
      for (const cara of css.match(/@font-face\s*\{[^}]*\}/g) || []) {
        // url(../media/x.woff2) es relativa a la hoja: se pasa a absoluta.
        caras.push(
          cara.replace(/url\((['"]?)(?!data:|https?:|\/)([^'")]+)\1\)/g, (_, q, u) =>
            `url(${q}${path.posix.normalize(`${dir}/${u}`)}${q})`
          )
        );
      }
    }
    if (!caras.length) return out;
    const unicas = [...new Set(caras)].join("");
    return out.replace(/<head([^>]*)>/, `<head$1><style data-font-faces>${unicas}</style>`);
  }
}

module.exports = Critters;
