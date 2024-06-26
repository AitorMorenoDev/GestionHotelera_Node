/* Esquema de las incidencias registradas en las habitaciones */

const mongoose = require("mongoose");

let incidenciaSchema = new mongoose.Schema({
    /* descripción de la incidencia: no funciona el aire acondicinado, etc */
    descripcion: {
        type: String,
        trim: true, 
        required: true
    },
    /* fecha en la que se registra la incidencia */     
    inicio: {
        type: Date,
        required: true,
        default: Date.now
    }, 
    /* fecha en la que se resuelve la incidencia */
    fin: {
        type: Date, 
        required: false
    }
});

/* Esquema y modelo que representa cada habitación del hotel.*/

let habitacionSchema = new mongoose.Schema({
    /* número de habitación */
    numero: {
        type: Number,
        required: true,
        min: 1,
        max: 50         
    },
    /* tipo de habitación */
    tipo: {
        type: String,
        required: true,
        enum: ["individual", "doble", "familiar", "suite"]
    },        
    /* descripción de la habitación: número de camas, tipo de cama, si tiene terraza, si tiene vistas, televisor, etc */
    descripcion: {
        type: String,
        required: true,
        trim: true
    }, 
    /* fecha de la última limpieza */
    ultimaLimpieza: {
        type: Date,
        required: true,
        default: Date.now
    },    
    /* precio de la habitación por noche */
    precio: {
        type: Number,
        required: true,
        min: 0,
        max: 300
    },
    /* Array de incidencias producidas en la habitación */
    incidencias: [incidenciaSchema]
});

let Habitacion = mongoose.model('habitaciones', habitacionSchema);

module.exports = Habitacion;