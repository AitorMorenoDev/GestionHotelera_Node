const express = require("express");

let limpieza = require(__dirname + "/../models/limpieza.js");
let habitacion = require(__dirname + "/../models/habitacion.js");
let routerLimp = express.Router();
let auth = require(__dirname + "/../auth/auth.js");

// Obtener limpiezas de una habitación
routerLimp.get("/:id", (req, res) => {
    limpieza.find({ habitacion: req.params.id }).sort({ fecha: -1 }).then(resultado => {
        if(resultado.length > 0) {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        } else {
            throw new Error();
        }
    }).catch(error => {
        res.status(500)
            .send({ ok: false, error: "No hay limpiezas registradas para esa habitación" });
    });
});

// OBtener el estado de limpieza de una habitación:
routerLimp.get("/:id/estado", (req, res) => {
    // Buscar la limpieza más reciente para la habitación
    limpieza.findOne({ habitacion: req.params.id })
        .sort({ fecha: -1 })
        .then(ultimaLimpieza => {
            if (ultimaLimpieza) {
                let estado = "Pendiente de limpieza";
                // Comparar la fecha de la última limpieza con la fecha actual
                if (ultimaLimpieza.fecha.toDateString() === new Date().toDateString()) {
                    estado = "Limpia";
                }
                res.status(200)
                    .send({ ok: true, resultado: estado });
            } else {
                // No se encontraron limpiezas para la habitación
                res.status(200)
                    .send({ ok: true, resultado: "Pendiente de limpieza" });
            }
        })
        .catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error obteniendo estado de limpieza" });
        });
});

// Actualizar limpieza
routerLimp.post("/:id", auth.protegerRuta, (req, res) => {
    let nuevalimpieza = new limpieza({
        habitacion: req.params.id,
        fecha: Date.now(),
        observaciones: req.body.observaciones
    });
    nuevalimpieza.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error actualizando limpieza"});
    });
});

module.exports = routerLimp;