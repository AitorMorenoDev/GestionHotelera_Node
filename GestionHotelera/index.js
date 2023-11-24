/* Aitor Moreno Iborra
Despliegue de aplicaciones web: Práctica 1
2º DAM/DAW */

// Carga de librerías
const express = require("express");
const mongoose = require("mongoose");

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones");
const limpiezas = require (__dirname + "/routes/limpiezas");
const auth = require (__dirname + "/routes/auth");

// Conectar con 
mongoose.connect("mongodb://localhost:27017/hotel");

// Inicializar express
const app = express();

// Cargar middleware para peticiones POST y PUT y enrutadores
app.use(express.json());
app.use("/habitaciones", habitaciones);
app.use("/limpiezas", limpiezas);
app.use("/auth", auth);

// Inicializar servidor
app.listen(8080);