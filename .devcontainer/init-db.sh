#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE TABLE IF NOT EXISTS public.documents (id SERIAL PRIMARY KEY, body TEXT NOT NULL);
  COMMENT ON COLUMN public.documents.id IS 'ID of the document.';
  COMMENT ON COLUMN public.documents.body IS 'Text of the document, to be split and counted.';
  ALTER TABLE public.documents REPLICA IDENTITY FULL;
EOSQL