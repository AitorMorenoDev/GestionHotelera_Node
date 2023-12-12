const jwt = require("jsonwebtoken");
const secreto = process.env.secreto;

let generarToken = (login) => jwt.sign({login: login}, secreto, {expiresIn: "2 hours"});

let validarToken = token => {
    try {
        let resultado = jwt.verify(token, secreto);
        return resultado;
    } catch (e) {}
};

let protegerRuta = (req, res, next) => {
    let token = req.headers["authorization"];

    if (token) {
        token = token.substring(7);
        let resultado = validarToken(token);

        if (resultado) {
            next();
        } else {
            res.status(403).send({ ok: false, error: "Acceso no autorizado" });
        }
    } else {
        res.status(403).send({ ok: false, error: "Acceso no autorizado" });
    }
};


module.exports = {
    generarToken: generarToken,
    validarToken: validarToken,
    protegerRuta: protegerRuta
};