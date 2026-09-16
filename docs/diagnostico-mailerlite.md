# Radiografía de tu ADN — configuración en MailerLite

Documento para quien administra MailerLite. Describe qué le va a llegar desde
la web y qué hay que dejar montado para recibirlo.

La conexión técnica ya está hecha: la web ya sabe hablar con MailerLite. Lo
que falta es lo que solo se puede hacer desde dentro de la cuenta.

---

## Resumen de lo que hay que crear

1. Un **campo personalizado** llamado `patron_dominante`
2. Un **grupo** para este embudo
3. **Siete correos**, uno por patrón, cada uno con su vídeo
4. Una **automatización** que elija el correo según el patrón

Cuando esté listo, hay que pasarnos **el ID del grupo**. Es lo único que
necesitamos de vuelta.

---

## 1. El campo personalizado

**Dónde:** Subscribers → Fields → Create field

| Dato | Valor |
|---|---|
| Nombre | `patron_dominante` |
| Tipo | Text |

> **Es el campo más importante de toda la configuración.** Es el que decide
> qué vídeo recibe cada persona. Sin él, MailerLite acepta al suscriptor pero
> descarta ese dato en silencio: no da error, simplemente se pierde, y la
> automatización no tendría con qué decidir.

El nombre tiene que ser exactamente `patron_dominante`: en minúsculas, con
guion bajo y sin tilde. MailerLite distingue mayúsculas de minúsculas.

Ya existen los campos `name` y `phone`, que se siguen usando. No hay que
tocarlos.

---

## 2. El grupo

**Dónde:** Subscribers → Groups → Create group

| Dato | Valor |
|---|---|
| Nombre sugerido | `Radiografía ADN` |

Al crearlo, MailerLite le asigna un ID. **Ese ID es lo que necesitamos.**

**Cómo encontrarlo:** entrar al grupo y mirar la barra de direcciones del
navegador. La URL termina en una serie de números:

```
https://dashboard.mailerlite.com/subscribers?group=123456789
                                                    ↑
                                            ese es el ID
```

Pasarnos ese número. Lo cargamos en la configuración del sitio y a partir de
ahí todo el que complete la radiografía entra a este grupo.

> **Por qué un grupo propio y no el de la lista de espera:** son dos momentos
> distintos del embudo. En este grupo entra solo quien completó el
> cuestionario, y es lo que dispara el envío del vídeo. Mezclarlos haría que
> la automatización se activara también con quien solo se apuntó.

---

## 3. Los siete correos

Hace falta **una plantilla por patrón**, cada una con el vídeo que le
corresponde. Son estos siete:

| # | Valor que llega | Correo que le toca | Título que vio en pantalla |
|---|---|---|---|
| 1 | `Seguridad` | Email 1 — Seguridad | Código de Seguridad |
| 2 | `Merecimiento` | Email 2 — Merecimiento | Código de Merecimiento |
| 3 | `Suficiencia` | Email 3 — Suficiencia | Código de Suficiencia |
| 4 | `Pertenencia` | Email 4 — Pertenencia | Código de Pertenencia |
| 5 | `Protección` | Email 5 — Protección | Código de Protección |
| 6 | `Autoridad` | Email 6 — Autoridad | Código de Autoridad |
| 7 | `Identidad` | Email 7 — Identidad | Código de Identidad |

> **El mismo patrón tiene dos nombres, según dónde se mire.** Dentro del
> código se llama `control`; de cara a la persona —pantalla y correo— es
> siempre «Seguridad». Los dos son correctos, pero **solo el de la primera
> columna sirve dentro de una condición**.
>
> La tercera columna y la segunda dicen ahora lo mismo a propósito: la persona
> lee «Código de Seguridad» al terminar el cuestionario y recibe un correo que
> le confirma «Tu código dominante es: Seguridad». Si esas dos palabras se
> separan, parece que le llegó el vídeo de otro patrón.
>
> La traducción entre ambos vive en un único sitio del código,
> `ETIQUETA_MAILERLITE` en `components/diagnostico/preguntas.ts`. Se adaptó
> la web a la automatización, y no al revés, porque las condiciones ya
> estaban montadas y Supabase ya tenía cientos de registros guardados con los
> identificadores antiguos.
>
> **Si alguna vez se renombra una condición en MailerLite, hay que cambiar esa
> tabla el mismo día.** Es lo único que mantiene unidas las dos mitades: si se
> desincronizan, la rama deja de coincidir sin dar ningún error.

