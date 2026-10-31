import { Html, Head, Main, NextScript } from "next/document";

/*
 * Google Tag Manager — los dos contenedores, con carga diferida.
 *
 * El snippet de cada contenedor es el oficial, sin cambios; lo único distinto
 * es CUÁNDO corre: después del evento `load` y con el navegador ocioso, no en
 * el <head>. En mobile, GTM bajaba ~600 KB y ocupaba el hilo principal justo
 * cuando había que pintar el hero: con él cargando de entrada el LCP medía
 * 13 s, sin él 7 s. El PageView sigue disparando en cuanto la página cargó;
 * sólo se pierde quien se va antes de que termine de cargar.
 *
 * El gtag directo (G-BF1P6HS3NX) es otra propiedad de GA4, distinta de la que
 * dispara GTM; se mantiene y carga en el mismo momento diferido.
 */
const GTM_IDS = ["GTM-KD4P3B9P", "GTM-PNMMQZZH"];
const GA_ID = "G-BF1P6HS3NX";

const gtmDiferido = `
(function(){
  var ids=${JSON.stringify(GTM_IDS)};
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){dataLayer.push(arguments);};
  gtag('js',new Date());
  gtag('config','${GA_ID}');
  function gtm(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}
  function gtagJs(){var j=document.createElement('script');j.async=true;
  j.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(j);}
  function cargar(){ids.forEach(function(id){gtm(window,document,'script','dataLayer',id);});gtagJs();}
  function ocioso(){
    if('requestIdleCallback' in window) requestIdleCallback(cargar,{timeout:2000});
    else setTimeout(cargar,1);
  }
  if(document.readyState==='complete') ocioso();
  else window.addEventListener('load',ocioso);
})();
`;

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: gtmDiferido }} />
      </Head>

      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        {GTM_IDS.map((id) => (
          <noscript key={id}>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${id}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ))}

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
