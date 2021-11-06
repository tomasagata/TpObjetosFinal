const Vehiculo = require("./Vehiculo");

function Auto(capacidad = 50, cantCombustible = 0) {

    if (!(this instanceof Auto)) {
        return new Auto(capacidad, cantCombustible);
    }
    
    Vehiculo.call(this);
    var _tipoCombustible = this.obtenerTipoCombustible();

    Object.defineProperty(this, "tipoCombustible", {
        get() { return _tipoCombustible; }
    });

    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

Auto.prototype = Object.create(Vehiculo.prototype);
Auto.prototype.constructor = Auto.prototype;

Auto.prototype.obtenerTipoCombustible = function() {
    let randomInt = Math.floor(Math.random() * 2);
    return randomInt === 0 ? "Regular" : "Premium";
}

module.exports = Auto;