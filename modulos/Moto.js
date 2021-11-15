const Vehiculo = require("./Vehiculo");
const Gasolinera = require("./Gasolinera");

function Moto(capacidad = 10, cantCombustible = 0, tipoCombustible) {

    if (!(this instanceof Moto)) {
        return new Moto(capacidad, cantCombustible, tipoCombustible);
    }

    if (tipoCombustible === undefined) {
        tipoCombustible = this.obtenerTipoCombustible();
    } else if (typeof tipoCombustible === 'string' && (tipoCombustible === 'Premium' || tipoCombustible === 'Regular')) {
        tipoCombustible = Gasolinera.getGasolina(tipoCombustible);
    } else {
        throw new Error("[-] Tipo de combustible invalido");
    }

    Vehiculo.call(this, capacidad, cantCombustible, this.obtenerTipoCombustible());
}

Moto.prototype = Object.create(Vehiculo.prototype);
Moto.prototype.constructor = Moto.prototype;

Moto.prototype.obtenerTipoCombustible = function() {
    let randomInt = Math.floor(Math.random() * 2);
    return randomInt === 0 ? Gasolinera.getGasolina("Regular") : Gasolinera.getGasolina("Premium");
}

module.exports = Moto;
