const Vehiculo = require("./Vehiculo");

function Auto(tipoCombustible = "Regular", capacidad = 50, cantCombustible = 0) {

    if (!(this instanceof Auto)) {
        return new Auto(tipoCombustible, capacidad, cantCombustible);
    }

    var _tipoCombustible;

    Object.defineProperty(this, "tipoCombustible", {
        set(valor) {
            if (valor === "Regular" || valor === "Premium") {
                _tipoCombustible = valor;
            } else {
                throw new Error("[-] Tipo de combustible inválido para Auto");
            }
        },
        get() { return _tipoCombustible; }
    });

    this.tipoCombustible = tipoCombustible;
    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

Auto.prototype = Object.create(Vehiculo.prototype);
Auto.prototype.constructor = Auto.prototype;

module.exports = Auto;