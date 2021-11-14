const Auto = require("./Auto");
const Camion = require("./Camion");
const Moto = require("./Moto");

const generadorVehiculos = (() => {
    var tipoVehiculos = {
        "Auto": Auto,
        "Camion": Camion,
        "Moto": Moto
    };

    const getRandomInt = () => {
        return Math.floor(Math.random() * 3); // Genera un entero aleatorio -> restringido a 0, 1 y 2
    }

    const generarVehiculo = (o) => {

        if (o.hasOwnProperty("tipoVehiculo") && tipoVehiculos[o.tipoVehiculo] != undefined) {

            if (o.hasOwnProperty("capacidad") && o.capacidad > 0) {

                if (o.hasOwnProperty("cantCombustible") && o.cantCombustible <= o.capacidad && o.cantCombustible >= 0) {

                    return tipoVehiculos[o.tipoVehiculo](o.capacidad, o.cantCombustible);

                } else if (!(o.hasOwnProperty("cantCombustible"))) {
                    return tipoVehiculos[o.tipoVehiculo](o.capacidad);
                }

            } else if (!(o.hasOwnProperty("capacidad"))) {
                return tipoVehiculos[o.tipoVehiculo]();
            }

            throw new Error("[x] Datos inválidos al crear Vehiculo");

        }

        return generarVehiculoRandom();

    };

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
