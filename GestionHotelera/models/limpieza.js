const mongoose = require("mongoose");

let limpiezaSchema = new mongoose.Schema({
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "habitacion"
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now,
    },
    observaciones: {
        type: String
    }
});

let Limpieza = mongoose.model("limpieza", limpiezaSchema);
module.exports = Limpieza;