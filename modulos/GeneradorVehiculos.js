const Auto = require("./Auto");
const Camion = require("./Camion");
const Moto = require("./Moto");

function GeneradorVehiculos() {

    if (!(this instanceof GeneradorVehiculos)) {
        return new GeneradorVehiculos();
    }

    this.generarVehiculo = function() {
        let randomIntIndex = Math.floor(Math.random() * 3); // Genera un entero aleatorio -> restringido a 0, 1 y 2
        
        if (randomIntIndex === 0) {
            return Auto();
        } else if (randomIntIndex === 1) {
            return Camion();
        } else {
            return Moto();
        }
    }

    this.generarVehiculos = function(cant) {
        let arr = [];
        for (let i = 0; i < cant; i++) {
            arr.push(this.generarVehiculo());
        }
        return arr;
    }

}

module.exports = GeneradorVehiculos;