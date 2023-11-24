/* Enrutador para usuarios
Este enrutador lo ubicaremos en el fichero routes/auth.js y responderá a URIs que comiencen por
/auth. Se pide implementar estos servicios:
• Loguear a un usuario
o Endpoint: POST /auth/login
o Descripción: se obtendrá de la petición el login y password del usuario y, si es correcto,
se le devolverá un código 200 con el token de acceso correspondiente (campo
resultado). En caso contrario se le enviará un código de error 401 (no autorizado) con
el mensaje “Login incorrecto” (campo error). */


const express = require("express");
const auth = require(__dirname + "/../auth/auth.js");

let router = express.Router();

// let usuarios = "./models/usuarios.js";

router.post("/auth/login", (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(u =>
        u.usuario == usuario && u.password == password);

    if (existeUsuario.length == 1)
        res.status(200)
            .send({ok: true, 
                token: auth.generarToken(existeUsuario[0].usuario)});
    else
        res.status(401)
            .send({ok: false, error: "Login incorrecto"});
});

module.exports = router;
