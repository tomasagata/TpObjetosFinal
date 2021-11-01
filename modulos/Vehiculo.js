function Vehiculo() {

    if (!(this instanceof Vehiculo)) {
        return new Vehiculo();
    }

    var _capacidad;
    var _cantCombustible;

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

}

module.exports = Vehiculo;