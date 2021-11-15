const Vehiculo = require("./Vehiculo");
const Gasolinera = require("./Gasolinera");

function Auto(capacidad = 50, cantCombustible = 0, tipoCombustible) {

    if (!(this instanceof Auto)) {
        return new Auto(capacidad, cantCombustible, tipoCombustible);
    }

    // Se determina si se obtiene el tipo de gasolina de modo aleatorio o se pasa por parámetro
    if (tipoCombustible === undefined) {
        tipoCombustible = this.obtenerTipoCombustible();
    } else if (typeof tipoCombustible === 'string' && (tipoCombustible === 'Premium' || tipoCombustible === 'Regular')) {
        tipoCombustible = Gasolinera.getGasolina(tipoCombustible);
    } else {
        throw new Error("[-] Tipo de combustible invalido");
    }

    Vehiculo.call(this, capacidad, cantCombustible, tipoCombustible);
}

Auto.prototype = Object.create(Vehiculo.prototype);
Auto.prototype.constructor = Auto.prototype;

// Funcion para la obtención aleatoria del tipo de gasolina
Auto.prototype.obtenerTipoCombustible = function() {
    let randomInt = Math.floor(Math.random() * 2);
    return randomInt === 0 ? Gasolinera.getGasolina("Regular") : Gasolinera.getGasolina("Premium");
}

module.exports = Auto;
