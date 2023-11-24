const express = require("express");

let habitacion = require(__dirname + "/../models/habitacion.js");
let auth = require(__dirname + "/../auth/auth.js");
let routerHabs = express.Router();

// Obtener un listado de todas las habitaciones:
routerHabs.get("/", (req, res) => {
    habitacion.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch (error => {
        res.status(500)
            .send({ ok: false, error: "No hay habitaciones registradas en la aplicación" });
    }); 
});

// Obtener detalles de una habitación específica:
routerHabs.get("/:id", (req, res) => {
    habitacion.findById(req.params.id).then(resultado => {
        if(resultado) {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        } else {
            throw new Error(); //Lanza el error para evitar repetir el mensaje en el código
        }
    }).catch (error => {
        res.status(400)
            .send({ ok: false, error: "No existe el número de habitación" });
    });
});

// Insertar una habitación
routerHabs.post("/", auth.protegerRuta, (req, res) => {
    let habitacion = new habitacion({
        numero: req.body.numero,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        ultimaLimpieza: req.body.ultimaLimpieza,
        precio: req.body.precio
    });
    habitacion.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error insertando la habitación" });
    });
});

// Actualizar los datos de una habitación
routerHabs.put("/:id", auth.protegerRuta, (req, res) => {
    habitacion.findByIdAndUpdate(req.params.id, {
        numero: req.body.numero,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        ultimaLimpieza: req.body.ultimaLimpieza,
        precio: req.body.precio
    }).then(resultado => {
        if(resultado) {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        } else {
            throw new Error();
        }
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error actualizando los datos de la habitación" });
    });
});

// Eliminar una habitación
routerHabs.delete("/:id", auth.protegerRuta, (req, res) => {
    habitacion.findByIdAndRemove(req.params.id).then(resultado => {
        if(resultado) {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        } else {
            throw new Error();
        }
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error eliminando la habitación" });
    });
});

// Añadir una incidencia en una habitación
routerHabs.post("/:id/incidencias", auth.protegerRuta, (req, res) => {

    habitacion.findByIdAndUpdate(req.params.id, {
        $push: {
            incidencias: {
                descripcion: req.body.descripcion,
                inicio: new Date(Date.now()).toLocaleDateString(),
                fin: "" 
            }
        }
    }, { new: true })
        .then(resultado => {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error añadiendo la incidencia" });
        });
});

// Actualizar el estado de una incidencia de una habitación:
routerHabs.put("/:idHab/incidencias/:idInc", auth.protegerRuta, (req, res) => {

    habitacion.findByIdAndUpdate({ _id: req.params.idHab, "incidencias._id": req.params.idInc }, {
        $set: {
            "incidencias.$.fin": new Date(Date.now()).toLocaleDateString()
        }
    }, { new: true })
        .then(resultado => {
            if(resultado) {
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            } else {
                throw new Error();
            }
        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Incidencia no encontrada" });
        });
});


// Actualizar última limpieza
routerHabs.put("/:id/ultima", auth.protegerRuta, (req, res) => {
    const fechaActual = new Date(Date.now());

    habitacion.findByIdAndUpdate(req.params.id, { ultimaLimpieza: fechaActual.toLocaleDateString()}, {new: true})
        .then(resultado => {
            if(resultado) {
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            } else {
                throw new Error();
            }
        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error actualizando limpieza" });
        });
});

module.exports = routerHabs;