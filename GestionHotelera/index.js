/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Carga de librerías
const express = require("express");
const mongoose = require("mongoose");

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones");
const limpieza = require (__dirname + "/routes/limpiezas");
const usuarios = require (__dirname + "/routes/usuarios");

// Conectar con 
mongoose.connect("");

// Inicializar express
const app = express();

// Cargar middleware para peticiones POST y PUT y enrutadores
app.use(express.json());
app.use("/habitaciones");
app.use("/limpiezas");
app.use("/usuarios");

// Inicializar servidor
app.listen(8080);