const Auto = require("./Auto");
const Camion = require("./Camion");
const Moto = require("./Moto");

/*
GeneradorVehiculos es un objeto que hace uso del revealing module pattern para retornar los metodos basicos
para la generacion de uno o varios vehiculos a traves de generacion aleatoria o datos pasados por parámetro.

Refactorizaciones:
    - Se transformó al generador de ser un objeto común a un objeto estatico a través de Revealing Module Pattern
    - Además de poder generar Vehiculos de manera aleatoria, se agregó la posibilidad de crearlos por parámetro
    - Reemplazo de múltiples parámetros en generarVehiculo/s por un objeto
    - Reestructuración de Dependencias
*/

const generadorVehiculos = (() => {
    // Establezco los tipos de vehículos a generar

    var tipoVehiculos = {
        "Auto": Auto,
        "Camion": Camion,
        "Moto": Moto
    };


    // Planteo el método estandar de generacion de numeros

    const getRandomInt = () => {
        return Math.floor(Math.random() * 3); // Genera un entero aleatorio -> restringido a 0, 1 y 2
    }


    /*
    Generación de Vehiculo con objeto. Puede tirar errores. Al generar vehículos, para hacer máximo uso de
    la habilidad de generacion aleatoria, se pueden dejar parámetros en blanco para que sean generados
    automáticamente
    */

    const generarVehiculo = (o) => {

        // VALIDACION DE DATOS ENTRANTES
        /*
        Si los datos ingresados existen y son erroneos, se tira un error. Si los datos no existen,
        se generan automáticamente.
        */

        if ((o.hasOwnProperty("tipoVehiculo") && typeof o.tipoVehiculo === 'string' && !(o.tipoVehiculo.match(/^([a-zA-Z])+$/))) || (o.hasOwnProperty("tipoVehiculo") && !(typeof o.tipoVehiculo === 'string'))) {
            throw new Error(typeof o.tipoVehiculo);
        }

        if ((o.hasOwnProperty("capacidad") && typeof o.capacidad === 'string' && !(o.capacidad.match(/^[0-9]+$/))) || (o.hasOwnProperty("capacidad") && (!(typeof o.capacidad === 'string') && !(typeof o.capacidad === 'number'))) || (o.hasOwnProperty("capacidad") && typeof o.capacidad === 'number' && o.capacidad < 0)) {
            throw new Error("[-] Capacidad ingresada inválida");
        } else if (o.hasOwnProperty("capacidad") && typeof o.capacidad === 'string') {
            o.capacidad = parseInt(o.capacidad);
            if (o.capacidad < 0) {
                throw new Error("[-] La capacidad no puede ser negativa");
            }
        }

        if ((o.hasOwnProperty("cantCombustible") && typeof o.cantCombustible === 'string' && !(o.cantCombustible.match(/^[0-9]+$/))) || (o.hasOwnProperty("cantCombustible") && (!(typeof o.capacidad === 'string') && !(typeof o.capacidad === 'number'))) || (o.hasOwnProperty("cantCombustible") && typeof o.cantCombustible === 'number' && (o.cantCombustible < 0 || o.cantCombustible > o.capacidad))) {
            throw new Error("[-] Cantidad de combustibe inválida");
        } else if (o.hasOwnProperty("cantcombustible") && typeof o.cantCombustible === 'string') {
            o.cantCombustible = parseInt(o.cantCombustible);
            if (o.cantCombustible < 0) {
                throw new Error("[-] Cantidad de combustible negativa");
            } else if (o.cantCombustible > o.capacidad) {
                throw new Error("[-] Cantidad de combustible superior a capacidad maxima");
            }
        }

        if (o.hasOwnProperty("tipoVehiculo") && tipoVehiculos[o.tipoVehiculo] != undefined) {
            if (o.hasOwnProperty("capacidad")) {
                if (o.hasOwnProperty("cantCombustible")) {
                    if (o.hasOwnProperty("tipoCombustible")) {
                        return tipoVehiculos[o.tipoVehiculo](o.capacidad, o.cantCombustible, o.tipoCombustible);
                    }
                    return tipoVehiculos[o.tipoVehiculo](o.capacidad, o.cantCombustible);
                }
                return tipoVehiculos[o.tipoVehiculo](o.capacidad);
            }
            return tipoVehiculos[o.tipoVehiculo]();
        }
        return generarVehiculoRandom();

    };

    // Método para generar varios vehiculos por parámetro. Absorbe los errores.

    const generarVehiculos = (arrObj = []) => {
        var arr = [];
        arrObj.forEach((elem) => {
            try {
                arr.push(generarVehiculo(elem));
            } catch (e) {
                console.log(e + ": Eliminando...");
            }
        });

        return arr;
    };

    /* 
    Los 2 metodos siguientes generan vehiculos al azar. La aleatorizacion solo se hace en el 
    tipo de vehiculo y el tipo de combustible que utilizará
    */

    const generarVehiculoRandom = () => {
        let randomIntIndex = getRandomInt();

        if (randomIntIndex === 0) {
            return Auto();
        } else if (randomIntIndex === 1) {
            return Camion();
        } else {
            return Moto();
        }
    }

    const generarVehiculosRandom = (cant = 0) => {
        let arr = [];
        for (let i = 0; i < cant; i++) {
            arr.push(generarVehiculoRandom());
        }
        return arr;
    }

    return {
        generarVehiculoRandom,
        generarVehiculosRandom,
        generarVehiculo,
        generarVehiculos
    }
})();

module.exports = generadorVehiculos;