**Dónde:** Campaigns → Create campaign → Regular campaign

Conviene nombrarlas de forma reconocible para encontrarlas después dentro de
la automatización: `Radiografía — Control`, `Radiografía — Hiperexigencia`,
y así.

### Qué contiene cada correo

Según lo prometido en la página, el vídeo tiene que desarrollar cuatro puntos:

1. **Tu patrón dominante** — cuál es y qué significa
2. **Cómo se manifiesta en tu vida** — las formas en que condiciona su realidad
3. **Por qué sigues repitiéndolo** — qué hace que vuelva al mismo lugar
4. **Tu primer paso para trascenderlo** — el movimiento a integrar

En pantalla la persona ya vio un resumen corto de su patrón. El correo es
donde llega el desarrollo completo.

### Personalización disponible

Dentro del correo se pueden usar estas variables:

| Variable | Trae |
|---|---|
| `{$name}` | El nombre de la persona |
| `{$patron_dominante}` | El identificador del patrón, en minúsculas |

> `{$patron_dominante}` devuelve el identificador técnico (`desconexion`,
> sin tilde), no el nombre para mostrar. Si se quiere escribir "El patrón de
> desconexión" en el texto, conviene escribirlo a mano en cada plantilla: cada
> correo ya es de un patrón concreto.

---

## 4. La automatización

**Dónde:** Automations → Create workflow

### Disparador

| Dato | Valor |
|---|---|
| Trigger | **When subscriber joins a group** |
| Grupo | El del paso 2 |

### La bifurcación

Después del disparador, añadir una **condición** sobre el campo
`patron_dominante` con **siete ramas**, y en cada una el correo que le
corresponde.

Si la interfaz solo permite condiciones de dos salidas (sí/no), se encadenan:

```
¿patron_dominante = Seguridad?
├── Sí → enviar «Email 1 — Seguridad»
└── No → ¿patron_dominante = Merecimiento?
         ├── Sí → enviar «Email 2 — Merecimiento»
         └── No → ¿patron_dominante = Suficiencia?
                  └── … y así con los siete
```

### ⚠️ Los valores exactos

La comparación es **carácter por carácter**, y distingue mayúsculas. Estos
son los siete valores que llegan, con su mayúscula inicial y la tilde de
«Protección»:

```
Seguridad
Merecimiento
Suficiencia
Pertenencia
Protección
Autoridad
Identidad
```

> **Esto es lo que más se rompe en la práctica.** `seguridad` en minúscula no
> es lo mismo que `Seguridad`, ni `Proteccion` sin tilde lo mismo que
> `Protección`. Una rama que compare mal **no coincide nunca** y esas personas
> se quedan sin vídeo: no da error ni aviso, simplemente no entran por ninguna
> rama. Lo más seguro es **copiar y pegar**, nunca escribirlos.
>
> Tampoco vale el título que la persona vio en pantalla: ni
> `Código de Control` ni `Código de Supervivencia Emocional`. Solo los siete
> valores de esta lista.

### Cómo saber si las ramas están bien sin esperar a que llegue un correo

En la lista de automatizaciones, cada flujo muestra **En progreso** y
**Completado**.

> **«Completado» no significa «recibió el correo».** Quien baja por toda la
> cadena de condicionales y no coincide con ninguna rama **también sale como
> completado**: atraviesa el flujo y se va sin recibir nada.
>
> Por eso un contador de completados subiendo mientras nadie recibe el vídeo
> es exactamente el síntoma de una rama que compara contra un valor
> equivocado. Si el número sube y los correos no llegan, el problema está en
> los valores, no en el envío.

