const express = require("express");
const auth = require(__dirname + "/../auth/auth.js");
let usuario = require(__dirname + "/../models/usuario.js");
let routerAuth = express.Router();

// Método para loguear un usuario
routerAuth.post("/login", (req, res) => {
    usuario.findOne({
        login: req.body.login,
        password: req.body.password
    }).then(resultado => {
        if (resultado) {
            let token = auth.generarToken(resultado.login);
            res.status(200)
                .send({ ok: true, resultado: token });
        } else {
            res.status(401)
                .send({ ok: false, error: "Usuario o contraseña incorrectos" });
        }
    }).catch(error => {
        res.status(500)
            .send({ ok: false, error: "Error al buscar el usuario" });
    });
});

module.exports = routerAuth;
