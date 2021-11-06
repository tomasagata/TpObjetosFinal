const Vehiculo = require("./Vehiculo");
const Gasolinera = require("./Gasolinera");

function Auto(capacidad = 50, cantCombustible = 0) {

    if (!(this instanceof Auto)) {
        return new Auto(capacidad, cantCombustible);
    }
    
    Vehiculo.call(this, capacidad, cantCombustible, this.obtenerTipoCombustible());
}

Auto.prototype = Object.create(Vehiculo.prototype);
Auto.prototype.constructor = Auto.prototype;

Auto.prototype.obtenerTipoCombustible = function() {
    let randomInt = Math.floor(Math.random() * 2);
    return randomInt === 0 ? Gasolinera.gasolinas.regular : Gasolinera.gasolinas.premium;
}

module.exports = Auto;