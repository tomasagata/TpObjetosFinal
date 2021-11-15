const generadorId = (() => {
    let id = 0; // para que empiecen desde 0 y coincidan con el índice del arreglo en gasolinera

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

function Operacion(beneficioObtenido) {
    if (!(this instanceof Operacion)) {
        return new Operacion(beneficioObtenido);
    }

    var _idOperacion = generadorId.genId();
    var _beneficio = beneficioObtenido;

    Object.defineProperty(this, "idOperacion", {
        get() {
            return _idOperacion;
        },
        enumerable: true
    });

    Object.defineProperty(this, "beneficio", {
        get() {
            return _beneficio;
        },
        enumerable: true
    });
}

module.exports = Operacion;