-- ============================================================
-- Landings de registro (/registro-v1, /registro-v2, ...) — tabla única
-- Ejecutar en Supabase → SQL Editor → New query → Run
-- ============================================================
--
-- Una sola tabla para todas las variantes, con la columna `variante`, y no
-- una tabla por versión: comparar variantes es justo lo que se quiere hacer,
-- y con tablas separadas cada comparación obliga a unirlas a mano, cada
-- variante nueva exige crear otra tabla, y cada campo nuevo hay que sumarlo
-- en todas. Así, una variante nueva no necesita tocar la base.
--
-- La masterclass y la lista de espera siguen en sus tablas de siempre
-- (registros_masterclass, registros_academia_espera).

create table if not exists public.registros (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),

  -- Qué landing generó el registro: 'registro-v1', 'registro-v2', ...
  variante text not null,

  nombre text not null,
  email text not null,
  telefono text,

  -- De qué anuncio o campaña vino la persona. Se toman de la URL con la que
  -- llegó a la landing (?utm_source=...); vacíos si entró directo.
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  -- Para cuando el link no trae UTM. referrer: dominio del sitio que mandó a
  -- la persona (l.instagram.com, com.google.android.gm, ...); vacío si
  -- entró directo, o desde apps que no lo mandan (WhatsApp, muchas de mail).
  -- fbclid: lo agrega Meta a todo clic desde Facebook o Instagram, anuncio u
  -- orgánico.
  referrer text,
  fbclid text,

  -- La misma persona cuenta una vez por variante, pero puede aparecer en
  -- varias: si se anota en v1 y en v2, son dos conversiones distintas.
  constraint registros_variante_email_key unique (variante, email)
);

create index if not exists registros_variante_idx
  on public.registros (variante);
create index if not exists registros_created_at_idx
  on public.registros (created_at desc);

-- Si la tabla ya existía sin las columnas de origen (agregadas el 12/10):
alter table public.registros add column if not exists referrer text;
alter table public.registros add column if not exists fbclid text;

-- RLS activo y sin políticas: nadie entra con las claves públicas.
-- El endpoint usa la service role key, que las omite por diseño.
alter table public.registros enable row level security;


-- ============================================================
-- Consultas útiles
-- ============================================================

-- 1) Registros por variante. Para la conversión, dividir cada total por las
--    visitas de esa URL en Vercel Analytics o GA4 en el mismo rango de fechas.
--
-- select variante, count(*) as registros
-- from public.registros
-- group by variante
-- order by variante;

-- 2) Registros por variante y campaña: qué anuncio convierte en qué landing.
--
-- select variante, utm_source, utm_campaign, count(*) as registros
-- from public.registros
-- group by variante, utm_source, utm_campaign
-- order by variante, registros desc;

-- 3) Los que llegaron sin UTM: de dónde vinieron.
--
-- select variante, referrer, (fbclid is not null) as desde_meta, count(*) as registros
-- from public.registros
-- where utm_source is null
-- group by variante, referrer, desde_meta
-- order by registros desc;

-- 4) Registros por día de una variante.
--
-- select date_trunc('day', created_at) as dia, count(*) as registros
-- from public.registros
-- where variante = 'registro-v1'
-- group by dia
-- order by dia;
