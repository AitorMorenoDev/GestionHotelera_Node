const express = require("express");
const auth = require(__dirname + "/../auth/auth.js");

let router = express.Router();

router.post("/auth/login", (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(u =>
        u.usuario == usuario && u.password == password);

    if (existeUsuario.length == 1)
        res.status(200)
            .send({ok: true, 
                resultado: auth.generarToken(existeUsuario[0].usuario)});
    else
        res.status(401)
            .send({ok: false, error: "Login incorrecto"});
});

module.exports = router;
