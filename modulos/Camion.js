const Vehiculo = require("./Vehiculo");

function Camion(tipoCombustible = "Diesel", capacidad = 100, cantCombustible = 0) {

    if (!(this instanceof Camion)) {
        return new Camion(tipoCombustible, capacidad, cantCombustible);
    }

    var _tipoCombustible;

    Object.defineProperty(this, "tipoCombustible", {
        set(valor) {
            if (valor === "Diesel") {
                _tipoCombustible = valor;
            } else {
                throw new Error("[-] Tipo de combustible inválido para Camion");
            }
        },
        get() { return _tipoCombustible; }
    });

    this.tipoCombustible = tipoCombustible;
    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

Camion.prototype = Object.create(Vehiculo.prototype);
Camion.prototype.constructor = Camion.prototype;

module.exports = Camion;