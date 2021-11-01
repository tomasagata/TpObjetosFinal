const Vehiculo = require("./Vehiculo");

function Moto(tipoCombustible = "Regular", capacidad = 10, cantCombustible = 0) {

    if (!(this instanceof Moto)) {
        return new Moto(tipoCombustible, capacidad, cantCombustible);
    }

    var _tipoCombustible;

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

    this.tipoCombustible = tipoCombustible;
    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

Moto.prototype = Object.create(Vehiculo.prototype);
Moto.prototype.constructor = Moto.prototype;

module.exports = Moto;