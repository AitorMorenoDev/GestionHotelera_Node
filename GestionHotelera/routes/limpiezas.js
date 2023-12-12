const express = require("express");

let habitacion = require(__dirname + "/../models/limpieza.js");
let routerLimp = express.Router();

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
    habitacion.findById(req.params.id).then(resultado => {
        if(resultado) {
            let estado = "Pendiente de limpieza";
            if(resultado.ultimaLimpieza.toDateString() === new Date().toDateString()) {
                estado = "Limpia";
            }
            res.status(200)
                .send({ ok: true, resultado: estado });
        } else {
            throw new Error();
        }
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error obteniendo estado de limpieza" });
    });
});

// Actualizar limpieza
routerLimp.post("/:id", auth.protegerRuta, (req, res) => {
    let limpieza = new limpieza({
        habitacion: req.params.id,
        fecha: new Date(Date.now()).toLocaleDateString(),
        observaciones: req.body.observaciones
    });
    limpieza.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error actualizando limpieza"});
    });
});

module.exports = routerLimp;