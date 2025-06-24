create extension if not exists pgcrypto;

create table if not exists usuario (
    id_usuario uuid primary key default gen_random_uuid(),
    nombre varchar(100) not null,
    email varchar(100) not null unique,
    contrasena varchar(255) not null,
    rol varchar(50) not null default('estudiante')
)
-- Asegúrate de haber creado la tabla usuario antes de ejecutar esto

INSERT into  usuario  (nombre, email, contrasena, rol) VALUES
  ('Andrea López',     'e1315844983@live.uleam.edu.ec', '1234', 'estudiante'),
  ('Carlos Pérez',     'e1315844984@live.uleam.edu.ec', '1234', 'estudiante'),
  ('María González',   'e1315844985@live.uleam.edu.ec', '1234', 'estudiante'),
  ('Jorge Ramírez',    'e1315844986@live.uleam.edu.ec', '1234', 'estudiante'),
  ('Valeria Cedeño',   'e1315844987@live.uleam.edu.ec', '1234', 'estudiante');

INSERT INTO usuario (nombre, email, contrasena, rol) VALUES
  ('Administrador','e0123456789@live.uleam.edu.ec', '1234', 'admin');
