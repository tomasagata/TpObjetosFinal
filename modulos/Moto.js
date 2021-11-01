const Vehiculo = require("./Vehiculo");

function Moto(capacidad = 10, cantCombustible = 0) {

    if (!(this instanceof Moto)) {
        return new Moto(capacidad, cantCombustible);
    }

    var _tipoCombustible = this.obtenerTipoCombustible();

    Object.defineProperty(this, "tipoCombustible", {
        get() { return _tipoCombustible; }
    });

    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

Moto.prototype = Object.create(Vehiculo.prototype);
Moto.prototype.constructor = Moto.prototype;

Moto.prototype.obtenerTipoCombustible = function() {
    let randomInt = Math.floor(Math.random() * 2);
    return randomInt === 0 ? "Regular" : "Premium";
}

module.exports = Moto;