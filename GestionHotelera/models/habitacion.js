const mongoose = require("mongoose");

let incidenciasSchema = new mongoose.Schema ({
    descripcion: {
        type: String,
        required: true
    },
    inicio: {
        type: Date,
        default: Date.now,
        required: true
    },
    fin: {
        type: Date,
    }
});

let habitacionesSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },
    tipo: {
        type: String,
        enum: ["individual", "doble", "familiar", "suite"],
    },
    descripcion: {
        type: String,
        required: true
    },
    ultimaLimpieza: {
        type: Date,
        default: Date.now,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
        max: 300
    },
    incidencias: [incidenciasSchema]
});

let Habitacion = mongoose.model("habitacion", habitacionesSchema);
module.exports = Habitacion;