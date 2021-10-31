const Auto = require("./Auto");
const Camion = require("./Camion");
const Moto = require("./Moto");

const generadorVehiculos = (() => {
    const getRandomInt = () => {
        return Math.floor(Math.random() * 3); // Genera un entero aleatorio -> restringido a 0, 1 y 2
    }

    const generarVehiculo = () => {
        let randomIntIndex = getRandomInt();
        
        if (randomIntIndex === 0) {
            return Auto();
        } else if (randomIntIndex === 1) {
            return Camion();
        } else {
            return Moto();
        }
    }

    const generarVehiculos = cant => {
        let arr = [];
        for (let i = 0; i < cant; i++) {
            arr.push(generarVehiculo());
        }
        return arr;
    }

    return {
        generarVehiculo,
        generarVehiculos
    }
})();

module.exports = generadorVehiculos;