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
                // password: usuario.contrasena,
                rol: usuario.rol,
            });
        } else {
            res.json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }
    } catch (error){
        console.error("Error al iniciar sesion:", error);
    }

});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
