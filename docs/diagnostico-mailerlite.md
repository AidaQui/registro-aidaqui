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

| # | Patrón | Nombre completo |
|---|---|---|
| 1 | `control` | El patrón de control |
| 2 | `hiperexigencia` | El patrón de hiperexigencia |
| 3 | `escasez` | El patrón de escasez |
| 4 | `validacion` | El patrón de validación |
| 5 | `supervivencia` | El patrón de supervivencia |
| 6 | `desconexion` | El patrón de desconexión |
| 7 | `autosabotaje` | El patrón de autosabotaje |

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
¿patron_dominante = control?
├── Sí → enviar «Radiografía — Control»
└── No → ¿patron_dominante = hiperexigencia?
         ├── Sí → enviar «Radiografía — Hiperexigencia»
         └── No → ¿patron_dominante = escasez?
                  └── … y así con los siete
```

### ⚠️ Los valores exactos

La comparación es **carácter por carácter**. Estos son los siete valores que
llegan, en minúsculas y **sin tildes**:

```
control
hiperexigencia
escasez
validacion
supervivencia
desconexion
autosabotaje
```

> **Esto es lo que más se rompe en la práctica.** Si una rama compara contra
> `desconexión` o `validación` —con tilde, que es como se escriben bien en
> castellano— esa rama **no coincide nunca** y esas personas se quedan sin
> vídeo. No da error ni aviso: simplemente no entran por ninguna rama.
>
> Van sin tilde a propósito, justamente para evitar problemas de codificación
> entre sistemas. Lo más seguro es **copiar y pegar** los valores de la lista
> de arriba en vez de escribirlos.

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
   ese valor es uno de los siete de la lista.
4. Comprobar que **llega el correo** con el vídeo de ese patrón.
5. **Repetir eligiendo respuestas distintas** hasta obtener otro patrón, y
   comprobar que el vídeo que llega **también cambia**.

> **El paso 5 es el que de verdad prueba la bifurcación.** Con una sola pasada
> funcionaría igual aunque las siete ramas apuntaran al mismo vídeo, y eso no
> se descubriría hasta tener gente real dentro.

Para forzar un patrón concreto, basta con elegir siempre la misma letra en las
cuatro preguntas: la primera opción da `control`, la segunda `hiperexigencia`,
y así en el orden de la lista.

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
