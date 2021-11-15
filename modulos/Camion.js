const Vehiculo = require("./Vehiculo");
const Gasolinera = require("./Gasolinera");

function Camion(capacidad = 100, cantCombustible = 0, tipoCombustible) {

    if (!(this instanceof Camion)) {
        return new Camion(capacidad, cantCombustible, tipoCombustible);
    }

    Vehiculo.call(this, capacidad, cantCombustible, Gasolinera.getGasolina("Diesel"));
}

Camion.prototype = Object.create(Vehiculo.prototype);
Camion.prototype.constructor = Camion.prototype;

module.exports = Camion;
