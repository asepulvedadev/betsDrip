-- Script SQL para crear la tabla de likes en Neon
-- Puedes ejecutar esto directamente en la consola SQL de Neon

-- Crear tabla de likes
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  device_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para mejorar el rendimiento en búsquedas por device_id
CREATE INDEX IF NOT EXISTS idx_device_id ON likes(device_id);

-- Verificar que la tabla se creó correctamente
SELECT
  table_name,
  column_name,
  data_type
FROM
  information_schema.columns
WHERE
  table_name = 'likes';
