const Vehiculo = require("./Vehiculo");
const Gasolinera = require("./Gasolinera");

function Moto(capacidad = 10, cantCombustible = 0) {

    if (!(this instanceof Moto)) {
        return new Moto(capacidad, cantCombustible);
    }

    Vehiculo.call(this, capacidad, cantCombustible, this.obtenerTipoCombustible());
}

Moto.prototype = Object.create(Vehiculo.prototype);
Moto.prototype.constructor = Moto.prototype;

Moto.prototype.obtenerTipoCombustible = function() {
    let randomInt = Math.floor(Math.random() * 2);
    return randomInt === 0 ? Gasolinera.gasolinas.regular : Gasolinera.gasolinas.premium;
}

module.exports = Moto;