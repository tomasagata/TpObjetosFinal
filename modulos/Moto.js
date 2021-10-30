const Vehiculo = require("./Vehiculo");

function Moto(tipoCombustible = "Regular", capacidad = 10, cantCombustible = 0) {

    if (!(this instanceof Moto)) {
        return new Moto(tipoCombustible, capacidad, cantCombustible);
    }

    var _tipoCombustible;
    var _capacidad;
    var _cantCombustible;

    Object.defineProperty(this, "tipoCombustible", {
        set(valor) {
            if (valor === "Regular" || valor === "Premium") {
                _tipoCombustible = valor;
            } else {
                throw new Error("[-] Tipo de combustible inválido para Moto");
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

Moto.prototype = Object.create(Vehiculo.prototype);
Moto.prototype.constructor = Moto.prototype;

module.exports = Moto;