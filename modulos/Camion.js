const Vehiculo = require("./Vehiculo");
const Gasolinera = require("./Gasolinera");

function Camion(capacidad = 100, cantCombustible = 0) {

    if (!(this instanceof Camion)) {
        return new Camion(capacidad, cantCombustible);
    }

    Vehiculo.call(this, capacidad, cantCombustible, Gasolinera.getGasolina("Diesel"));
}

Camion.prototype = Object.create(Vehiculo.prototype);
Camion.prototype.constructor = Camion.prototype;

module.exports = Camion;
