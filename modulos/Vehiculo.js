const generadorId = (() => {
    let id = 0;

    const incrementarId = () => {
        id++;
    }

    const genId = () => {
        incrementarId();
        return id;
    }

    return {
        genId
    }
})();

function Vehiculo(capacidad, cantCombustible, tipoCombustible) {
    if (!(this instanceof Vehiculo)) {
        return new Vehiculo();
    }

    var _id = generadorId.genId();
    var _tipoCombustible = tipoCombustible;
    var _capacidad;
    var _cantCombustible;

    Object.defineProperty(this, "id", {
        get() {
            return _id;
        },
        enumerable: true
    });

    Object.defineProperty(this, "capacidad", {
        set(valor) {
            if (valor >= 0) {
                _capacidad = valor;
            } else {
                throw new Error("[-] Capacidad inválida");
            }
        },
        get() { return _capacidad; },
        enumerable: true
    });

    Object.defineProperty(this, "cantCombustible", {
        set(valor) {
            if (valor > this.capacidad) {
                throw new Error("[-] Combustible disponible supera máximo");
            } else if (valor >= 0) {
                _cantCombustible = valor;
            } else {
                throw new Error("[-] Cantidad de combustible negativa");
            }
        },
        get() { return _cantCombustible; },
        enumerable: true
    });

    Object.defineProperty(this, "tipoCombustible", {
        get() { return _tipoCombustible; },
        enumerable: true
    });

    this.capacidad = capacidad;
    this.cantCombustible = cantCombustible;
}

module.exports = Vehiculo;
