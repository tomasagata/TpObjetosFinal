const Vehiculo = require("./Vehiculo");

function Auto(tipoCombustible = "Regular", capacidad = 50, cantCombustible = 0) {

    if (!(this instanceof Auto)) {
        return new Auto(tipoCombustible, capacidad, cantCombustible);
    }

    var _tipoCombustible;
    var _capacidad;
    var _cantCombustible;

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

    Object.defineProperty(this, "capacidad", {
        set(valor) {
            if (valor >= 0) {
                _capacidad = valor;
            } else {
                throw new Error("[-] Capacidad inválida");
            }
        },
        get() { return _capacidad; }
    });

    Object.defineProperty(this, "cantCombustible", {
        set(valor) {
            if (valor > capacidad) {
                throw new Error("[-] Combustible disponible supera máximo");
            } else if (valor >= 0) {
                _cantCombustible = valor;
            } else {
                throw new Error("[-] Cantidad de combustible negativa");
            }
        },
        get() { return _cantCombustible; }
    });

    this.tipoCombustible = tipoCombustible;
    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

Auto.prototype = Object.create(Vehiculo.prototype);
Auto.prototype.constructor = Auto.prototype;

module.exports = Auto;