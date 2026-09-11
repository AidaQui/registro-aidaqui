-- ============================================================
-- Radiografía de tu ADN — tabla de diagnósticos
-- Ejecutar en Supabase → SQL Editor → New query → Run
-- ============================================================
--
-- Va en una tabla propia y no en registros_academia_espera porque son dos
-- hechos distintos: allí se guarda quién se apuntó, aquí qué respondió.
-- Quien se apunta y no hace el test dejaría ocho columnas vacías, y al
-- exportar a CSV el cliente abriría una hoja llena de huecos.
--
-- Se cruzan por email cuando hace falta (consulta al final del archivo).

create table if not exists public.diagnosticos (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),

  nombre text,
  email text not null,
  telefono text,

  -- Una columna por pregunta, con la letra y el texto de la opción elegida.
  -- Se guarda el texto y no solo el índice para que los registros sigan
  -- siendo legibles si algún día cambia el orden o la redacción.
  p1 text,
  p2 text,
  p3 text,
  p4 text,

  -- El resultado: es el valor que decide qué vídeo recibe la persona.
  patron_dominante text not null,
  patron_nombre text,

  -- Conteo de los siete patrones, por si hiciera falta recalcular el
  -- resultado más adelante con otro criterio de desempate.
  puntajes jsonb,
  hubo_empate boolean not null default false
);

-- Sin restricción de unicidad en email: si alguien repite el test, interesa
-- conservar las dos pasadas en vez de pisar la primera.
create index if not exists diagnosticos_email_idx
  on public.diagnosticos (email);
create index if not exists diagnosticos_patron_idx
  on public.diagnosticos (patron_dominante);
create index if not exists diagnosticos_created_at_idx
  on public.diagnosticos (created_at desc);

-- RLS activo y sin políticas: nadie entra con las claves públicas.
-- El endpoint usa la service role key, que las omite por diseño.
alter table public.diagnosticos enable row level security;


-- ============================================================
-- Consultas útiles para entregar los datos al cliente
-- ============================================================

-- 1) Cuántas personas cayeron en cada patrón
--
-- select patron_dominante, count(*) as total
-- from public.diagnosticos
-- group by patron_dominante
-- order by total desc;

-- 2) Qué se respondió en una pregunta concreta
--
-- select p3, count(*) as total
-- from public.diagnosticos
-- group by p3
-- order by total desc;

-- 3) Registro y diagnóstico en una sola tabla, cruzados por email.
--    El left join deja ver también a quienes se apuntaron y no hicieron
--    el test: esas filas salen con el diagnóstico vacío.
--
-- select
--   r.nombre,
--   r.email,
--   r.telefono,
--   d.patron_dominante,
--   d.p1, d.p2, d.p3, d.p4,
--   d.created_at as diagnostico_en
-- from public.registros_academia_espera r
-- left join public.diagnosticos d on d.email = r.email
-- order by r.email;

-- 4) Cuántos resultados salieron de un desempate.
--    Si el porcentaje es alto, el cuestionario necesita más preguntas
--    o pesos distintos — sin este dato no habría forma de saberlo.
--
-- select hubo_empate, count(*) as total
-- from public.diagnosticos
-- group by hubo_empate;
