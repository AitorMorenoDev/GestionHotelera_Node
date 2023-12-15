/* Aitor Moreno Iborra
Despliegue de aplicaciones web: Práctica 1
2º DAM/DAW */

// Carga de librerías
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Carga de variables de entorno
const puerto = process.env.PUERTO;
const database = process.env.DATABASE;

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones");
const limpiezas = require(__dirname + "/routes/limpiezas");
const auth = require(__dirname + "/routes/auth");

// Conectar con la base de datos
mongoose.connect(database);

// Inicializar express
const app = express();

// Cargar middleware para peticiones POST y PUT y enrutadores
app.use(express.json());
app.use("/habitaciones", habitaciones);
app.use("/limpiezas", limpiezas);
app.use("/auth", auth);

// Inicializar servidor
app.listen(puerto);