### La automatización solo alcanza a quien entre después

MailerLite dispara el flujo cuando alguien **se une al grupo**, y solo a
partir del momento en que la automatización queda publicada.

> Quien ya estaba en el grupo antes de publicarla **no entra nunca**. No
> aparece como en progreso ni como completado: simplemente no existe para ese
> flujo, y no hay forma de que le llegue el vídeo con solo esperar.
>
> Si el grupo ya tenía gente cuando se publicó la automatización, esas
> personas hay que recuperarlas aparte — normalmente con una campaña manual
> segmentada por `patron_dominante`, una por patrón.
>
> **Ojo al segmentar a los antiguos.** Quien completó el diagnóstico antes de
> que la web empezara a mandar estas etiquetas tiene guardado el identificador
> viejo en minúsculas (`control`, `hiperexigencia`…), no `Seguridad`. Para
> alcanzarlos hay que segmentar por esos valores antiguos, o filtrar por los
> dos a la vez.

### Una salida de seguridad

Conviene añadir una rama final para quien no coincida con ninguno de los
siete. Puede ser un aviso interno o un correo genérico. Así, si algún día algo
falla, se nota — en vez de que esas personas desaparezcan sin dejar rastro.

---

## 5. Cómo probarlo antes de lanzar

Esta parte no es opcional: es la única forma de saber que la bifurcación
funciona de verdad.

1. Completar el diagnóstico en la web con un correo real y controlado.
2. Comprobar en MailerLite que el suscriptor **entró al grupo**.
3. Abrir su ficha y verificar que `patron_dominante` **tiene un valor**, y que
   ese valor es uno de los siete de la lista — con su mayúscula inicial.
4. Comprobar que **llega el correo** con el vídeo de ese patrón.
5. **Repetir eligiendo respuestas distintas** hasta obtener otro patrón, y
   comprobar que el vídeo que llega **también cambia**.

> **El paso 5 es el que de verdad prueba la bifurcación.** Con una sola pasada
> funcionaría igual aunque las siete ramas apuntaran al mismo vídeo, y eso no
> se descubriría hasta tener gente real dentro.

Para forzar un patrón concreto, hay que elegir **siempre la misma letra en las
seis preguntas de opciones**: la opción A da `Seguridad`, la B `Merecimiento`,
y así en el orden de la tabla del punto 3.

El cuestionario tiene **seis preguntas de opciones y una séptima abierta**. La
séptima es obligatoria para poder terminar, pero no puntúa: no influye en el
patrón.

> **Tienen que ser las seis.** Con seis preguntas y siete patrones el empate es
> frecuente, así que hay un desempate automático. Si se responde la misma letra
> solo en algunas y se varía en el resto, puede ganar otro patrón y parecer que
> la bifurcación está mal cuando en realidad funcionaba.

---

## 6. Qué pasa si algo falla

La web **nunca muestra un error a la visitante** por un fallo de MailerLite:
sus respuestas quedan guardadas antes de intentar el envío, y ve su resultado
con normalidad.

Si el envío falla, el registro queda guardado igual y se puede recuperar. Un
problema de configuración retrasa la entrega del vídeo, pero **no hace perder
ningún contacto**.

---

## Resumen de lo que necesitamos de vuelta

- [ ] El **ID del grupo** del paso 2
- [ ] Confirmación de que el campo `patron_dominante` está creado
- [ ] Confirmación de que las siete plantillas existen, cada una con su vídeo
- [ ] Confirmación de que la automatización está **publicada** (no en borrador)
- [ ] Confirmación de que las siete ramas comparan contra los valores de la
      primera columna del punto 3 (`Seguridad`, `Merecimiento`…), con su
      mayúscula inicial y la tilde de `Protección`
- [ ] Si el grupo ya tenía suscriptores antes de publicar la automatización:
      decidir cómo se les hace llegar el vídeo
