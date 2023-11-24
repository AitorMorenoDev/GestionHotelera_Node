const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
});

/*************** Funciones auxiliares ****************/

// Configuración del token de autenticación para las siguientes solicitudes
const setToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['authorization'];
    }
};

// Función principal de ejecución de pruebas
const ejecutarPruebas = async() => {
    await obtenerHabitaciones();
    await habitacionIncorrecta();
    await loginIncorrecto();
    await insercionNoPermitida();
    let token = await loginCorrecto();
    let id = await insertarHabitacion(token);
    await fichaHabitacion(id);
    await actualizarHabitacion(token, id);
    await borrarHabitacion(token, id);
}

/*************** Tests ****************/

// Prueba de listado de habitaciones
const obtenerHabitaciones = async () => {
    try {
        const respuesta = await axiosInstance.get('/habitaciones');
        if(respuesta.status == 200 && respuesta.data.resultado.length >= 0)
            console.log("OK - Listado habitaciones");
        else
            throw new Error();
    } catch (error) {
        console.log("ERROR - Listado habitaciones");
    }
};

// Prueba de listado de habitaciones
const habitacionIncorrecta = async () => {
    try {
        const respuesta = await axiosInstance.get('/habitaciones/000000000000000000000000');
        console.log("ERROR - Habitación incorrecta");
    } catch (error) {
        if(error.response.status == 400)
            console.log("OK - Habitación incorrecta");
        else
            console.log("ERROR - Habitación incorrecta");
    }
};

// Prueba de inserción sin autenticación
const insercionNoPermitida = async () => {
    const hab1 = {
        numero: 20, 
        tipo: "individual", 
        descripcion: "Habitación No Permitida", 
        precio: 75
    };

    try {
        const respuesta = await axiosInstance.post('/habitaciones', hab1);
        console.log("ERROR - Habitación no permitida");
    } catch(error) {
        if(error.response.status == 403)
            console.log("OK - Habitación no permitida");
        else
            console.log("ERROR - Habitación no permitida");
    }
}


// Prueba de login incorrecto
const loginIncorrecto = async () => {
    try {
        const respuesta = await axiosInstance.post('/auth/login', {
            login: 'aa',  
            password: 'bb'
        });
        console.log("ERROR - Login incorrecto");
    } catch (error) {
        if (error.response.status == 401)
            console.log("OK - Login incorrecto");
        else
            console.log("ERROR - Login incorrecto");
    }
};

// Prueba de login correcto
const loginCorrecto = async () => {
    try {
        const respuesta = await axiosInstance.post('/auth/login', {
            login: 'usuario1',    
            password: 'password1' 
        });
        if (respuesta.status == 200)
        {
            console.log("OK - Login");
            return respuesta.data.resultado;  // Devolvemos el token del resultado
        }
        else
            throw new Error();
    } catch (error) {
        console.log(error);
        console.log("Error - Login");
        return null;
    }
};

// Prueba de inserción con token de autorización
const insertarHabitacion = async (token) => {
    // Usamos la función anterior para guardar el token
    setToken(token);
    const hab1 = {
        numero: 11, 
        tipo: "individual", 
        descripcion: "Habitación Axios", 
        precio: 101
    };

    try {
        const respuesta = await axiosInstance.post('/habitaciones', hab1);
        if(respuesta.status == 200) 
        {
            console.log("OK - Insertar habitación");
            return respuesta.data.resultado._id;
        }
        else
            throw new Error();
    } catch(error) {
        console.log("ERROR - Insertar habitación");
        return -1;
    }
}

// Prueba de ficha de habitacion
const fichaHabitacion = async (id) => {
    try {
        const respuesta = await axiosInstance.get(`/habitaciones/${id}`);
        if(respuesta.status == 200 && respuesta.data.resultado)
            console.log("OK - Ficha habitación");
        else
            throw new Error();
    } catch (error) {
        console.log("ERROR - Ficha habitación");
    }
};

// Prueba de actualizar habitación con token de autorización
const actualizarHabitacion = async (token, id) => {
    // Usamos la función anterior para guardar el token
    setToken(token);
    const datos = {
        numero: 11, 
        tipo: "individual", 
        descripcion: "Habitación Axios modificada", 
        precio: 102
    };

    try {
        const respuesta = await axiosInstance.put(`/habitaciones/${id}`, datos);
        if(respuesta.status == 200) 
            console.log("OK - Actualizar habitación");
        else
            throw new Error();
    } catch(error) {
        console.log("ERROR - Actualizar habitación");
    }
}

// Prueba de borrar habitación con token de autorización
const borrarHabitacion = async (token, id) => {
    // Usamos la función anterior para guardar el token
    setToken(token);

    try {
        const respuesta = await axiosInstance.delete(`/habitaciones/${id}`);
        if(respuesta.status == 200) 
            console.log("OK - Borrar habitación");
        else
            throw new Error();
    } catch(error) {
        console.log("ERROR - Borrar habitación");
    }
}

/*************** Main ****************/
ejecutarPruebas();