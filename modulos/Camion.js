const Vehiculo = require("./Vehiculo");

function Camion(capacidad = 100, cantCombustible = 0) {

    if (!(this instanceof Camion)) {
        return new Camion(capacidad, cantCombustible);
    }

    Vehiculo.call(this);
    var _tipoCombustible = "Diesel";

    Object.defineProperty(this, "tipoCombustible", {
        get() { return _tipoCombustible; }
    });

    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

Camion.prototype = Object.create(Vehiculo.prototype);
Camion.prototype.constructor = Camion.prototype;

module.exports = Camion;