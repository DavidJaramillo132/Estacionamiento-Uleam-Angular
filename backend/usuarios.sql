create extension if not exists pgcrypto;
create table if not exists usuario (
    id_usuario uuid primary key default gen_random_uuid(),
    nombre varchar(100) not null,
    email varchar(100) not null unique,
    contrasena varchar(255) not null,
    rol varchar(50) not null default('estudiante'),
    reservacion_estacionamiento boolean not null default (false),
    matricula varchar(25) unique
)
INSERT INTO usuario (nombre, email, contrasena, rol) VALUES
  ('Andrea López',     'e1315844983@live.uleam.edu.ec', '1234', 'estudiante'),
  ('Carlos Pérez',     'e1315844984@live.uleam.edu.ec', '1234', 'estudiante'),
  ('María González',   'e1315844985@live.uleam.edu.ec', '1234', 'estudiante'),
  ('Administrador',    'e0123456789@live.uleam.edu.ec', '1234', 'administrativo'),
  ('Jorge Ramírez',    'e1315844986@live.uleam.edu.ec', '1234', 'estudiante'),
  ('Valeria Cedeño',   'e1315844987@live.uleam.edu.ec', '1234', 'estudiante')
ON CONFLICT (email) DO NOTHING;

alter table usuario 
add column matricula varchar(25) unique;

drop table usuario ;
select * from usuario;
