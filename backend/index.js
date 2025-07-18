const express = require("express"); // Es para crear el servidor web
const cors = require("cors"); // Es para permitir solicitudes de diferentes dominios

const { Pool } = require("pg"); // Es para conectarse a la base de datos PostgreSQL

const app = express(); // Crear una instancia de la aplicación Express
const port = 3000; // Puerto en el que se ejecutará el servidor

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos PostgreSQL
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "parqueadero",
  password: "postgres",
  port: 5425,
});


app.post("/api/login/", async (req, res) => {
  const { email, password } = req.body;
  // Validar que se reciban los campos necesarios
  try {
    const result = await db.query(
      "SELECT * FROM usuario WHERE email = $1 AND contrasena = $2",
      [email, password]
    );
    if (result.rows.length == 1) {
      const usuario = result.rows[0];
      console.log("Usuario encontrado:", usuario);
      res.json({
        success: true,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        estacionamiento: usuario.reservacion_estacionamiento,
        matricula: usuario.matricula,
      });
    } else {
      res.json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
  }
});

app.get("/api/usuario/:email", async (req, res) => {
  const { email } = req.params;
  console.log("Obteniendo matrícula para el usuario:", email);
  try {
    const result = await db.query(
      "SELECT matricula FROM usuario WHERE email = $1",
      [email]
    );

    if (result.rows.length === 1) {
      res.json({
        success: true,
        matricula: result.rows[0].matricula
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
  } catch (err) {
    console.error("Error al obtener la matrícula:", err);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
});


app.post("/api/reservar", async (req, res) => {
  const { email, reservacion_realizada, matricula } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email es requerido" });
  }

  try {
    const result = await db.query(
      "UPDATE usuario SET reservacion_estacionamiento = $1, matricula = $2 WHERE email = $3",
      [reservacion_realizada, matricula, email]
    );

    if (result.rowCount === 1) {
      res.json({ success: true, message: "Reservación actualizada correctamente" });
    } else {
      res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar la reservación:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

app.get('/api/reservacion/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const result = await db.query(
      'SELECT reservacion_estacionamiento FROM usuario WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const reservacion = result.rows[0].reservacion_estacionamiento;
    res.json({ reservacion: !!reservacion }); // convierte a booleano
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


app.use(express.static(path.join(__dirname, '../Estacionamiento_ULEAM/dist/Estacionamiento_ULEAM')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Estacionamiento_ULEAM/dist/Estacionamiento_ULEAM/index.html'));
});

// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });
